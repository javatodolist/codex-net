#!/usr/bin/env python3
"""
百度站长平台「普通收录」主动推送：把 URL 提交给百度以加速收录。

token 优先取环境变量 BAIDU_PUSH_TOKEN；未设置时回退读取 scripts/deploy.local.conf。
token 是密钥，不要写进任何会提交到 git 的文件。

用法：
    baidu_push.py --recent 3        # 推送 sitemap 中 lastmod 在最近 3 天内的 URL（部署钩子默认）
    baidu_push.py --all             # 推送 sitemap 全部 URL（首次播种，注意每日配额）
    baidu_push.py <url> [<url>...]  # 推送指定的若干 URL
    baidu_push.py --dry-run --recent 3   # 只打印将推送的 URL，不调用 API
"""

import os
import re
import sys
import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path

SITE = "https://ai80.net"
API = "http://data.zz.baidu.com/urls"
BATCH = 1000  # 每次请求最多推送的 URL 数

REPO = Path(__file__).resolve().parent.parent
SITEMAP = REPO / "dist" / "sitemap.xml"
LOCAL_CONF = Path(__file__).resolve().parent / "deploy.local.conf"


def get_token() -> str:
    token = os.environ.get("BAIDU_PUSH_TOKEN", "").strip()
    if token:
        return token
    if LOCAL_CONF.exists():
        for line in LOCAL_CONF.read_text(encoding="utf-8").splitlines():
            m = re.match(r'\s*BAIDU_PUSH_TOKEN\s*=\s*"?([^"\s#]+)"?', line)
            if m:
                return m.group(1)
    sys.exit(
        "❌ 未找到百度推送 token。\n"
        "   设置环境变量 BAIDU_PUSH_TOKEN，或在 scripts/deploy.local.conf 写入 BAIDU_PUSH_TOKEN=..."
    )


def load_sitemap_urls(recent_days: int | None) -> list[str]:
    """从 dist/sitemap.xml 读取 URL；recent_days 不为 None 时只保留 lastmod 在该天数内的。"""
    if not SITEMAP.exists():
        sys.exit(f"❌ 找不到 sitemap：{SITEMAP}\n   请先执行 npm run build。")

    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    root = ET.parse(SITEMAP).getroot()
    cutoff = None
    if recent_days is not None:
        cutoff = datetime.now(timezone.utc) - timedelta(days=recent_days)

    urls: list[str] = []
    for url_el in root.findall("sm:url", ns):
        loc = url_el.findtext("sm:loc", namespaces=ns)
        if not loc:
            continue
        if cutoff is not None:
            lastmod = url_el.findtext("sm:lastmod", namespaces=ns)
            if not lastmod:
                continue
            try:
                ts = datetime.fromisoformat(lastmod.replace("Z", "+00:00"))
            except ValueError:
                continue
            if ts < cutoff:
                continue
        urls.append(loc.strip())
    return urls


def push(urls: list[str], token: str) -> None:
    """分批 POST 到百度推送接口，打印每批返回。"""
    endpoint = f"{API}?site={SITE}&token={token}"
    total_success = 0
    for i in range(0, len(urls), BATCH):
        batch = urls[i:i + BATCH]
        body = "\n".join(batch).encode("utf-8")
        req = urllib.request.Request(
            endpoint, data=body,
            headers={"Content-Type": "text/plain"}, method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read().decode("utf-8"))
        except Exception as e:  # noqa: BLE001 - 网络/接口异常统一兜底
            print(f"  ✗ 第 {i // BATCH + 1} 批推送失败：{e}")
            continue

        if "error" in result:
            print(f"  ✗ 接口返回错误：{result.get('error')} {result.get('message')}")
            continue
        success = result.get("success", 0)
        total_success += success
        print(
            f"  ✓ 第 {i // BATCH + 1} 批：成功 {success}，"
            f"剩余配额 {result.get('remain', '?')}"
        )
        for bad in result.get("not_valid", []):
            print(f"    - 非法 URL：{bad}")
        for bad in result.get("not_same_site", []):
            print(f"    - 非本站 URL：{bad}")
    print(f"\n完成：累计成功推送 {total_success} / {len(urls)} 条")


def main() -> None:
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    args = [a for a in args if a != "--dry-run"]

    if "--all" in args:
        urls = load_sitemap_urls(recent_days=None)
        scope = "sitemap 全部"
    elif "--recent" in args:
        idx = args.index("--recent")
        days = int(args[idx + 1])
        urls = load_sitemap_urls(recent_days=days)
        scope = f"sitemap 最近 {days} 天更新"
    else:
        urls = [a for a in args if a.startswith("http")]
        scope = "命令行指定"
        if not urls:
            sys.exit(__doc__)

    print(f"推送范围：{scope}，共 {len(urls)} 条 URL")
    if not urls:
        print("没有符合条件的 URL，跳过。")
        return

    if dry_run:
        print("[DRY RUN] 不调用接口，将推送的 URL：")
        for u in urls:
            print(f"  {u}")
        return

    push(urls, get_token())


if __name__ == "__main__":
    main()
