import type { ComponentPropsWithoutRef } from 'react'

export default function SelectControl({ className = '', ...props }: ComponentPropsWithoutRef<'select'>) {
  return <span className="ds-select-control"><select className={`ds-select ${className}`.trim()} {...props} /></span>
}
