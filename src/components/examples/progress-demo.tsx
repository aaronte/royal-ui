"use client"
import { useState } from "react"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
export default function ProgressDemo() {
 const [progress, setProgress] = useState(33)
 return <div className="ds-example-stack">
  <section className="ds-example"><h4>Progress · {progress}%</h4><Progress value={progress} aria-label="Sample progress" /><div><Button variant="outline" size="sm" onClick={() => setProgress(progress >= 100 ? 0 : Math.min(100, progress + 33))}>Advance progress</Button></div></section>
  <section className="ds-example"><h4>Custom maximum · 3 of 10</h4><Progress value={3} max={10} aria-label="Three of ten steps complete" /></section>
  <section className="ds-example"><h4>Indeterminate</h4><Progress value={null} aria-label="Loading sample content" /></section>
 </div>
}
