import type { Metadata } from 'next'
import '../styles/globals.css'
import Navigation from '../components/Navigation'

export const metadata: Metadata = {
  title: 'JACAMENO - AI Music Production & Streaming',
  description: 'Next-generation AI music production, collaboration, and streaming platform',
  keywords: ['music production', 'daw', 'ai music', 'streaming', 'collaboration'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
