#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REQUIRED_PACKAGES = ['esbuild', '@parcel/watcher']
const PLACEHOLDER = 'set this to true or false'
const REPO_POLICY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'pnpm-workspace.yaml')

function parseAllowBuilds(yamlText) {
  const allowBuilds = Object.create(null)
  let inMap = false

  for (const rawLine of yamlText.split(/\r?\n/)) {
    const line = stripYamlComment(rawLine)
    if (!inMap) {
      if (/^allowBuilds:\s*$/.test(line)) {
        inMap = true
      }
      continue
    }

    if (/^\S/.test(line) && line.trim() !== '') {
      inMap = false
      continue
    }

    // Top-level map entries only (exactly two spaces). Nested keys must not count.
    const match = line.match(/^  (?:'([^']+)'|"([^"]+)"|([^:#\s]+))\s*:\s*(.*?)\s*$/)
    if (!match) {
      continue
    }
    allowBuilds[match[1] || match[2] || match[3]] = match[4]
  }

  return allowBuilds
}

function evaluateAllowBuildsPolicy(yamlText, requiredPackages = REQUIRED_PACKAGES) {
  const allowBuilds = parseAllowBuilds(yamlText)
  const errors = []

  for (const pkg of Object.keys(allowBuilds)) {
    const raw = allowBuilds[pkg]
    if (raw.toLowerCase().includes(PLACEHOLDER)) {
      errors.push(`${pkg}: still a placeholder (${raw})`)
    }
  }

  for (const pkg of requiredPackages) {
    if (!Object.prototype.hasOwnProperty.call(allowBuilds, pkg)) {
      errors.push(`${pkg}: missing from allowBuilds`)
      continue
    }

    const raw = allowBuilds[pkg]
    if (raw.toLowerCase().includes(PLACEHOLDER)) {
      continue
    }

    // pnpm allowlists with yaml boolean true (js-yaml → value === true)
    if (raw !== 'true') {
      errors.push(`${pkg}: not allowed (value: ${raw})`)
    }
  }

  return errors
}

function stripYamlComment(line) {
  let inSingle = false
  let inDouble = false
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]
    if (ch === "'" && !inDouble) {
      inSingle = !inSingle
      continue
    }
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble
      continue
    }
    if (ch === '#' && !inSingle && !inDouble && (i === 0 || /\s/.test(line[i - 1]))) {
      return line.slice(0, i).trimEnd()
    }
  }
  return line
}

function parseArgs(argv) {
  const args = { file: REPO_POLICY, selfTest: false }
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === '--self-test') {
      args.selfTest = true
      continue
    }
    if (token === '--file') {
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        throw new Error('Missing value for --file')
      }
      args.file = path.resolve(process.cwd(), next)
      i += 1
      continue
    }
    throw new Error(`Unknown argument: ${token}`)
  }
  return args
}

function assertErrors(name, actual, expected) {
  const missing = expected.filter(item => !actual.includes(item))
  const extra = actual.filter(item => !expected.includes(item))
  if (missing.length === 0 && extra.length === 0) {
    return null
  }
  return `${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
}

function runSelfTest() {
  const cases = [
    {
      name: 'placeholders are rejected',
      yaml: "allowBuilds:\n  '@parcel/watcher': set this to true or false\n  esbuild: set this to true or false\n",
      expected: [
        '@parcel/watcher: still a placeholder (set this to true or false)',
        'esbuild: still a placeholder (set this to true or false)',
      ],
    },
    {
      name: 'missing watcher is rejected',
      yaml: 'allowBuilds:\n  esbuild: true\n',
      expected: ['@parcel/watcher: missing from allowBuilds'],
    },
    {
      name: 'missing esbuild is rejected',
      yaml: "allowBuilds:\n  '@parcel/watcher': true\n",
      expected: ['esbuild: missing from allowBuilds'],
    },
    {
      name: 'explicit false is rejected',
      yaml: "allowBuilds:\n  '@parcel/watcher': true\n  esbuild: false\n",
      expected: ['esbuild: not allowed (value: false)'],
    },
    {
      name: 'explicit true is accepted',
      yaml: "allowBuilds:\n  '@parcel/watcher': true\n  esbuild: true\n",
      expected: [],
    },
    {
      name: 'extra placeholder is rejected',
      yaml: "allowBuilds:\n  '@parcel/watcher': true\n  esbuild: true\n  other-native: set this to true or false\n",
      expected: ['other-native: still a placeholder (set this to true or false)'],
    },
    {
      name: 'nested map is not treated as top-level allow',
      yaml: "allowBuilds:\n  nested:\n    esbuild: true\n    '@parcel/watcher': true\n",
      expected: [
        'esbuild: missing from allowBuilds',
        '@parcel/watcher: missing from allowBuilds',
      ],
    },
    {
      name: 'true#foo is not a YAML boolean true',
      yaml: "allowBuilds:\n  '@parcel/watcher': true\n  esbuild: true#foo\n",
      expected: ['esbuild: not allowed (value: true#foo)'],
    },
    {
      name: 'quoted true is not a YAML boolean true',
      yaml: "allowBuilds:\n  '@parcel/watcher': true\n  esbuild: \"true\"\n",
      expected: ['esbuild: not allowed (value: "true")'],
    },
  ]

  const failures = []
  for (const fixture of cases) {
    const failure = assertErrors(fixture.name, evaluateAllowBuildsPolicy(fixture.yaml), fixture.expected)
    if (failure) {
      failures.push(failure)
    }
  }

  if (failures.length > 0) {
    console.error('self-test failed:')
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log('self-test passed: placeholder/missing/denied/nested/non-boolean maps fail; explicit true is allowed')
}

async function checkPolicyFile(policyPath) {
  let yamlText
  try {
    yamlText = await readFile(policyPath, 'utf8')
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      throw new Error(`pnpm allowBuilds policy file not found: ${policyPath}`)
    }
    throw error
  }

  const errors = evaluateAllowBuildsPolicy(yamlText)
  if (errors.length > 0) {
    console.error(`pnpm allowBuilds policy is invalid (${policyPath}):`)
    for (const error of errors) {
      console.error(`  - ${error}`)
    }
    process.exit(1)
  }

  console.log(`allowBuilds policy OK: ${REQUIRED_PACKAGES.join(', ')} explicitly allowed (${policyPath})`)
}

async function main() {
  const { file, selfTest } = parseArgs(process.argv.slice(2))
  if (selfTest) {
    runSelfTest()
    return
  }
  await checkPolicyFile(file)
}

main().catch(error => {
  console.error(error.message)
  process.exit(1)
})
