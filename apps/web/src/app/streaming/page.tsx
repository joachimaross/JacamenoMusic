'use client'

import { useState } from 'react'

export default function StreamingPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">JACAMENO Streaming</h1>
          <div className="flex gap-4">
            <input 
              type="search" 
              placeholder="Search tracks, artists, playlists..."
              className="bg-gray-700 px-4 py-2 rounded-lg w-96"
            />
            <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded">
              Upload
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <nav className="space-y-2">
            <NavItem icon="🏠">Home</NavItem>
            <NavItem icon="🔥">Trending</NavItem>
            <NavItem icon="🎵">Your Library</NavItem>
            <NavItem icon="📻">Radio</NavItem>
            <NavItem icon="❤️">Liked Songs</NavItem>
            <div className="border-t border-gray-700 my-4"></div>
            <NavItem icon="➕">Create Playlist</NavItem>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* AI-Curated Playlists */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🤖 AI-Curated For You</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <PlaylistCard title="Your Vibes" tracks={45} />
              <PlaylistCard title="Focus Flow" tracks={32} />
              <PlaylistCard title="Late Night" tracks={28} />
              <PlaylistCard title="Workout Mix" tracks={50} />
            </div>
          </section>

          {/* Trending Now */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
            <div className="space-y-2">
              <TrackItem 
                position={1}
                title="Studio Session"
                artist="JACAMENO Artist"
                album="Latest Release"
                duration="3:45"
                plays="1.2M"
              />
              <TrackItem 
                position={2}
                title="AI Beats Vol. 1"
                artist="Producer X"
                album="EP 2024"
                duration="4:12"
                plays="950K"
              />
              <TrackItem 
                position={3}
                title="Collab Magic"
                artist="Various Artists"
                album="Community Album"
                duration="3:28"
                plays="850K"
              />
            </div>
          </section>

          {/* New Releases */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🆕 New Releases</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <AlbumCard title="Fresh Drops" artist="Artist A" />
              <AlbumCard title="Beat Tape" artist="Artist B" />
              <AlbumCard title="EP Release" artist="Artist C" />
              <AlbumCard title="Single" artist="Artist D" />
              <AlbumCard title="Album" artist="Artist E" />
            </div>
          </section>

          {/* Analytics Dashboard */}
          <section className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">📊 Your Performance</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard label="Total Streams" value="125.4K" />
              <StatCard label="Followers" value="3,248" />
              <StatCard label="Tracks" value="42" />
              <StatCard label="Revenue" value="$1,234" />
            </div>
          </section>
        </div>
      </div>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded"></div>
          <div className="flex-1">
            <p className="font-semibold">
              {currentTrack?.title || 'No track playing'}
            </p>
            <p className="text-sm text-gray-400">
              {currentTrack?.artist || 'Select a track'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-2xl">⏮️</button>
            <button className="text-3xl">▶️</button>
            <button className="text-2xl">⏭️</button>
          </div>
          <input type="range" className="w-64" />
          <span className="text-sm text-gray-400">0:00 / 0:00</span>
        </div>
      </div>
    </div>
  )
}

interface Track {
  title: string
  artist: string
  duration: string
}

function NavItem({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  )
}

function PlaylistCard({ title, tracks }: { title: string; tracks: number }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition">
      <div className="w-full aspect-square bg-gradient-to-br from-primary-500 to-secondary-500 rounded mb-3"></div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{tracks} tracks</p>
    </div>
  )
}

function TrackItem({ 
  position, 
  title, 
  artist, 
  album, 
  duration, 
  plays 
}: { 
  position: number
  title: string
  artist: string
  album: string
  duration: string
  plays: string
}) {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition">
      <span className="text-gray-400 w-8 text-center">{position}</span>
      <div className="w-12 h-12 bg-gray-700 rounded"></div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>
      <span className="text-sm text-gray-400">{album}</span>
      <span className="text-sm text-gray-400">{plays} plays</span>
      <span className="text-sm text-gray-400">{duration}</span>
      <button className="text-xl">❤️</button>
    </div>
  )
}

function AlbumCard({ title, artist }: { title: string; artist: string }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition">
      <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded mb-3"></div>
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-gray-400">{artist}</p>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
