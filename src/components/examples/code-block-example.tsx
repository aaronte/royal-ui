"use client"
import { CodeBlock, CodeBlockHeader, CodeBlockTitle, CodeBlockContent, CodeBlockActions, CodeBlockCopyButton } from "../ui/code-block"
const code = `.editorial-system {
  --color-accent: #2555e8;
  --radius-control: 6px;
}`
export default function CodeExample() { return <CodeBlock><CodeBlockHeader><CodeBlockTitle>tokens.css</CodeBlockTitle><CodeBlockActions><CodeBlockCopyButton value={code} /></CodeBlockActions></CodeBlockHeader><CodeBlockContent><pre><code>{code}</code></pre></CodeBlockContent></CodeBlock> }
