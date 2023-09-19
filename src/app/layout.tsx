import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.scss'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

export default function RootLayout({
  children,
  authModal
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang='it'>
      <body className={cn(inter.className, "min-h-screen flex flex-col")}>
        <Providers>
          <Navbar />
          {authModal}
          <div className='container pt-8 flex-1'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
