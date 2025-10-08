import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="text-9xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              404
            </span>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Looks like this track got lost in the mix. Let&apos;s get you back on beat!
          </p>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              🏠 Back to Home
            </Link>
            <Link
              href="/studio"
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              🎹 Launch Studio
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Popular Pages</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink href="/" icon="🏠" label="Home" />
              <QuickLink href="/studio" icon="🎹" label="Studio" />
              <QuickLink href="/streaming" icon="🎵" label="Streaming" />
              <QuickLink href="/plugins" icon="🎛️" label="Plugins" />
              <QuickLink href="/collab" icon="🤝" label="Collaboration" />
              <QuickLink href="/login" icon="🔐" label="Login" />
            </div>
          </div>

          {/* Fun Message */}
          <div className="mt-12 text-gray-400">
            <p className="text-sm">
              💡 Tip: While you&apos;re here, why not explore our{' '}
              <Link href="/plugins" className="text-primary-400 hover:text-primary-300">
                VST plugin marketplace
              </Link>
              ?
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

function QuickLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition flex flex-col items-center gap-2"
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-sm text-gray-300">{label}</span>
    </Link>
  )
}
