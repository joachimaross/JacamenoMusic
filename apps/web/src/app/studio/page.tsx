'use client'

import { useState } from 'react'

export default function StudioPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [aiMessages, setAiMessages] = useState<string[]>([
    '🎙️ Welcome to Virtual Studio Mode! I&apos;m your AI producer. Ready to create?',
  ])
  const [_vstPlugins, _setVstPlugins] = useState<VstPlugin[]>([])

  const addTrack = () => {
    const newTrack: Track = {
      id: Date.now().toString(),
      name: `Track ${tracks.length + 1}`,
      volume: 0,
      muted: false,
      solo: false,
      vstChain: [],
    }
    setTracks([...tracks, newTrack])
    setAiMessages([...aiMessages, `✅ Added ${newTrack.name}. Let's lay down something great!`])
  }

  const loadVstPlugin = (_trackId: string) => {
    setAiMessages([...aiMessages, '🎛️ VST Plugin loading... I recommend trying some compression on this track.'])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">JACAMENO Studio</h1>
            <p className="text-sm text-gray-400">Virtual Studio Mode - AI Producer Active</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded transition">
              Save Project
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition">
              Export Mix
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - AI Producer */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🤖</span>
            AI Producer
          </h2>
          
          <div className="space-y-3 mb-6">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className="bg-gray-700 p-3 rounded-lg text-sm">
                {msg}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-400 uppercase">Quick Actions</h3>
            <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm transition">
              📝 Generate Lyrics
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition">
              🎵 Suggest Melody
            </button>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-sm transition">
              🎚️ Auto-Mix
            </button>
            <button className="w-full bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-sm transition">
              ✨ Master Track
            </button>
          </div>

          {/* Voice Commands */}
          <div className="mt-6">
            <h3 className="font-semibold text-sm text-gray-400 uppercase mb-2">Voice Commands</h3>
            <div className="bg-gray-700 p-3 rounded-lg text-xs space-y-1">
              <p>💬 &quot;Punch me in at bar 16&quot;</p>
              <p>💬 &quot;Export demo mix&quot;</p>
              <p>💬 &quot;Add reverb to vocals&quot;</p>
              <p>💬 &quot;Suggest plugin chain&quot;</p>
            </div>
          </div>
        </div>

        {/* Main Content - DAW Interface */}
        <div className="flex-1 flex flex-col">
          {/* Transport Controls */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 p-3 rounded transition">
                ⏮️
              </button>
              <button className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition">
                ▶️
              </button>
              <button className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition">
                ⏺️
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 p-3 rounded transition">
                ⏸️
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 p-3 rounded transition">
                ⏹️
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 p-3 rounded transition">
                ⏭️
              </button>
              
              <div className="ml-8 text-2xl font-mono">
                00:00:00
              </div>
              
              <div className="ml-auto">
                <span className="text-sm text-gray-400">BPM: </span>
                <input 
                  type="number" 
                  defaultValue="120" 
                  className="bg-gray-700 px-2 py-1 rounded w-16 text-center"
                />
              </div>
            </div>
          </div>

          {/* Tracks Area */}
          <div className="flex-1 bg-gray-900 p-4 overflow-auto">
            <div className="mb-4">
              <button 
                onClick={addTrack}
                className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded transition"
              >
                + Add Track
              </button>
            </div>

            <div className="space-y-2">
              {tracks.map((track) => (
                <TrackRow 
                  key={track.id} 
                  track={track} 
                  onLoadVst={() => loadVstPlugin(track.id)}
                />
              ))}
            </div>

            {tracks.length === 0 && (
              <div className="text-center text-gray-500 py-20">
                <p className="text-xl mb-2">No tracks yet</p>
                <p>Click &quot;Add Track&quot; to start creating</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Mixing & VST */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">🎛️ Mixing & VST</h2>
          
          {/* Master Channel */}
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-3">Master</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Volume</label>
                <input type="range" min="-60" max="6" defaultValue="0" className="w-full" />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">
                  EQ
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">
                  Limiter
                </button>
              </div>
            </div>
          </div>

          {/* VST Plugins */}
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-3">VST Plugins</h3>
            <div className="space-y-2">
              <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm transition">
                + Load VST2/VST3
              </button>
              <div className="text-xs text-gray-400 space-y-1 mt-3">
                <p>✅ AI suggests plugin chains</p>
                <p>✅ Save presets per project</p>
                <p>✅ Export with/without effects</p>
              </div>
            </div>
          </div>

          {/* Genre Presets */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Genre Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              <PresetButton>Trap</PresetButton>
              <PresetButton>R&B</PresetButton>
              <PresetButton>Drill</PresetButton>
              <PresetButton>EDM</PresetButton>
              <PresetButton>Pop</PresetButton>
              <PresetButton>Rock</PresetButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Track {
  id: string
  name: string
  volume: number
  muted: boolean
  solo: boolean
  vstChain: string[]
}

interface VstPlugin {
  id: string
  name: string
  type: 'VST2' | 'VST3'
}

function TrackRow({ track, onLoadVst }: { track: Track; onLoadVst: () => void }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input 
            type="text" 
            value={track.name}
            className="bg-transparent border-none outline-none font-semibold"
            readOnly
          />
        </div>
        <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs">
          M
        </button>
        <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs">
          S
        </button>
        <button 
          onClick={onLoadVst}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
        >
          VST
        </button>
        <input 
          type="range" 
          min="-60" 
          max="6" 
          value={track.volume}
          className="w-32"
        />
        <span className="text-xs text-gray-400 w-12 text-right">{track.volume} dB</span>
      </div>
    </div>
  )
}

function PresetButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-gray-600 hover:bg-gray-500 px-3 py-2 rounded text-sm transition">
      {children}
    </button>
  )
}
