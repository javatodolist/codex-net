#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'

function parseArgs(argv) {
  const args = {
    check: false,
    root: 'docs',
  }

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === '--check') {
      args.check = true
      continue
    }
    if (token === '--root') {
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        throw new Error('Missing value for --root')
      }
      args.root = next
      i += 1
      continue
    }
    throw new Error(`Unknown argument: ${token}`)
  }

  return args
}

async function walkMarkdownFiles(rootDir) {
  const files = []
  const stack = [rootDir]

  while (stack.length > 0) {
    const current = stack.pop()
    const entries = await fs.readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
        continue
      }
      if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  }

  return files
}

function decodeWrappedMarkdown(raw) {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return null
  }

  let parsed
  try {
    parsed = JSON.parse(trimmed)
  } catch {
    return null
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return null
  }

  if (!parsed.every(item => item && typeof item === 'object' && typeof item.text === 'string')) {
    return null
  }

  const decoded = parsed.map(item => item.text).join('\n')
  if (!decoded.trim()) {
    return null
  }

  return decoded.endsWith('\n') ? decoded : `${decoded}\n`
}

async function main() {
  const { check, root } = parseArgs(process.argv.slice(2))
  const rootDir = path.resolve(process.cwd(), root)
  const markdownFiles = await walkMarkdownFiles(rootDir)

  let changed = 0
  for (const file of markdownFiles) {
    const raw = await fs.readFile(file, 'utf8')
    const decoded = decodeWrappedMarkdown(raw)
    if (!decoded || decoded === raw) {
      continue
    }

    changed += 1
    if (!check) {
      await fs.writeFile(file, decoded, 'utf8')
      console.log(`fixed: ${path.relative(process.cwd(), file)}`)
    } else {
      console.log(`would-fix: ${path.relative(process.cwd(), file)}`)
    }
  }

  if (check) {
    if (changed > 0) {
      console.error(`\nFound ${changed} wrapped markdown file(s).`)
      process.exit(1)
    }
    console.log('No wrapped markdown files found.')
    return
  }

  console.log(`\nDone. Fixed ${changed} file(s).`)
}

main().catch(error => {
  console.error(error.message)
  process.exit(1)
})

