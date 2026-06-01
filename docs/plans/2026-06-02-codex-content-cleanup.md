# Codex Content Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean this repository so it keeps Codex-related content, removes unrelated content, and localizes all remote image references in the remaining site.

**Architecture:** Treat `docs/codex-cli/` as core content and keep only comparison articles that mention Codex in their filename or body. Remove non-Codex content directories, generated output, IDE shelves, and Claude/Gemini/BMAD harness files. Then scan the remaining Markdown/VitePress files for remote image references, download those image assets under `docs/public/images/localized/`, and rewrite Markdown/frontmatter references to local paths.

**Tech Stack:** Git, VitePress, Node.js scripts, Markdown content, local static assets under `docs/public/`.

---

### Task 1: Snapshot current state and identify keep/delete sets

**Files:**
- Inspect: repository root
- Inspect: `docs/`
- Inspect: `docs/codex-cli/`
- Inspect: `docs/comparisons/`
- Inspect: `docs/.vitepress/`

**Step 1: Record status**

Run:

```bash
git status --short --branch
```

Expected: shows initial commit state and currently staged files.

**Step 2: Generate directory summary**

Run:

```bash
py - <<'PY'
import os
from collections import Counter
skip={'.git','node_modules'}
counts=Counter()
for dirpath, dirnames, filenames in os.walk('.'):
    dirnames[:] = [d for d in dirnames if d not in skip]
    rel=os.path.relpath(dirpath,'.')
    top='.' if rel=='.' else rel.split(os.sep)[0]
    counts[top]+=len(filenames)
for name,count in counts.most_common():
    print(f'{name}\t{count}')
PY
```

Expected: confirms large generated/non-source directories such as `dist`, `.idea`, `.claude`, `.gemini`, `_bmad` exist.

**Step 3: Identify Codex comparison articles to keep**

Run:

```bash
py - <<'PY'
import os,re
for name in sorted(os.listdir('docs/comparisons')):
    path=os.path.join('docs/comparisons',name)
    if not os.path.isfile(path) or not name.endswith('.md'):
        continue
    text=open(path,'r',encoding='utf-8',errors='ignore').read()
    if re.search(r'codex', name + '\n' + text, re.I):
        print(path.replace('\\','/'))
PY
```

Expected: list of comparison Markdown files that should remain.

---

### Task 2: Remove clearly unrelated repository files and directories

**Files:**
- Delete: `.claude/`
- Delete: `.gemini/`
- Delete: `_bmad/`
- Delete: `.idea/`
- Delete: `dist/`
- Delete if present: `dist.zip`
- Delete if present: `TRANSLATION_GUIDE.md`
- Delete if present: `BUILD_README.md`
- Delete if present: root SEO plan Markdown unrelated to Codex

**Step 1: Delete non-deliverable directories/files**

Run:

```bash
rm -rf .claude .gemini _bmad .idea dist dist.zip TRANSLATION_GUIDE.md BUILD_README.md
```

Expected: directories/files are removed from working tree.

**Step 2: Verify removal**

Run:

```bash
git status --short | sed -n '1,80p'
```

Expected: deleted entries appear for those paths; no command failure.

---

### Task 3: Remove non-Codex documentation directories

**Files:**
- Keep: `docs/codex-cli/`
- Keep: `docs/comparisons/` but prune non-Codex articles in later task
- Keep: `docs/.vitepress/`
- Keep: `docs/public/`
- Keep: `docs/404.md`
- Keep: `docs/disclaimer.md`
- Keep: `docs/index.md`
- Delete: `docs/ai-product-monetization/`
- Delete: `docs/ai-programming/`
- Delete: `docs/ai-programming-tools/`
- Delete: `docs/ai-tool-guides/`
- Delete: `docs/blog/` unless it is generated only from kept content and required by config
- Delete: `docs/bmad-guide/`
- Delete: `docs/chatgpt/`
- Delete: `docs/claude-code/`
- Delete: `docs/claude-code-content/`
- Delete: `docs/claude-code-content-zh/`
- Delete: `docs/claude-code-guide/`
- Delete: `docs/claude-code-official/`
- Delete: `docs/claude-domestic/`
- Delete: `docs/codex-domestic/` only if files are not Codex CLI/content pages; inspect before deleting
- Delete: `docs/courses/`
- Delete: `docs/harness-comparing/`
- Delete: `docs/harness-engineering/`
- Delete: `docs/hello-agents/`
- Delete: `docs/start-here/`
- Delete: `docs/vibe-coding-practice/`
- Delete: `docs/vibe-coding-tips/`
- Keep: `docs/plans/2026-06-02-codex-content-cleanup.md` during implementation; delete at end if user does not want plans in final repo.

**Step 1: Inspect `docs/codex-domestic/`**

Run:

```bash
py - <<'PY'
import os
root='docs/codex-domestic'
if os.path.isdir(root):
    for name in sorted(os.listdir(root))[:80]:
        print(os.path.join(root,name).replace('\\','/'))
PY
```

Expected: decide whether it is Codex-relevant. If it contains Codex domestic usage content, keep it; otherwise delete.

**Step 2: Delete unrelated docs directories**

Run a command that deletes the directories listed above, excluding any Codex-relevant directory confirmed in Step 1.

Expected: only Codex core docs, Codex-related comparisons, VitePress config, public assets, and root pages remain.

---

### Task 4: Prune `docs/comparisons/` to Codex-related articles

**Files:**
- Modify by deletion: `docs/comparisons/*.md`
- Keep: `docs/comparisons/index.md`
- Keep: any `docs/comparisons/*.md` whose filename or body contains `Codex` case-insensitively

**Step 1: Delete non-Codex comparison articles**

Run:

```bash
py - <<'PY'
import os,re
root='docs/comparisons'
for name in sorted(os.listdir(root)):
    path=os.path.join(root,name)
    if not os.path.isfile(path) or not name.endswith('.md') or name=='index.md':
        continue
    text=open(path,'r',encoding='utf-8',errors='ignore').read()
    if not re.search(r'codex', name + '\n' + text, re.I):
        os.remove(path)
        print('deleted', path.replace('\\','/'))
PY
```

Expected: only Codex-related comparison articles remain.

**Step 2: Update `docs/comparisons/index.md`**

Read the file and remove links to deleted pages. Keep only Codex-related comparison links.

Expected: no links point to missing files.

---

### Task 5: Update VitePress navigation and sidebar

**Files:**
- Modify: `docs/index.md`
- Modify: `docs/.vitepress/config.*`
- Modify: `docs/.vitepress/sidebar.*` if present
- Modify: any other VitePress nav/config file under `docs/.vitepress/`

**Step 1: Locate config files**

Run:

```bash
py - <<'PY'
import os
for dirpath, _, filenames in os.walk('docs/.vitepress'):
    for f in filenames:
        print(os.path.join(dirpath,f).replace('\\','/'))
PY
```

Expected: identify exact config/sidebar files.

**Step 2: Remove non-Codex nav/sidebar links**

Edit config/sidebar so the site links only to:

- `/codex-cli/`
- `/comparisons/` if Codex-related comparisons remain
- `/disclaimer` if present

Expected: no navigation/sidebar points to deleted sections such as Claude Code, ChatGPT, BMAD, generic AI programming, courses, etc.

**Step 3: Update homepage**

Edit `docs/index.md` so hero/features focus on Codex CLI and Codex-related comparisons only. Remove ChatGPT, Claude Code, and generic AI programming links unless they are explicitly Codex comparisons.

Expected: homepage does not link to deleted sections.

---

### Task 6: Localize remote image references in remaining content

**Files:**
- Create/Modify: `docs/public/images/localized/`
- Modify: remaining `docs/**/*.md`
- Modify: remaining `docs/.vitepress/**/*.{ts,js,mts,mjs}` if image URLs exist

**Step 1: Scan remaining remote image references**

Run:

```bash
py - <<'PY'
import os,re
pat=re.compile(r'!\[[^\]]*\]\((https?://[^)]+)\)|<img[^>]+src=["\'](https?://[^"\']+)["\']', re.I)
for dirpath, _, filenames in os.walk('docs'):
    for f in filenames:
        if not f.lower().endswith(('.md','.ts','.js','.mjs','.mts','.vue')):
            continue
        path=os.path.join(dirpath,f)
        text=open(path,'r',encoding='utf-8',errors='ignore').read()
        for m in pat.finditer(text):
            print(path.replace('\\','/'), m.group(1) or m.group(2))
PY
```

Expected: list of remote images to localize. If empty, skip download/rewrite.

**Step 2: Download and rewrite remote images**

Create a temporary Node or Python script to:

1. Walk remaining site files.
2. Detect Markdown image syntax and HTML `<img src="https://...">` remote images.
3. Download each image.
4. Save it to `docs/public/images/localized/<slug-or-hash>.<ext>`.
5. Replace references with `/images/localized/<filename>`.
6. Preserve querystring-derived extension when possible; default to `.png` only if no extension/content-type can be determined.

Run the script.

Expected: all matched remote image references are replaced with local `/images/localized/...` paths.

**Step 3: Re-scan remote images**

Run the scan from Step 1 again.

Expected: no remote image references remain in kept files.

---

### Task 7: Verify no deleted-content references remain

**Files:**
- Inspect/modify: remaining `docs/**/*.md`
- Inspect/modify: `docs/.vitepress/**/*`
- Inspect/modify: `package.json`
- Inspect/modify: `scripts/**/*`

**Step 1: Search for deleted section references**

Run:

```bash
py - <<'PY'
import os,re
terms=['claude-code','claude code','chatgpt','gemini','bmad','vibe-coding','ai-programming','harness','hello-agents']
for dirpath, _, filenames in os.walk('.'):
    if '.git' in dirpath.split(os.sep) or 'node_modules' in dirpath.split(os.sep):
        continue
    for f in filenames:
        if not f.lower().endswith(('.md','.ts','.js','.mjs','.json','.yaml','.yml')):
            continue
        path=os.path.join(dirpath,f)
        text=open(path,'r',encoding='utf-8',errors='ignore').read().lower()
        hits=[t for t in terms if t in text]
        if hits:
            print(path.replace('\\','/'), ','.join(hits))
PY
```

Expected: Remaining hits are either legitimate Codex comparison content or should be removed.

**Step 2: Remove obsolete scripts**

Inspect `package.json` and `scripts/`. Delete scripts that only support Claude content sync/translation/promo if they are not used by Codex site build. Update `package.json` scripts accordingly.

Expected: `package.json` contains only useful commands such as `dev`, `build`, `preview`, and any required Markdown checks.

---

### Task 8: Build and fix broken links/config errors

**Files:**
- Modify as needed based on errors: `docs/.vitepress/*`, `docs/**/*.md`, `package.json`

**Step 1: Install dependencies if needed**

Run:

```bash
npm install
```

Expected: dependencies installed or already satisfied.

**Step 2: Build site**

Run:

```bash
npm run build
```

Expected: build succeeds. If it fails due to missing links/imports/config entries, edit the referenced files and rerun.

---

### Task 9: Final git review

**Files:**
- Inspect: all changed files

**Step 1: Show concise status**

Run:

```bash
git status --short --branch
```

Expected: many deletions and focused modifications/additions for localized images.

**Step 2: Review diff summary**

Run:

```bash
git diff --stat
```

Expected: confirms removal of non-Codex content and addition of localized assets.

**Step 3: Report result**

Summarize:

- Directories/files removed.
- Codex content retained.
- Number of images localized.
- Build result.
- Any remaining intentional Codex comparison mentions of Claude/ChatGPT/Gemini.
