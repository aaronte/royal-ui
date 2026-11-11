"use client"
import { useState } from "react"
import { DirectionProvider } from "../ui/direction"
import { Button } from "../ui/button"
export default function DirectionExample() { const [dir, setDir] = useState<"rtl" | "ltr">("rtl"); return <DirectionProvider dir={dir}><div dir={dir} className="w-full space-y-4"><p>{dir === "rtl" ? "مرحبا — تجربة اتجاه الكتابة" : "A reading direction preview"}</p><Button onClick={() => setDir(dir === "rtl" ? "ltr" : "rtl")}>Switch to {dir === "rtl" ? "left to right" : "right to left"}</Button></div></DirectionProvider> }
