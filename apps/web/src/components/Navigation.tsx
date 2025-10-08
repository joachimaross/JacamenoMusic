'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-primary-400 transition">
            JACAMENO
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/studio"
              className={`px-3 py-2 rounded transition ${
                isActive('/studio')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Studio Mode
            </Link>
            <Link
              href="/streaming"
              className={`px-3 py-2 rounded transition ${
                isActive('/streaming')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Streaming
            </Link>
            <Link
              href="/plugins"
              className={`px-3 py-2 rounded transition ${
                isActive('/plugins')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Plugins
            </Link>
            <Link
              href="/collab"
              className={`px-3 py-2 rounded transition ${
                isActive('/collab')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Collaboration
            </Link>
            <Link
              href="/login"
              className={`px-3 py-2 rounded transition ${
                isActive('/login')
                  ? 'bg-secondary-600 text-white'
                  : 'bg-secondary-600 text-white hover:bg-secondary-700'
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
