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
            <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
              {children}
              <LanguageSwitcher />
              <ThemeToggle />
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}