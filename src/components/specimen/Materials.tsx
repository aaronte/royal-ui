'use client'

import { useState, type CSSProperties } from 'react'
import Button from './Button'
import SelectControl from './SelectControl'
import RangeControl from './RangeControl'

export default function Materials() {
  const [opacity, setOpacity] = useState(68)
  const [blur, setBlur] = useState(24)
  const [reflection, setReflection] = useState(20)
  const [dark, setDark] = useState(false)

  const style = {
    '--royal-glass-opacity': `${opacity}%`,
    '--royal-glass-blur': `${blur}px`,
    '--royal-glass-reflection': reflection / 100,
  } as CSSProperties

  return <div className="ds-materials" style={style}>
    <div className="ds-material-controls">
      <label>Surface<SelectControl value={dark ? 'Smoked glass' : 'Frosted glass'} onChange={e => setDark(e.target.value === 'Smoked glass')}><option>Frosted glass</option><option>Smoked glass</option></SelectControl></label>
      <label>Opacity<RangeControl label="Glass opacity" min={60} max={90} value={opacity} suffix="%" onChange={setOpacity} /></label>
      <label>Blur<RangeControl label="Glass blur" min={0} max={32} value={blur} suffix="px" onChange={setBlur} /></label>
      <label>Reflection<RangeControl label="Glass reflection" min={0} max={100} value={reflection} suffix="%" onChange={setReflection} /></label>
    </div>

    <div className="ds-material-stage">
      <div className="ds-material-page" aria-hidden="true">
        <span className="ds-material-page-label">The studio / Notes & observations</span>
        <span className="ds-material-page-title">A little<br />perspective.</span>
        <span className="ds-material-page-copy">The same page, seen through a different material.</span>
      </div>
      <div className="ds-glass-panel" data-tone={dark ? 'dark' : 'light'}>
        <div className="ds-glass-content">
          <span className="ds-material-caption">Surface preview</span>
          <h3>A layer of clarity.</h3>
          <p>The page stays visible underneath. A softly lit edge separates the panel from the content behind it.</p>
          <dl className="ds-material-properties"><div><dt>Opacity</dt><dd>{opacity}%</dd></div><div><dt>Blur</dt><dd>{blur}px</dd></div><div><dt>Reflection</dt><dd>{reflection}%</dd></div></dl>
          <Button className="royal-primary" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? 'Try frosted glass' : 'Try smoked glass'} <span aria-hidden="true">↗</span></Button>
        </div>
      </div>
      <span className="ds-material-stage-caption">Live backdrop blur · {dark ? 'Smoked glass' : 'Frosted glass'}</span>
    </div>
    <div className="ds-material-notes"><p><strong>Glass</strong> for floating panels, menus, and overlays.</p><p><strong>Reflection</strong> for a restrained highlight on actions.</p><p><strong>Matte</strong> for reading surfaces and form fields.</p></div>
  </div>
}
