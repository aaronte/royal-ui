export default function TypographyDemo() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Setting a page of text
      </h1>
      <p className="text-xl leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
        Most of what makes a page easy to read comes from three numbers: the
        size of the type, the length of the line and the space between lines.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Start with the line
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Pick the body size first, then set the column so each line holds{" "}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4"
        >
          45 to 75 characters
        </a>
        , counting spaces.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        Robert Bringhurst wrote that &quot;typography exists to honor
        content.&quot;
      </blockquote>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Line height
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Long lines need more space between them, because the eye travels
        further back to the left edge. These are reasonable starting points:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>Body text at 16 to 18px: 1.5 to 1.6</li>
        <li>Captions and labels: 1.3 to 1.4</li>
        <li>Headings at 32px and up: 1.1 to 1.2</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Check the result with real paragraphs. A heading that wraps onto two
        lines shows a line height problem that a single line hides.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Headings
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        A serif heading above sans body text separates the two levels without
        a large difference in size. Tighten the tracking on large headings,
        since letter spacing that suits 16px looks loose at 40px.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Keep the scale short. Four heading sizes cover most pages, and each
        extra size makes the levels harder to tell apart.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        A starting scale
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        A scale like this one suits an article or a page of documentation.
      </p>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Level
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Size
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Title
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                42px
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Section
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                32px
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Subsection
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                24px
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Body text sits at 16px under all three, with a line height of 1.5.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Test the page at 320px wide before calling it done. Large headings are
        the first thing to break on a phone.
      </p>
    </div>
  )
}
