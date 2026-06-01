#!/usr/bin/env python3
"""
为文章批量注入软推广钩子（开头锚点 / 文中微信 / 结尾 CTA）。

设计为幂等可重跑：每处钩子用 HTML 注释哨兵标记包裹，处理时先剥离已有标记块，
再按文章结构重新计算位置插入。重跑不会重复注入；上游同步覆盖后重跑即可恢复。

用法：
    python3 scripts/inject_promo_hooks.py --dry-run        # 预览，不写文件
    python3 scripts/inject_promo_hooks.py                  # 全量写入
    python3 scripts/inject_promo_hooks.py --dir docs/blog  # 只处理指定目录
    python3 scripts/inject_promo_hooks.py --remove         # 移除全部钩子
    python3 scripts/inject_promo_hooks.py --remove --dry-run  # 预览移除
"""

import re
import sys
from pathlib import Path

DOCS = Path(__file__).parent.parent / "docs"
DEFAULT_DIRS = [
    DOCS / "blog",
    DOCS / "ai-programming-tools",
    DOCS / "vibe-coding-tips",
    DOCS / "claude-code-guide",
]
EXCLUDED_STEMS = {"index", "categories", "tags", "timeline", "readme"}

PRODUCT_URL = "https://code.ai80.vip"
PRODUCT_HOME = "https://code.ai80.vip/home"
WECHAT = "20133213"

TOP_BLOCK = (
    "<!-- promo:top:start -->\n"
    "::: tip\n"
    f"本文涉及的 Claude Code 等 AI 编程工具，可在 [AI 编程巴士（Code80）]({PRODUCT_URL}) "
    "一键开通，国内直连、稳定纯净。\n"
    ":::\n"
    "<!-- promo:top:end -->"
)
MID_BLOCK = (
    "<!-- promo:mid:start -->\n"
    f"> 配置卡住了可以加易安微信 `{WECHAT}` 聊聊，或直接到 [AI 编程巴士]({PRODUCT_URL}) 看现成方案。\n"
    "<!-- promo:mid:end -->"
)
END_BLOCK = (
    "<!-- promo:end:start -->\n"
    "## 推荐资源\n\n"
    f"- AI 编程巴士：[稳定纯净的 Claude Code 套餐供应]({PRODUCT_HOME})\n"
    f"- 有问题加易安微信：`{WECHAT}`\n"
    "<!-- promo:end:end -->"
)

# 剥离已有标记块的正则（连同相邻空行一并匹配，便于把接缝规范化为单个空行）
RE_TOP = re.compile(r"\n*<!-- promo:top:start -->.*?<!-- promo:top:end -->\n*", re.DOTALL)
RE_MID = re.compile(r"\n*<!-- promo:mid:start -->.*?<!-- promo:mid:end -->\n*", re.DOTALL)
RE_END = re.compile(r"\n*<!-- promo:end:start -->.*?<!-- promo:end:end -->\n*$", re.DOTALL)


def _top_repl(m: re.Match) -> str:
    # 块在文首则不留空行，否则规范化为一个空行
    return "" if m.start() == 0 else "\n\n"


def strip_promo(content: str) -> str:
    """剥离本脚本注入过的全部标记块，把接缝规范化为单个空行。

    与 build 的接缝规范化对称：strip(build(x)) 与 build(strip(build(x))) 一致，
    因此重跑稳定（幂等）。
    """
    content = RE_END.sub("", content)
    content = RE_TOP.sub(_top_repl, content)
    content = RE_MID.sub("\n\n", content)
    return content


def body_start_offset(content: str) -> int:
    """返回正文起点（跳过 frontmatter）。"""
    if content.startswith("---"):
        m = re.match(r"---\n.*?\n---[ \t]*\n", content, re.DOTALL)
        if m:
            return m.end()
    return 0


def top_insert_offset(content: str, body_start: int) -> int:
    """开头钩子位置：H1 之后；无 H1 则正文起点（跳过前导空行）。"""
    rest = content[body_start:]
    m_h1 = re.match(r"(?:[ \t]*\n)*#\s+[^\n]*\n", rest)
    if m_h1:
        return body_start + m_h1.end()
    m_blanks = re.match(r"(?:[ \t]*\n)*", rest)
    return body_start + (m_blanks.end() if m_blanks else 0)


def mid_insert_offset(content: str, body_start: int, top_off: int) -> int:
    """文中钩子位置：第一个 ## 之前；无 ## 时回退到首段之后。"""
    m_h2 = re.search(r"^##\s+", content[body_start:], re.MULTILINE)
    if m_h2:
        return body_start + m_h2.start()
    after = content[top_off:]
    m_para = re.search(r"\n[ \t]*\n", after)
    if m_para:
        return top_off + m_para.end()
    return len(content)


def has_existing_promo(base: str) -> bool:
    """base（已剥离本脚本标记）是否已含人工/上游推广，决定是否跳过结尾 CTA。"""
    return ("## 推荐资源" in base) or ("code.ai80.vip" in base)


def build(base: str) -> tuple[str, bool]:
    """在已剥离钩子的 base 上重新注入三处钩子，返回 (新内容, 是否含结尾)。

    把文章切成 head（frontmatter+H1）/ 首段 / 正文三段，各接缝统一用单个空行
    拼接，使每次注入产生确定的空白布局，从而与 strip 对称、可幂等重跑。
    """
    body_start = body_start_offset(base)
    top_off = top_insert_offset(base, body_start)
    mid_off = mid_insert_offset(base, body_start, top_off)
    if mid_off < top_off:
        mid_off = top_off

    head = base[:top_off].rstrip("\n")
    mid_chunk = base[top_off:mid_off].strip("\n")
    tail = base[mid_off:].lstrip("\n")

    segments = [s for s in (head, TOP_BLOCK, mid_chunk, MID_BLOCK) if s]
    result = "\n\n".join(segments)
    if tail:
        result += "\n\n" + tail

    include_end = not has_existing_promo(base)
    if include_end:
        result = result.rstrip("\n") + "\n\n" + END_BLOCK + "\n"
    else:
        result = result.rstrip("\n") + "\n"
    return result, include_end


def process_file(path: Path, dry_run: bool, remove: bool = False) -> str:
    if path.stem.lower() in EXCLUDED_STEMS:
        return "skip(excluded)"

    original = path.read_text(encoding="utf-8")

    if remove:
        stripped = strip_promo(original)
        if stripped == original:
            return "no change"
        # 移除后规范化结尾为单个换行
        new_content = stripped.rstrip("\n") + "\n" if stripped.strip() else stripped
        if not dry_run:
            path.write_text(new_content, encoding="utf-8")
        return "removed"

    base = strip_promo(original)
    new_content, include_end = build(base)

    if new_content == original:
        return "no change"

    if not dry_run:
        path.write_text(new_content, encoding="utf-8")
    return "top+mid+end" if include_end else "top+mid (end skipped: 已有推广)"


def collect_files(target_dirs: list[Path]) -> list[Path]:
    files: list[Path] = []
    for d in target_dirs:
        if d.exists():
            files.extend(sorted(d.rglob("*.md")))
    return files


def main() -> None:
    dry_run = "--dry-run" in sys.argv
    remove = "--remove" in sys.argv
    target_dirs = DEFAULT_DIRS
    if "--dir" in sys.argv:
        idx = sys.argv.index("--dir")
        target_dirs = [Path(sys.argv[idx + 1]).resolve()]

    if dry_run:
        mode = "移除" if remove else "注入"
        print(f"[DRY RUN] 不会真正修改文件（{mode}预览）\n")

    stats = {"changed": 0, "end_skipped": 0, "excluded": 0, "unchanged": 0}
    for f in collect_files(target_dirs):
        status = process_file(f, dry_run, remove)
        if status.startswith("top+mid") or status == "removed":
            stats["changed"] += 1
            if status.startswith("top+mid") and "end skipped" in status:
                stats["end_skipped"] += 1
            tag = "✓"
        elif status == "skip(excluded)":
            stats["excluded"] += 1
            tag = "·"
        else:
            stats["unchanged"] += 1
            tag = "·"
        print(f"  {tag} {f.relative_to(DOCS.parent)}: {status}")

    if remove:
        print(
            f"\n完成：移除 {stats['changed']} 篇，"
            f"排除 {stats['excluded']} 篇，无钩子 {stats['unchanged']} 篇"
        )
    else:
        print(
            f"\n完成：注入 {stats['changed']} 篇"
            f"（其中 {stats['end_skipped']} 篇结尾跳过），"
            f"排除 {stats['excluded']} 篇，无变化 {stats['unchanged']} 篇"
        )


if __name__ == "__main__":
    main()
