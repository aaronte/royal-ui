"use client"
import { useState } from "react"
import { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton } from "../ui/message-scroller"
import { Button } from "../ui/button"
export default function ScrollerExample() { const [count, setCount] = useState(12); return <div className="w-full"><MessageScrollerProvider><div style={{ height: 320 }}><MessageScroller><MessageScrollerViewport><MessageScrollerContent>{Array.from({ length: count }, (_, i) => <MessageScrollerItem key={i} scrollAnchor={i === count - 1}><p className="rounded-md bg-muted p-4">Sample message {i + 1}. A little space for a conversation.</p></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton /></MessageScroller></div><Button className="mt-4" onClick={() => setCount(count + 1)}>Add a message</Button></MessageScrollerProvider></div> }
