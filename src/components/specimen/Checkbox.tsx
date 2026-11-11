'use client'

export default function Checkbox({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return <input type="checkbox" className="ds-checkbox" defaultChecked={defaultChecked} />
}
