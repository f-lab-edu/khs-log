import {Nunito} from 'next/font/google'

import type {Metadata} from 'next'

import './globals.css'

// eslint-disable-next-line import/order
import SessionProvider from '@/components/SessionProvider'

const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'khs-log',
  description: 'khs-log',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
