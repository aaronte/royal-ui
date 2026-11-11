"use client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
export default function FormDemo() {
 const form = useForm({ defaultValues: { name: "", email: "" } })
 return <Form {...form}><form className="grid max-w-md gap-6" noValidate onSubmit={form.handleSubmit(() => toast("Sample form submitted"))}>
  <FormField control={form.control} name="name" rules={{ required: "Enter your name.", minLength: { value: 2, message: "Use at least two characters." } }} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" autoComplete="name" {...field} /></FormControl><FormDescription>This specimen validates locally.</FormDescription><FormMessage /></FormItem>} />
  <FormField control={form.control} name="email" rules={{ required: "Enter an email address.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a complete email address." } }} render={({ field }) => <FormItem><FormLabel>Email address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" autoComplete="email" {...field} /></FormControl><FormDescription>Used only in this local specimen.</FormDescription><FormMessage /></FormItem>} />
  <div className="flex flex-wrap gap-3"><Button type="submit">Submit</Button><Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button></div>
 </form></Form>
}
