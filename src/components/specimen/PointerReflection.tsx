'use client'

import { useEffect, useRef } from 'react'

const targets = 'button:not(:disabled), a[href], input:not(:disabled):not([readonly]), select:not(:disabled), textarea:not(:disabled), summary, [role="slider"]:not([aria-disabled="true"]):not([data-disabled]), .ds-glass-panel'
const filled = '.royal-primary, [aria-pressed="true"], input:checked, [aria-selected="true"], [aria-current="page"], [data-state="checked"], [data-slot="button"][data-variant="default"]'

const clear = (colour: string) => colour === 'transparent' || /(,\s*0|\/\s*0)\)$/.test(colour)

/** One computed shadow layer, colour first. Ring utilities leave layers that are transparent or zero size. */
function shows(layer: string) {
  const colour = layer.match(/[a-z]+\([^)]*\)/)?.[0]
  const lengths = layer.replace(colour ?? '', '').match(/-?[\d.]+px/g) ?? []
  return !!colour && !clear(colour) && lengths.some(length => parseFloat(length) !== 0)
}

/** Light needs something to land on. A row or link with no border, shadow or fill would show the beam as a loose patch clipped to an invisible box. */
function hasSurface(element: HTMLElement) {
  if (element.matches(filled) || element.closest('.ds-glass-panel') || (element instanceof HTMLInputElement && element.type === 'color')) return true
  const style = getComputedStyle(element)
  if (style.boxShadow !== 'none' && style.boxShadow.split(/,(?![^(]*\))/).some(shows)) return true
  return (['Top', 'Right', 'Bottom', 'Left'] as const).some(side => parseFloat(style[`border${side}Width`]) > 0 && !clear(style[`border${side}Color`]))
}

/** Reflected light tracks directly; only its appearance fades. */
export default function PointerReflection() {
  const surface = useRef<HTMLDivElement>(null)
  const light = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = surface.current
    const beam = light.current
    const root = frame?.closest('dialog, main')
    if (!frame || !beam || !root) return

    const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)')
    const highContrast = matchMedia('(forced-colors: active), (prefers-contrast: more)')
    let target: HTMLElement | null = null
    let rect: DOMRect | null = null
    let pointerX = 0
    let pointerY = 0

    function hide() {
      frame!.dataset.visible = 'false'
      target = null
      rect = null
    }

    function position() {
      if (!target || !rect) return
      const nextX = reduceMotion.matches ? rect.width / 2 : Math.max(0, Math.min(rect.width, pointerX - rect.left))
      const nextY = reduceMotion.matches ? rect.height / 2 : Math.max(0, Math.min(rect.height, pointerY - rect.top))
      beam!.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, -50%)`
    }

    function move(event: PointerEvent) {
      if (!finePointer.matches || highContrast.matches || event.pointerType !== 'mouse') return hide()
      const hit = event.target instanceof Element ? event.target.closest<HTMLElement>(targets) : null
      if (!hit || !root!.contains(hit) || hit.closest('[inert]') || hit.closest('dialog') !== frame!.closest('dialog')) return hide()
      pointerX = event.clientX
      pointerY = event.clientY
      if (hit !== target) {
        if (!hasSurface(hit)) return hide()
        target = hit
        rect = hit.getBoundingClientRect()
        const radius = getComputedStyle(hit).borderRadius
        frame!.style.width = `${rect.width}px`
        frame!.style.height = `${rect.height}px`
        frame!.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`
        frame!.style.borderRadius = hit instanceof HTMLInputElement && hit.type === 'radio' ? '50%' : radius === '0px' ? '4px' : radius
        const darkSurface = hit.matches(filled) || hit.closest('.ds-glass-panel[data-tone="dark"]')
        frame!.dataset.tone = darkSurface ? 'dark' : 'light'
        frame!.dataset.surface = hit instanceof HTMLInputElement && hit.type === 'color' ? 'swatch' : hit.closest('.ds-glass-panel') ? 'glass' : 'control'
        // A broad directional catch behaves like reflected light, not a cursor spotlight.
        beam!.style.width = `${Math.max(100, Math.min(480, rect.width * 1.6))}px`
        beam!.style.height = `${Math.max(80, Math.min(500, rect.height * 3))}px`
        frame!.dataset.visible = 'true'
        position()
      } else position()
    }

    // Hide on a layout change rather than leave a highlight over another control.
    root.addEventListener('pointermove', move as EventListener, { passive: true })
    root.addEventListener('pointerleave', hide)
    root.addEventListener('pointercancel', hide)
    root.addEventListener('focusin', hide)
    window.addEventListener('scroll', hide, true)
    window.addEventListener('resize', hide)
    window.addEventListener('blur', hide)
    finePointer.addEventListener('change', hide)
    reduceMotion.addEventListener('change', hide)
    highContrast.addEventListener('change', hide)

    return () => {
      root.removeEventListener('pointermove', move as EventListener)
      root.removeEventListener('pointerleave', hide)
      root.removeEventListener('pointercancel', hide)
      root.removeEventListener('focusin', hide)
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
      window.removeEventListener('blur', hide)
      finePointer.removeEventListener('change', hide)
      reduceMotion.removeEventListener('change', hide)
      highContrast.removeEventListener('change', hide)
    }
  }, [])

  return <div ref={surface} className="ds-pointer-reflection" aria-hidden="true" data-visible="false"><div ref={light} className="ds-pointer-light" /></div>
}
