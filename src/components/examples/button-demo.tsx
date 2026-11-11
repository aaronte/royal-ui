"use client"
import { useState } from "react"
import { ArrowUpIcon, LoaderCircle } from "lucide-react"
import { Button } from "../ui/button"
export default function ButtonDemo() {
 const [saved, setSaved] = useState(false)
 return <div className="ds-example-stack"><section className="ds-example"><h4>Emphasis</h4><div className="flex flex-wrap gap-3"><Button>Continue</Button><Button variant="outline">Cancel</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="link">Learn more</Button><Button variant="destructive">Delete</Button></div></section><section className="ds-example"><h4>Sizes</h4><div className="flex flex-wrap items-center gap-3"><Button size="xs">Extra small</Button><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Upload"><ArrowUpIcon /></Button></div></section><section className="ds-example"><h4>States</h4><div className="flex flex-wrap gap-3"><Button disabled>Disabled</Button><Button disabled><LoaderCircle className="animate-spin" />Loading</Button><Button variant="outline" aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? "✓ Saved" : "+ Save item"}</Button></div></section></div>
}
