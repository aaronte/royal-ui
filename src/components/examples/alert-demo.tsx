import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Billing address saved</AlertTitle>
        <AlertDescription>
          The new address will appear on your next invoice.
        </AlertDescription>
      </Alert>
      <Alert>
        <PopcornIcon />
        <AlertTitle>
          Your trial ends in 3 days.
        </AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Payment declined</AlertTitle>
        <AlertDescription>
          <p>Your bank declined the charge. Check these and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>The card number and expiry date</li>
            <li>The spending limit on the card</li>
            <li>The billing postcode</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
