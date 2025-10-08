export default function PluginsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎛️ VST Plugin Marketplace
          </h1>
          <p className="text-xl text-gray-300">
            Discover, install, and manage VST2/VST3 plugins for your productions
          </p>
        </div>

        {/* Featured Plugins */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Featured Plugins</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PluginCard
              name="AI Reverb Pro"
              category="Effect"
              price="$49.99"
              rating={4.8}
              description="Intelligent reverb with AI-powered room modeling"
            />
            <PluginCard
              name="SmartComp"
              category="Dynamics"
              price="$39.99"
              rating={4.6}
              description="AI-assisted compression that adapts to your mix"
            />
            <PluginCard
              name="Synth Master X"
              category="Instrument"
              price="$79.99"
              rating={4.9}
              description="Next-gen synthesizer with AI-generated presets"
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryCard icon="🎹" name="Instruments" count={145} />
            <CategoryCard icon="🎚️" name="Effects" count={289} />
            <CategoryCard icon="🎛️" name="Dynamics" count={87} />
            <CategoryCard icon="🎧" name="Mastering" count={56} />
          </div>
        </section>

        {/* My Plugins */}
        <section className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">My Installed Plugins</h2>
          <div className="space-y-4">
            <InstalledPluginRow name="Classic Reverb" type="VST3" status="Active" />
            <InstalledPluginRow name="Vintage Compressor" type="VST2" status="Active" />
            <InstalledPluginRow name="EQ Suite Pro" type="VST3" status="Active" />
          </div>
          <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            + Install New Plugin
          </button>
        </section>

        {/* Integration Info */}
        <section className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Seamless Integration
          </h2>
          <ul className="text-gray-300 space-y-3">
            <li>✅ One-click installation directly from marketplace</li>
            <li>✅ Automatic plugin scanning and organization</li>
            <li>✅ AI suggests plugins based on your project genre</li>
            <li>✅ Save and share plugin chains across projects</li>
            <li>✅ Cloud-based preset library</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

function PluginCard({
  name,
  category,
  price,
  rating,
  description,
}: {
  name: string
  category: string
  price: string
  rating: number
  description: string
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary-500 transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
          <span className="text-sm text-gray-400">{category}</span>
        </div>
        <span className="text-lg font-bold text-primary-400">{price}</span>
      </div>
      <p className="text-gray-300 mb-4 text-sm">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white font-semibold">{rating}</span>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition text-sm">
          Install
        </button>
      </div>
    </div>
  )
}

function CategoryCard({ icon, name, count }: { icon: string; name: string; count: number }) {
  return (
    <button className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg border border-gray-700 hover:border-primary-500 transition text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
      <p className="text-sm text-gray-400">{count} plugins</p>
    </button>
  )
}

function InstalledPluginRow({ name, type, status }: { name: string; type: string; status: string }) {
  return (
    <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg"></div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <span className="text-sm text-gray-400">{type}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-green-400 text-sm">{status}</span>
        <button className="text-gray-400 hover:text-white transition">⚙️</button>
      </div>
    </div>
  )
}
