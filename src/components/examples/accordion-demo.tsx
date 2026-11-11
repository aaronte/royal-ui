import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>The desk</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            The desk ships flat in two boxes, one for the oak top and one for the
            steel frame. Assembly takes about 20 minutes with the hex key packed
            in the frame box.
          </p>
          <p>
            The top measures 160 by 75 cm and is 2.5 cm thick. Each one is oiled
            by hand, so grain and colour vary from desk to desk.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Delivery</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We deliver across Canada and the United States. Orders leave the
            workshop within 5 business days and arrive 3 to 7 days later.
          </p>
          <p>
            A tracking link is emailed when the boxes ship. Someone needs to sign
            for them on delivery.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            You can return the desk within 30 days for a full refund, as long as
            the top has not been cut or drilled.
          </p>
          <p>
            Email us to book a pickup. The refund reaches your card within 5
            business days of collection.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
