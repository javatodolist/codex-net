#!/usr/bin/env python3
"""
为 docs/blog/ 下英文文件名的博客文章添加 frontmatter title。
title 值从文件第一个 # 标题行提取。
已有 frontmatter title 的文件跳过不改。
"""

import re
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "docs" / "blog"
EXCLUDED = {"index", "categories", "tags", "timeline"}


def extract_first_h1(content: str) -> str | None:
    for line in content.splitlines():
        m = re.match(r"^#\s+(.+)", line.strip())
        if m:
            return m.group(1).strip()
    return None


def has_frontmatter_title(content: str) -> bool:
    if not content.startswith("---"):
        return False
    end = content.find("---", 3)
    if end == -1:
        return False
    frontmatter = content[3:end]
    return bool(re.search(r"^title\s*:", frontmatter, re.MULTILINE))


def add_title_frontmatter(content: str, title: str) -> str:
    if content.startswith("---"):
        # 已有 frontmatter，在结束 --- 前插入 title
        end = content.find("---", 3)
        if end != -1:
            fm = content[3:end]
            new_fm = f"title: {title}\n{fm}"
            return f"---\n{new_fm}---{content[end+3:]}"

    # 无 frontmatter，在最前面加
    return f"---\ntitle: {title}\n---\n\n{content}"


def process_file(path: Path, dry_run: bool = False) -> str:
    slug = path.stem
    if slug in EXCLUDED:
        return "skip(excluded)"

    content = path.read_text(encoding="utf-8")

    if has_frontmatter_title(content):
        return "skip(already has title)"

    title = extract_first_h1(content)
    if not title:
        return "skip(no h1 found)"

    # 只处理文件名是纯 ASCII 的（英文slug），中文文件名已经是可读标题
    if all(ord(c) < 128 for c in slug):
        new_content = add_title_frontmatter(content, title)
        if not dry_run:
            path.write_text(new_content, encoding="utf-8")
        return f"updated -> {title}"
    else:
        return "skip(already has chinese filename)"


def main():
    dry_run = "--dry-run" in sys.argv
    if dry_run:
        print("[DRY RUN] 不会真正修改文件\n")

    md_files = sorted(BLOG_DIR.glob("*.md"))
    results = {"updated": 0, "skipped": 0}

    for f in md_files:
        status = process_file(f, dry_run=dry_run)
        tag = "✓" if status.startswith("updated") else "·"
        print(f"  {tag} {f.name}: {status}")
        if status.startswith("updated"):
            results["updated"] += 1
        else:
            results["skipped"] += 1

    print(f"\n完成：更新 {results['updated']} 篇，跳过 {results['skipped']} 篇")


if __name__ == "__main__":
    main()
