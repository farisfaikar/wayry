import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/nav/navbar'

export const metadata: Metadata = {
  title: 'Why Are You Repeating Yourself?',
  description: 'A questionable app to track repeating sentences!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="mx-auto max-w-2xl p-5 pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
