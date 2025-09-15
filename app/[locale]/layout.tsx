import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'
import { ThemeProvider } from '@/contexts/ThemeContext'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter, Playfair_Display, Source_Code_Pro } from 'next/font/google'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceCode = Source_Code_Pro({ 
  subsets: ['latin'],
  variable: '--font-source-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Periodic Table',
  description: 'Interactive Periodic Table of Elements',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${sourceCode.variable}`}>
      <body className={`${inter.className} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
              <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 p-4 sm:p-6">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}