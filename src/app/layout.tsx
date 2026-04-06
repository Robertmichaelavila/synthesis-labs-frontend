import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Geist } from 'next/font/google'

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: 'Aplicação Next.js',
  description: 'Uma aplicação Next.js com TypeScript e Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} font-sans min-h-screen bg-gray-100 text-gray-900`}>
        <main className="flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}