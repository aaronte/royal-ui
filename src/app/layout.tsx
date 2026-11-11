import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Google_Sans_Code, Google_Sans_Flex, Host_Grotesk, IBM_Plex_Mono, Instrument_Sans, Instrument_Serif, Newsreader, Source_Serif_4 } from 'next/font/google'
import './globals.css'

// Royal's font tokens read these variables at :root, so they go on <html>.
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' })
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument-sans', display: 'swap' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-ibm-plex-mono', display: 'swap' })
// The specimen's font picker also offers these.
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-instrument-serif', display: 'swap' })
const hostGrotesk = Host_Grotesk({ subsets: ['latin'], variable: '--font-host-grotesk', display: 'swap' })
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', display: 'swap' })
const googleSans = Google_Sans_Flex({ subsets: ['latin'], variable: '--font-google-sans', display: 'swap', adjustFontFallback: false })
const googleSansCode = Google_Sans_Code({ subsets: ['latin'], variable: '--font-google-sans-code', display: 'swap', adjustFontFallback: false })

const fonts = [sourceSerif, instrumentSans, ibmPlexMono, instrumentSerif, hostGrotesk, newsreader, googleSans, googleSansCode].map(font => font.variable).join(' ')

export const metadata: Metadata = {
  title: 'Royal',
  description: 'A design system built on shadcn/ui and Radix.',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fonts}>
      <body>{children}</body>
    </html>
  )
}
