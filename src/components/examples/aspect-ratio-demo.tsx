import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
      <Image unoptimized
        src="/design-system/photos/landscape.jpg"
        alt="Hills around a lake at dawn"
        fill
        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </AspectRatio>
  )
}
