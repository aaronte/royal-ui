"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Sample changes saved", {
          description: "A confirmation using the shared type and colour tokens.",
          action: {
            label: "Undo",
            onClick: () => toast("Sample action undone"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
