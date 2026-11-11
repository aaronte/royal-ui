'use client'

import type { CSSProperties } from 'react'

type Props = {
  label: string
  min: number
  max: number
  value: number
  suffix: string
  onChange: (value: number) => void
}

export default function RangeControl({ label, min, max, value, suffix, onChange }: Props) {
  return <span className="ds-range"><input
    aria-label={label}
    type="range"
    min={min}
    max={max}
    value={value}
    style={{ '--range-progress': `${((value - min) / (max - min)) * 100}%` } as CSSProperties}
    onChange={event => onChange(Number(event.target.value))}
  /><output>{value}{suffix}</output></span>
}
