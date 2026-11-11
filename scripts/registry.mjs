// Writes registry.json from the source, so the registry can't drift from it.
// `npm run registry` runs this and then `shadcn build`, which writes public/r.
// ROYAL_REGISTRY_URL sets where items point for their dependencies; it
// defaults to the public files on GitHub.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'

const base = process.env.ROYAL_REGISTRY_URL ?? 'https://raw.githubusercontent.com/aaronte/royal-ui/main/public/r'
const url = name => `${base}/${name}.json`
const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const versions = { ...pkg.dependencies, ...pkg.devDependencies }
// The consuming app provides these.
const provided = new Set(['react', 'react-dom', 'next'])

function imports(file) {
  const source = readFileSync(file, 'utf8')
  return [...source.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)].map(match => match[1])
}

function dependencies(file) {
  const npm = new Set()
  const registry = new Set()
  for (const specifier of imports(file)) {
    if (specifier.startsWith('@/components/ui/')) registry.add(specifier.slice('@/components/ui/'.length))
    else if (specifier.startsWith('@/hooks/')) registry.add(specifier.slice('@/hooks/'.length))
    else if (specifier.startsWith('@/') || specifier.startsWith('.')) throw new Error(`${file} imports ${specifier}, which the registry does not ship`)
    else {
      const name = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0]
      if (provided.has(name)) continue
      if (!versions[name]) throw new Error(`${file} imports ${name}, which is not in package.json`)
      npm.add(`${name}@${versions[name]}`)
    }
  }
  return { npm: [...npm].sort(), registry: [...registry].sort() }
}

// The shadcn variables, read from the :root block in royal.css. Dark uses the
// same expressions, because the tokens switch themselves; only the floating
// surface differs.
const royalCss = readFileSync('src/styles/royal.css', 'utf8')
const rootBlock = royalCss.match(/^:root \{([^}]*)\}/m)[1]
const light = Object.fromEntries([...rootBlock.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]))
const darkBlock = royalCss.match(/^\.dark \{([^}]*)\}/m)[1]
const dark = { ...light, ...Object.fromEntries([...darkBlock.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()])) }

const fonts = [
  { name: 'font-source-serif-4', title: 'Source Serif 4', import: 'Source_Serif_4', variable: '--font-source-serif', family: "'Source Serif 4', Georgia, serif" },
  { name: 'font-instrument-sans', title: 'Instrument Sans', import: 'Instrument_Sans', variable: '--font-instrument-sans', family: "'Instrument Sans', Arial, sans-serif" },
  { name: 'font-ibm-plex-mono', title: 'IBM Plex Mono', import: 'IBM_Plex_Mono', variable: '--font-ibm-plex-mono', family: "'IBM Plex Mono', ui-monospace, monospace", weight: ['400', '500'] },
]

const items = [
  ...fonts.map(font => ({
    name: font.name,
    type: 'registry:font',
    title: font.title,
    description: `${font.title}, which Royal's font tokens read from ${font.variable}.`,
    font: { family: font.family, provider: 'google', import: font.import, variable: font.variable, subsets: ['latin'], ...(font.weight ? { weight: font.weight } : {}) },
  })),
  {
    name: 'royal',
    type: 'registry:theme',
    title: 'Royal',
    description: "Royal's tokens and the stylesheet that restyles the shadcn components, light and dark. Every Royal component installs it.",
    dependencies: [`tw-animate-css@${versions['tw-animate-css']}`],
    registryDependencies: fonts.map(font => url(font.name)),
    files: [
      { path: 'src/styles/tokens.css', type: 'registry:file', target: '@lib/royal/tokens.css' },
      { path: 'src/styles/royal.css', type: 'registry:file', target: '@lib/royal/royal.css' },
    ],
    // The dark variant adds no specificity, as in Royal's own app. shadcn's
    // default (&:is(.dark *)) would let dark: utilities outrank Royal's rules.
    // The CLI appends this after the existing definition, and the later one wins.
    css: {
      '@import "../lib/royal/tokens.css"': {},
      '@import "../lib/royal/royal.css"': {},
      '@custom-variant dark (&:where(.dark, .dark *))': {},
    },
    cssVars: {
      theme: {
        'font-sans': 'var(--royal-font-body)',
        'font-heading': 'var(--royal-font-display)',
        'font-mono': 'var(--royal-font-code)',
        'radius-sm': 'var(--royal-radius-control)',
        'radius-md': 'var(--royal-radius-control)',
        'radius-lg': 'var(--royal-radius-panel)',
        'radius-xl': 'var(--royal-radius-panel)',
      },
      light,
      dark,
    },
  },
]

for (const file of readdirSync('src/hooks').filter(name => name === 'use-mobile.ts')) {
  const { npm } = dependencies(`src/hooks/${file}`)
  items.push({ name: file.replace(/\.tsx?$/, ''), type: 'registry:hook', dependencies: npm, files: [{ path: `src/hooks/${file}`, type: 'registry:hook' }] })
}

for (const file of readdirSync('src/components/ui').filter(name => name.endsWith('.tsx')).sort()) {
  const name = file.replace(/\.tsx$/, '')
  const { npm, registry } = dependencies(`src/components/ui/${file}`)
  items.push({
    name,
    type: 'registry:ui',
    dependencies: npm,
    registryDependencies: [url('royal'), ...registry.map(url)],
    files: [{ path: `src/components/ui/${file}`, type: 'registry:ui' }],
  })
}

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'royal',
  homepage: 'https://github.com/aaronte/royal-ui',
  items,
}
writeFileSync('registry.json', JSON.stringify(registry, null, 2) + '\n')
console.log(`registry.json: ${items.length} items, dependencies at ${base}`)
