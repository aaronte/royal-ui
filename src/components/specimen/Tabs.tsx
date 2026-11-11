'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'

const items = ['Overview', 'Details', 'Notes']
const content: Record<string, string> = {
  Overview: 'The whole story, at a glance.',
  Details: 'The measurements, materials, and decisions behind the page.',
  Notes: 'A place for observations and things to revisit.',
}

export default function Tabs() {
  const id = useId()
  const [active, setActive] = useState('Overview')
  const [keyboard, setKeyboard] = useState(false)
  const list = useRef<HTMLDivElement>(null)
  const indicator = useRef<HTMLSpanElement>(null)
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({})

  useLayoutEffect(() => {
    const root = list.current
    const marker = indicator.current
    if (!root || !marker) return
    function update() {
      const button = buttons.current[active]
      if (!button || !button.offsetWidth) return
      marker!.style.transform = `translateX(${button.offsetLeft}px) scaleX(${button.offsetWidth})`
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(root)
    Object.values(buttons.current).forEach(button => { if (button) observer.observe(button) })
    return () => observer.disconnect()
  }, [active])

  return <>
    <div ref={list} role="tablist" aria-label="Story information" className="ds-tabs" data-keyboard={keyboard}>
      {items.map(item => <button
        key={item}
        ref={node => { buttons.current[item] = node }}
        id={`${id}-${item}`}
        role="tab"
        type="button"
        aria-selected={active === item}
        aria-controls={`${id}-panel`}
        tabIndex={active === item ? 0 : -1}
        onClick={event => { setKeyboard(event.detail === 0); setActive(item) }}
        onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
          event.preventDefault()
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (items.indexOf(active) + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length
          setKeyboard(true)
          setActive(items[next])
          buttons.current[items[next]]?.focus()
        }}
      >{item}</button>)}
      <span ref={indicator} className="ds-tab-indicator" aria-hidden="true" />
    </div>
    <p role="tabpanel" tabIndex={0} id={`${id}-panel`} aria-labelledby={`${id}-${active}`} className="ds-tab-content">{content[active]}</p>
  </>
}
