import type { ReactNode, ComponentProps } from "react"
export function ExampleWrapper({ children }: { children: ReactNode }) { return <div className="ds-example-stack">{children}</div> }
export function Example({ title, description, children, className = "", containerClassName = "", ...props }: Omit<ComponentProps<"section">, "title"> & { title?: string; description?: string; containerClassName?: string }) { return <section className={`ds-example ${className} ${containerClassName}`} {...props}>{title && <h4>{title}</h4>}{description && <p>{description}</p>}{children}</section> }
