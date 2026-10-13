import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://seafixengineering.com'),
  title: 'SeaFix Engineering | Marine Engineering & Ship Repair, Dubai',
  description: 'SeaFix Engineering delivers engine, electrical, navigation, shaft line, coating and welding repairs for vessels in ports, anchorages and shipyards worldwide. 24/7 support from Dubai.',
  keywords: ['marine engineering', 'ship repair', 'vessel maintenance', 'engine repair', 'fly electrician', 'shaft alignment', 'ballast tank coating', 'welding', 'Dubai'],
  openGraph: {
    type: 'website',
    siteName: 'SeaFix Engineering',
    url: '/',
    title: 'SeaFix Engineering | Marine Engineering & Ship Repair',
    description: 'Engine, electrical, navigation, shaft line, coating and welding repairs for vessels worldwide. 24/7 support from Dubai.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#0A0E1A]">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
