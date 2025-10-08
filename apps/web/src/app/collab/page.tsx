'use client'

export default function CollabPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🤝 Collaboration Hub
          </h1>
          <p className="text-xl text-gray-300">
            Real-time multi-user collaboration with synced stems and version control
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Active Projects" value="8" />
          <StatCard label="Collaborators" value="12" />
          <StatCard label="Shared Tracks" value="45" />
          <StatCard label="Comments" value="127" />
        </div>

        {/* Active Collaborations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Summer Vibes EP"
              collaborators={3}
              tracks={12}
              lastUpdated="2 hours ago"
              status="Recording"
            />
            <ProjectCard
              title="Remix Contest Entry"
              collaborators={2}
              tracks={8}
              lastUpdated="5 hours ago"
              status="Mixing"
            />
            <ProjectCard
              title="Album Production"
              collaborators={5}
              tracks={24}
              lastUpdated="1 day ago"
              status="Mastering"
            />
            <ProjectCard
              title="Beat Pack Vol. 3"
              collaborators={4}
              tracks={16}
              lastUpdated="3 days ago"
              status="Review"
            />
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FeaturePanel
            icon="🔄"
            title="Real-Time Sync"
            description="All collaborators see changes instantly. No more version confusion."
            features={[
              'Automatic conflict resolution',
              'Live cursor tracking',
              'Instant stem updates',
              'Real-time chat'
            ]}
          />
          <FeaturePanel
            icon="📝"
            title="Version Control"
            description="Track every change with automatic versioning and rollback."
            features={[
              'Automatic snapshots',
              'Compare versions',
              'Restore previous states',
              'Change history log'
            ]}
          />
        </section>

        {/* Collaboration Tools */}
        <section className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Collaboration Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ToolCard
              icon="💬"
              title="In-Project Chat"
              description="Discuss changes and ideas without leaving the DAW"
            />
            <ToolCard
              icon="🎯"
              title="Timeline Comments"
              description="Add timestamped notes and feedback on specific sections"
            />
            <ToolCard
              icon="🎵"
              title="Stem Management"
              description="Organize, share, and sync individual stems with your team"
            />
          </div>
        </section>

        {/* Permissions */}
        <section className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Flexible Permissions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PermissionCard
              role="Owner"
              description="Full control including invitations and exports"
            />
            <PermissionCard
              role="Editor"
              description="Can edit, add tracks, and leave comments"
            />
            <PermissionCard
              role="Viewer"
              description="Can listen and leave feedback only"
            />
          </div>
        </section>
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  )
}

function ProjectCard({
  title,
  collaborators,
  tracks,
  lastUpdated,
  status,
}: {
  title: string
  collaborators: number
  tracks: number
  lastUpdated: string
  status: string
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary-500 transition cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <span className="px-3 py-1 bg-primary-600 text-white text-xs rounded-full">{status}</span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <span>👥</span>
          <span className="text-sm">{collaborators} collaborators</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <span>🎵</span>
          <span className="text-sm">{tracks} tracks</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span>🕒</span>
          <span className="text-sm">Updated {lastUpdated}</span>
        </div>
      </div>
      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition">
        Open Project
      </button>
    </div>
  )
}

function FeaturePanel({
  icon,
  title,
  description,
  features,
}: {
  icon: string
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-300">
            <span className="text-green-400">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ToolCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-700 rounded-lg p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  )
}

function PermissionCard({ role, description }: { role: string; description: string }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h4 className="text-lg font-semibold text-white mb-2">{role}</h4>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  )
}
