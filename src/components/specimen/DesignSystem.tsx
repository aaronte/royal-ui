'use client'

import Link from 'next/link'
import Materials from './Materials'
import ComponentCatalog from './ComponentCatalog'
import Checkbox from './Checkbox'
import Button from './Button'
import SelectControl from './SelectControl'
import RangeControl from './RangeControl'
import Tabs from './Tabs'
import PointerReflection from './PointerReflection'
import '@fontsource/iosevka-charon/500.css'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const sections = ['Buttons', 'Materials', 'Colours', 'Fonts', 'Components']
const fontChoices: Record<string, string> = {
  'Host Grotesk': 'var(--font-host-grotesk), Arial, sans-serif',
  'Instrument Sans': 'var(--font-instrument-sans), Arial, sans-serif',
  'IBM Plex Mono': 'var(--font-ibm-plex-mono), monospace',
  'Iosevka Charon': '"Iosevka Charon", monospace',
  Newsreader: 'var(--font-newsreader), Georgia, serif',
  'Source Serif 4': 'var(--font-source-serif), Georgia, serif',
  'Instrument Serif': 'var(--font-instrument-serif), Georgia, serif',
  Georgia: "Georgia, 'Times New Roman', serif",
  Times: "'Times New Roman', Times, serif",
  'Google Sans': 'var(--font-google-sans), Arial, sans-serif',
  'Google Sans Code': 'var(--font-google-sans-code), monospace',
}
const colourTokens = ['ink', 'paper', 'muted', 'rule', 'wash', 'accent'] as const
const colourLabels = ['Ink', 'Paper', 'Secondary text', 'Borders', 'Surface', 'Royal blue']
// Each theme keeps its own six editable colours. The dark values match the dark block in tokens.css.
const darkDefaults = { ink: '#f2f2f2', paper: '#101011', muted: '#a0a0a3', rule: '#29292b', wash: '#161617', accent: '#2555e8' }
const defaults = { revision: 4, size: 16, density: 'Compact', corners: 'Soft', finish: 'Reflective', type: 'Instrument Sans', display: 'Source Serif 4', buttonFont: 'Instrument Sans', ink: '#000000', paper: '#ffffff', muted: '#666666', rule: '#d8d8d8', wash: '#f5f5f5', accent: '#2555e8', theme: 'Light', dark: darkDefaults }

function Specimen({ id, title, note, children }: { id: string; title: string; note: string; children: ReactNode }) {
  return <section id={id.toLowerCase()} className="ds-section"><div className="ds-section-heading"><h2>{title}</h2><p>{note}</p></div>{children}</section>
}

export default function DesignSystem() {
  const [settings, setSettings] = useState(defaults)
  const [page, setPage] = useState(1)
  const [saved, setSaved] = useState(false)
  const [notice, setNotice] = useState('')
  const [copyState, setCopyState] = useState('Copy tokens')
  const [loading, setLoading] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const restore = setTimeout(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('editorial-system-v1') || 'null')
      if (stored && [14, 15, 16, 17, 18, 19, 20].includes(stored.size) && ['Comfortable', 'Compact'].includes(stored.density) && ['Square', 'Soft'].includes(stored.corners) && ['Serif', 'Sans', 'Instrument Sans'].includes(stored.type)) setSettings({ ...defaults, ...stored, revision: defaults.revision, density: defaults.density, corners: defaults.corners, finish: ['Matte', 'Reflective', 'Frosted glass'].includes(stored.finish) ? stored.finish : defaults.finish, display: Object.prototype.hasOwnProperty.call(fontChoices, stored.display) ? stored.display : defaults.display, buttonFont: defaults.buttonFont, theme: stored.theme === 'Dark' ? 'Dark' : 'Light', dark: Object.fromEntries(colourTokens.map(key => [key, /^#[0-9a-f]{6}$/i.test(stored.dark?.[key]) ? stored.dark[key] : darkDefaults[key]])) as typeof darkDefaults, ...Object.fromEntries(colourTokens.map(key => [key, key === 'accent' && ((stored.revision === 2 && stored[key]?.toLowerCase() === '#263d58') || (stored.revision == null && ['#1d4ed8', '#203a63', '#14243b', '#263d58'].includes(stored[key]?.toLowerCase()))) ? defaults.accent : /^#[0-9a-f]{6}$/i.test(stored[key]) ? stored[key] : defaults[key as keyof typeof defaults]])) })
    } catch { /* Use the defaults when local storage is unavailable. */ }
    }, 0)
    return () => { clearTimeout(restore); if (timer.current) clearTimeout(timer.current); if (loadingTimer.current) clearTimeout(loadingTimer.current) }
  }, [])

  function update(next: typeof settings) {
    setSettings(next)
    try { localStorage.setItem('editorial-system-v1', JSON.stringify(next)) } catch { /* Settings still work in memory. */ }
  }

  async function copyTokens() {
    const value = `:root${dark ? '.dark' : ''} {\n${Object.entries(tokens).map(([key, value]) => `  ${key}: ${value};`).join('\n')}\n}`
    try { await navigator.clipboard.writeText(value); setCopyState('Copied ✓') } catch { setCopyState('Copy unavailable'); setNotice('Clipboard access is unavailable in this browser.') }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('Copy tokens'), 2500)
  }

  const dark = settings.theme === 'Dark'
  const palette = dark ? settings.dark : settings
  // Every edited token goes on the root element. Colours mixed from them follow an edit, and overlays rendered into <body> see the same values as the page.
  const tokens: Record<string, string> = {
    ...Object.fromEntries(colourTokens.map(token => [`--royal-color-${token}`, palette[token]])),
    '--royal-font-display': fontChoices[settings.display],
    '--royal-font-button': fontChoices[settings.buttonFont],
    '--royal-text-body': `${settings.size}px`,
    '--royal-font-label': fontChoices['Instrument Sans'],
    '--royal-font-code': fontChoices['IBM Plex Mono'],
    '--royal-font-body': settings.type === 'Instrument Sans' ? fontChoices['Instrument Sans'] : settings.type === 'Serif' ? "Georgia, 'Times New Roman', serif" : 'var(--font-google-sans), Arial, sans-serif',
    '--royal-radius-control': settings.corners === 'Square' ? '0px' : '6px',
    '--royal-control-height': settings.density === 'Compact' ? '34px' : '40px',
  }
  const tokenKey = JSON.stringify(tokens)
  useLayoutEffect(() => {
    const root = document.documentElement
    const values: Record<string, string> = JSON.parse(tokenKey)
    Object.entries(values).forEach(([key, value]) => root.style.setProperty(key, value))
    root.classList.toggle('dark', dark)
    return () => {
      Object.keys(values).forEach(key => root.style.removeProperty(key))
      root.classList.remove('dark')
    }
  }, [tokenKey, dark])
  const style = { '--specimen-gap': settings.density === 'Compact' ? '16px' : '24px' } as CSSProperties

  return <main className="editorial-system" data-display={settings.display} data-finish={settings.finish} style={style}>
    <PointerReflection />
    <div className="ds-sheet">
      <header className="ds-simple-header"><div><Link href="/">Aaron Te</Link><h1>Design system</h1></div><div className="ds-header-actions"><button className="ds-text-button" onClick={() => update({ ...settings, theme: dark ? 'Light' : 'Dark' })}>{dark ? 'Light theme' : 'Dark theme'}</button><button className="ds-text-button" onClick={() => update({ ...defaults, theme: settings.theme })}>Reset</button><Button className="royal-button" onClick={copyTokens}>{copyState}</Button></div></header>
      <nav className="ds-index" aria-label="Specimen sections">{sections.map(item => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav>

      <Specimen id="Buttons" title="Buttons" note="Filled, outlined, and text."><div className="ds-inline-settings"><label>Finish<SelectControl value={settings.finish} onChange={e => update({ ...settings, finish: e.target.value })}><option>Matte</option><option>Reflective</option><option>Frosted glass</option></SelectControl></label></div><div className="ds-button-specimens"><div><span className="ds-label">Emphasis</span><div className="ds-row"><Button className="royal-button royal-primary" onClick={() => setNotice('Primary action selected.')}>Continue</Button><Button className="royal-button" onClick={() => setNotice('Secondary action selected.')}>Cancel</Button><button className="ds-text-button" onClick={() => setNotice('A quieter action selected.')}>Learn more</button></div></div><div><span className="ds-label">States</span><div className="ds-row"><Button className="royal-button royal-primary" disabled>Disabled</Button><Button className="royal-button" disabled={loading} onClick={() => { setLoading(true); loadingTimer.current = setTimeout(() => { setLoading(false); setNotice('The example action is complete.') }, 1200) }}>{loading ? 'Working…' : 'Try loading'}</Button><Button className="royal-button" aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? '✓ Saved' : '+ Save item'}</Button></div></div><div><span className="ds-label">Sizes & links</span><div className="ds-row"><Button className="royal-button ds-small" onClick={() => setNotice('Small action selected.')}>Small</Button><Button className="royal-button ds-large" onClick={() => setNotice('Large action selected.')}>Large</Button><a className="ds-inline-link" href="#fonts">View fonts</a></div></div></div></Specimen>
      <Specimen id="Materials" title="Materials" note="Transparency, soft light, and depth."><Materials /></Specimen>
      <Specimen id="Colours" title="Colours" note={`Select a swatch to change its ${dark ? 'dark' : 'light'} theme value.`}>
        <div className="ds-palette ds-editable-palette">{colourTokens.map((token, i) => <label key={token}><input type="color" aria-label={`${colourLabels[i]} colour`} value={palette[token]} onChange={e => update(dark ? { ...settings, dark: { ...settings.dark, [token]: e.target.value } } : { ...settings, [token]: e.target.value })} /><strong>{colourLabels[i]}</strong><code>{palette[token].toUpperCase()}</code><small>--color-{token}</small></label>)}</div>
      </Specimen>
      <Specimen id="Fonts" title="Fonts" note="Compare the same content in different faces."><div className="ds-inline-settings"><label>Headings<SelectControl value={settings.display} onChange={e => update({ ...settings, display: e.target.value })}>{Object.keys(fontChoices).map(font => <option key={font}>{font}</option>)}</SelectControl></label><label>Body<SelectControl value={settings.type} onChange={e => update({ ...settings, type: e.target.value })}><option value="Instrument Sans">Instrument Sans</option><option value="Serif">Georgia</option><option value="Sans">Google Sans</option></SelectControl></label><label>Body size<RangeControl label="Body type size" min={14} max={20} value={settings.size} suffix="px" onChange={value => update({ ...settings, size: value })} /></label></div><div className="ds-type-grid"><div className="ds-type-display"><span className="ds-label">Headings / {settings.display}</span><p>Ideas into<br />working things.</p><span className="ds-type-alphabet">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm</span></div><div className="ds-type-scale"><div><code>32 / H1</code><h3>The lead story</h3></div><div><code>24 / H2</code><h4>A little more context</h4></div><div><code>18 / H3</code><h5>The finer details</h5></div><div><code>{settings.size} / Body</code><p>This is the body text. Use it to compare letterforms, line length, and reading size alongside the headings.</p></div><div><code>14 / Label</code><span className="ds-label">Labels and supporting information</span></div></div></div></Specimen>
      <Specimen id="Components" title="Components" note="The shadcn library, in our visual language."><ComponentCatalog theme={dark ? 'dark' : 'light'} /></Specimen>
      <details className="ds-additional"><summary>Other components</summary>
      <Specimen id="Forms" title="Form essentials" note="Familiar controls. Considered details."><div className="ds-form-grid"><div className="ds-field"><label htmlFor="spec-name">Your name</label><input id="spec-name" placeholder="e.g. Aaron Te" /><small>A label above. A helpful note below.</small></div><div className="ds-field"><label htmlFor="spec-email">Email address <span className="ds-required">Required</span></label><input id="spec-email" type="email" defaultValue="aaron@" aria-invalid="true" aria-describedby="email-error" /><small id="email-error" className="ds-error">! Enter a complete email address.</small></div><div className="ds-field"><label htmlFor="spec-role">Area of interest</label><SelectControl id="spec-role"><option>Design & typography</option><option>Components & interaction</option><option>Layout & composition</option></SelectControl></div><div className="ds-field"><label htmlFor="spec-disabled">Read-only field</label><input id="spec-disabled" value="Design system" readOnly /><small>Available to read and copy.</small></div><div className="ds-field"><label htmlFor="spec-note">A note for the next edition</label><textarea id="spec-note" placeholder="What should we try next?" rows={3} /></div><div className="ds-choices"><label><Checkbox defaultChecked /> Send me the next edition</label><label><Checkbox /> Include occasional studio notes</label><fieldset><legend>Reading preference</legend><label><input type="radio" name="reading" defaultChecked /> The daily digest</label><label><input type="radio" name="reading" /> The Sunday edition</label></fieldset><label className="ds-switch-label"><input className="ds-switch" type="checkbox" role="switch" defaultChecked /> Show annotations</label></div></div></Specimen>
      <Specimen id="Navigation" title="Finding your way" note="Small signposts that keep things moving."><div className="ds-navigation-grid"><div><span className="ds-label">Tabs</span><Tabs /></div><div><span className="ds-label">Breadcrumbs & pagination</span><nav aria-label="Breadcrumb" className="ds-breadcrumb"><a href="#colours">Library</a><span>/</span><a href="#fonts">Foundations</a><span>/</span><span aria-current="page">Type</span></nav><nav aria-label="Example pagination" className="ds-pagination"><Button aria-label="Previous page" disabled={page === 1} onClick={() => setPage(page - 1)}>←</Button>{[1, 2, 3].map(n => <Button key={n} aria-label={`Page ${n}`} aria-current={page === n ? 'page' : undefined} onClick={() => setPage(n)}>{n}</Button>)}<Button aria-label="Next page" disabled={page === 3} onClick={() => setPage(page + 1)}>→</Button></nav><small className="ds-muted" aria-live="polite">Page {page} of 3</small></div></div></Specimen>
      <Specimen id="Feedback" title="Status & feedback" note="Meaning through words and form, even without colour."><div className="ds-feedback-grid"><div><span className="ds-label">Badges</span><div className="ds-row"><span className="ds-badge ds-badge-solid">Published</span><span className="ds-badge">In review</span><span className="ds-badge ds-badge-dashed">Draft</span></div><div className="ds-alert"><strong>✓ Your changes are saved.</strong><p>This edition is ready for another look.</p></div><div className="ds-alert ds-alert-error"><strong>! Something needs attention.</strong><p>Review the marked fields and try again.</p></div></div><div><span className="ds-label">Disclosure</span><details className="ds-disclosure" open><summary>What makes this feel editorial?</summary><p>Serif headlines, a deliberate type scale, and generous space around each element.</p></details><details className="ds-disclosure"><summary>What should we decide next?</summary><p>Try the material and reflection controls above. Font and colour changes carry through every specimen.</p></details><button className="ds-text-button ds-dialog-trigger" onClick={() => dialog.current?.showModal()}>Open a dialog example ↗</button></div></div></Specimen>
      <Specimen id="Composition" title="The parts, together" note="A small editorial card to put the system to work."><div className="ds-composition"><article className="ds-story"><div className="ds-row"><span className="ds-badge">Studio notes</span><span className="ds-label">5 min read</span></div><h3>The details are<br />the design.</h3><p>A good system makes room for a point of view. The same type, spacing, and controls, composed into something with a little character.</p><a href="#fonts" className="ds-inline-link">Return to the foundations ↗</a></article><div className="ds-composition-note"><span className="ds-label">Anatomy of a small story</span><ol><li><span>01</span>A quiet label sets the context.</li><li><span>02</span>A headline does the heavy lifting.</li><li><span>03</span>Body copy leaves room to read.</li><li><span>04</span>One clear link carries you onward.</li></ol><Button className="royal-button" onClick={copyTokens}>{copyState}</Button><small>Take the current foundation values with you.</small></div></div></Specimen>
      </details>
      <footer className="ds-footer"><span>Working draft · Saved in this browser</span><a href="#">Back to the top ↑</a></footer>
    </div>
    {notice && <div className="ds-toast" role="status"><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button></div>}
    <dialog className="ds-dialog" ref={dialog} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }}><PointerReflection /><div><span className="ds-label">A moment of focus</span><h2>Room for a decision.</h2><p>A dialog uses the same type, materials, and controls as the rest of the page. Press Escape or close it to return.</p><Button className="royal-button royal-primary" onClick={() => dialog.current?.close()}>Back to the page →</Button></div></dialog>
  </main>
}
