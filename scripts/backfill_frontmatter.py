#!/usr/bin/env python3
"""
为文章补全缺失的 frontmatter 字段（description / date / cover）。

设计为幂等可重跑：只补缺失的字段，已存在的字段绝不覆盖；无 frontmatter
的文章会新建 `---...---` 块插到文件最前面。重跑应无变化。

字段来源：
    description  从正文第一段真实文字提取（跳过 frontmatter / H1 / promo
                 标记块 / ::: 容器 / 图片行 / 引用块 / 代码围栏）
    date         缺失则取该文件首次 git 提交日期，git 取不到时用文件 mtime
    cover        正文里第一张 ![alt](路径) 图片的路径；无图片则不加

用法：
    python3 scripts/backfill_frontmatter.py --dry-run        # 预览，不写文件
    python3 scripts/backfill_frontmatter.py                  # 全量写入
    python3 scripts/backfill_frontmatter.py --dir docs/blog  # 只处理指定目录
"""

import datetime
import re
import subprocess
import sys
from pathlib import Path

DOCS = Path(__file__).parent.parent / "docs"
DEFAULT_DIRS = [
    DOCS / "blog",
    DOCS / "ai-programming-tools",
    DOCS / "vibe-coding-tips",
    DOCS / "claude-code-guide",
    DOCS / "claude-domestic",
    DOCS / "codex-domestic",
]
EXCLUDED_STEMS = {"index", "readme", "categories", "tags", "timeline"}

# description 目标长度（纯文本字符数），到此截断
DESC_MAX_LEN = 140
DESC_MIN_LEN = 40

# promo 标记块：连同首尾换行整体匹配（捕获组用于回引同名段类型）
RE_PROMO = re.compile(
    r"<!-- promo:(top|mid|end):start -->.*?<!-- promo:\1:end -->",
    re.DOTALL,
)
RE_IMAGE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")


def split_frontmatter(content: str) -> tuple[str | None, str]:
    """拆出 (frontmatter 文本, 正文)。无 frontmatter 时 frontmatter 为 None。"""
    if content.startswith("---"):
        m = re.match(r"---\n(.*?)\n---[ \t]*\n?", content, re.DOTALL)
        if m:
            return m.group(1), content[m.end():]
    return None, content


def has_field(frontmatter: str | None, field: str) -> bool:
    if not frontmatter:
        return False
    return bool(re.search(rf"^{field}\s*:", frontmatter, re.MULTILINE))


def strip_promo(body: str) -> str:
    """移除正文里的 promo 标记块，避免把广告文案当成摘要。"""
    return RE_PROMO.sub("", body)


def extract_description(body: str) -> str | None:
    """从正文第一段真实文字提取 description。

    逐行扫描，跳过 H1 / ::: 容器 / 图片行 / 引用块 / 代码围栏，
    取到第一段连续的正常段落文字后拼接、截断。
    """
    clean = strip_promo(body)
    lines = clean.splitlines()
    in_fence = False
    fence_marker = ""
    paragraph: list[str] = []

    for raw in lines:
        line = raw.strip()

        # 代码围栏开关（``` 或 ~~~）
        fence_m = re.match(r"(`{3,}|~{3,})", line)
        if fence_m:
            marker = fence_m.group(1)[0]
            if not in_fence:
                in_fence = True
                fence_marker = marker
            elif marker == fence_marker:
                in_fence = False
            continue
        if in_fence:
            continue

        if not line:
            if paragraph:
                break  # 段落结束
            continue
        if line.startswith("#"):  # 标题行（含 H1）
            continue
        if line.startswith(":::"):  # ::: 容器开关
            continue
        if line.startswith(">"):  # 引用块
            continue
        if RE_IMAGE.match(line):  # 整行就是图片
            continue
        if re.match(r"^(?:[-*+]\s|\d+\.\s)", line):  # 列表项跳过，找真正段落
            continue
        if line.startswith("|") or set(line) <= {"-", "|", ":", " "}:  # 表格
            continue

        paragraph.append(line)

    if not paragraph:
        return None

    text = " ".join(paragraph)
    text = strip_inline_markup(text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) < DESC_MIN_LEN:
        return None
    if len(text) > DESC_MAX_LEN:
        text = text[:DESC_MAX_LEN].rstrip() + "…"
    return text


def strip_inline_markup(text: str) -> str:
    """去掉常见行内 Markdown 标记，保留可读纯文本。"""
    text = RE_IMAGE.sub("", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)  # 链接
    text = re.sub(r"`([^`]+)`", r"\1", text)  # 行内代码
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)  # 粗体
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"\1", text)  # 斜体
    text = re.sub(r"~~([^~]+)~~", r"\1", text)  # 删除线
    return text


def extract_cover(body: str) -> str | None:
    """正文里第一张图片的路径。"""
    clean = strip_promo(body)
    m = RE_IMAGE.search(clean)
    if m:
        return m.group(1).strip()
    return None


def git_first_commit_date(path: Path) -> str | None:
    """该文件首次进入 git（A=Added）的日期，格式 YYYY-MM-DD。"""
    try:
        out = subprocess.run(
            [
                "git", "log", "--diff-filter=A", "--follow",
                "--format=%as", "--", str(path),
            ],
            cwd=str(DOCS.parent),
            capture_output=True,
            text=True,
            check=False,
        )
    except OSError:
        return None
    dates = [ln.strip() for ln in out.stdout.splitlines() if ln.strip()]
    return dates[-1] if dates else None


def resolve_date(path: Path) -> str:
    """优先 git 首次提交日期，取不到则用文件 mtime。"""
    git_date = git_first_commit_date(path)
    if git_date:
        return git_date
    mtime = datetime.date.fromtimestamp(path.stat().st_mtime)
    return mtime.isoformat()


def yaml_quote(value: str) -> str:
    """description 可能含冒号等特殊字符，统一用双引号包裹并转义。"""
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def build_frontmatter(frontmatter: str | None, additions: dict[str, str]) -> str:
    """把缺失字段拼进 frontmatter，返回不含 --- 包裹的内容块。"""
    extra_lines = []
    for key, value in additions.items():
        if key == "description":
            extra_lines.append(f"{key}: {yaml_quote(value)}")
        elif key == "cover":
            extra_lines.append(f"{key}: {value}")
        else:
            extra_lines.append(f"{key}: {value}")
    extra = "\n".join(extra_lines)

    if frontmatter is None:
        return extra
    base = frontmatter.rstrip("\n")
    return f"{base}\n{extra}"


def process_file(path: Path, dry_run: bool) -> tuple[str, list[str]]:
    if path.stem.lower() in EXCLUDED_STEMS:
        return "skip(excluded)", []

    original = path.read_text(encoding="utf-8")
    frontmatter, body = split_frontmatter(original)

    additions: dict[str, str] = {}

    if not has_field(frontmatter, "description"):
        desc = extract_description(body)
        if desc:
            additions["description"] = desc

    if not has_field(frontmatter, "date"):
        additions["date"] = resolve_date(path)

    if not has_field(frontmatter, "cover"):
        cover = extract_cover(body)
        if cover:
            additions["cover"] = cover

    if not additions:
        return "no change", []

    new_fm = build_frontmatter(frontmatter, additions)
    if frontmatter is None:
        new_content = f"---\n{new_fm}\n---\n\n{body.lstrip()}"
    else:
        new_content = f"---\n{new_fm}\n---\n{body}"

    if new_content == original:
        return "no change", []

    if not dry_run:
        path.write_text(new_content, encoding="utf-8")
    return "updated", list(additions.keys())


def collect_files(target_dirs: list[Path]) -> list[Path]:
    files: list[Path] = []
    for d in target_dirs:
        if d.exists():
            files.extend(sorted(d.rglob("*.md")))
    return files


def main() -> None:
    dry_run = "--dry-run" in sys.argv
    target_dirs = DEFAULT_DIRS
    if "--dir" in sys.argv:
        idx = sys.argv.index("--dir")
        target_dirs = [Path(sys.argv[idx + 1]).resolve()]

    if dry_run:
        print("[DRY RUN] 不会真正修改文件\n")

    stats = {"updated": 0, "unchanged": 0, "excluded": 0}
    field_counts = {"description": 0, "date": 0, "cover": 0}

    for f in collect_files(target_dirs):
        status, fields = process_file(f, dry_run)
        rel = f.relative_to(DOCS.parent)
        if status == "updated":
            stats["updated"] += 1
            for fld in fields:
                field_counts[fld] += 1
            print(f"  ✓ {rel}: 补全 {', '.join(fields)}")
        elif status == "skip(excluded)":
            stats["excluded"] += 1
        else:
            stats["unchanged"] += 1

    print(
        f"\n完成：更新 {stats['updated']} 篇，"
        f"无变化 {stats['unchanged']} 篇，排除 {stats['excluded']} 篇"
    )
    print(
        f"  补全字段：description {field_counts['description']}，"
        f"date {field_counts['date']}，cover {field_counts['cover']}"
    )


if __name__ == "__main__":
    main()
