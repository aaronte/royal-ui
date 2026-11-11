import type { ComponentPropsWithoutRef } from 'react'

export default function Button({ className = '', type = 'button', ...props }: ComponentPropsWithoutRef<'button'>) {
  return <button type={type} className={['royal-button', ...className.split(/\s+/).filter(name => name && name !== 'royal-button')].join(' ')} {...props} />
}
