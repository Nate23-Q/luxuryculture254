import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'Luxury Culture - Premium Sneakers & Streetwear',
  description: 'Your ultimate destination for premium sneakers and streetwear. Shop the latest drops, bestsellers, and exclusive collections.',
  keywords: 'sneakers, streetwear, shoes, apparel, fashion, Kicks Kenya, premium footwear',
  authors: [{ name: 'Luxury Culture Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Luxury Culture - Premium Sneakers & Streetwear',
    description: 'Your ultimate destination for premium sneakers and streetwear.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Luxury Culture',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Culture - Premium Sneakers & Streetwear',
    description: 'Your ultimate destination for premium sneakers and streetwear.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </Providers>
      </body>
    </html>
  )
}
