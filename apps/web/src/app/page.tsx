import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            JACAMENO
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Next-Generation AI Music Production & Streaming Platform
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/studio" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Launch Studio
            </Link>
            <Link 
              href="/streaming" 
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Browse Music
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="🎹"
            title="Virtual Studio Mode"
            description="AI-powered producer and engineer that guides your entire creative session"
          />
          <FeatureCard
            icon="🎚️"
            title="Professional Mixing"
            description="Multi-track mixing with AI EQ, compression, and genre-specific presets"
          />
          <FeatureCard
            icon="✍️"
            title="Songwriting & Lyrics"
            description="AI writes lyrics, melodies, and rhyme schemes tailored to your style"
          />
          <FeatureCard
            icon="🎤"
            title="Vocal Coaching"
            description="Real-time pitch, timing, and breath analysis with personalized exercises"
          />
          <FeatureCard
            icon="🎬"
            title="Video & Photo Editing"
            description="Create album art and music videos with AI-powered tools"
          />
          <FeatureCard
            icon="🤝"
            title="Smart Collaboration"
            description="Real-time multi-user collab with synced stems and version control"
          />
          <FeatureCard
            icon="📊"
            title="Performance Analytics"
            description="Track streams, engagement, and get AI-powered release strategies"
          />
          <FeatureCard
            icon="📱"
            title="Offline Creation"
            description="Full DAW workflow offline with automatic sync when back online"
          />
          <FeatureCard
            icon="🎵"
            title="Streaming Service"
            description="Native music streaming with direct royalty payouts to artists"
          />
        </div>

        {/* VST Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            🎛️ VST Plugin Support
          </h2>
          <ul className="text-gray-300 space-y-2">
            <li>✅ Load VST2/VST3 plugins directly in JACAMENO</li>
            <li>✅ AI-assisted plugin management and parameter tweaking</li>
            <li>✅ Save plugin presets per project</li>
            <li>✅ Export stems with applied effects or dry</li>
            <li>✅ Integrated marketplace for discovering new VSTs</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Powered by Advanced Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
            <TechBadge>React Native + Expo</TechBadge>
            <TechBadge>Next.js</TechBadge>
            <TechBadge>Node.js + Express</TechBadge>
            <TechBadge>Python + FastAPI</TechBadge>
            <TechBadge>Socket.io</TechBadge>
            <TechBadge>GraphQL</TechBadge>
            <TechBadge>PostgreSQL</TechBadge>
            <TechBadge>AWS S3</TechBadge>
          </div>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-primary-500 transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-700 px-4 py-2 rounded-full text-sm">
      {children}
    </div>
  )
}
