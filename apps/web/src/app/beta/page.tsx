import Link from 'next/link'

export default function BetaProgram() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🚀 BETA PROGRAM
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Join the JACAMENO Beta
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Be among the first to experience next-generation AI-powered music production. 
            Shape the future of JACAMENO with early access to cutting-edge features.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <BenefitCard
            icon="⚡"
            title="Early Access"
            description="Get first access to new AI features, VST integrations, and collaboration tools before public release."
          />
          <BenefitCard
            icon="💎"
            title="Exclusive Features"
            description="Access beta-only features including advanced AI mixing, experimental effects, and premium VST plugins."
          />
          <BenefitCard
            icon="💰"
            title="Lifetime Discount"
            description="Lock in a 50% lifetime discount on Pro subscription as a thank you for your early support."
          />
          <BenefitCard
            icon="🎤"
            title="Direct Influence"
            description="Your feedback directly shapes product development. Regular surveys and 1-on-1 interviews with the team."
          />
          <BenefitCard
            icon="🌟"
            title="Beta Badge"
            description="Stand out with an exclusive Beta Tester badge on your profile and priority support."
          />
          <BenefitCard
            icon="🤝"
            title="Community Access"
            description="Join private Discord/Slack channels with other beta testers and the development team."
          />
        </div>

        {/* What You'll Test */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 md:p-12 mb-16 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What You'll Be Testing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureItem
              title="AI Studio Assistant"
              description="Virtual producer that guides your entire creative session with intelligent suggestions."
              status="Alpha"
            />
            <FeatureItem
              title="Neural Mixing Engine"
              description="AI-powered mixing that learns your style and applies professional-grade effects."
              status="Beta"
            />
            <FeatureItem
              title="Real-time Collaboration V2"
              description="Enhanced multi-user sessions with voice chat and shared DAW control."
              status="Coming Soon"
            />
            <FeatureItem
              title="Spotify Integration"
              description="Direct streaming integration with automatic playlist creation and analytics."
              status="Beta"
            />
            <FeatureItem
              title="VST Plugin Marketplace"
              description="Browse, purchase, and instantly load thousands of VST plugins in your projects."
              status="Beta"
            />
            <FeatureItem
              title="Vocal Coaching AI"
              description="Real-time pitch and timing feedback with personalized improvement exercises."
              status="Alpha"
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Beta Tester Requirements
          </h2>
          <div className="max-w-3xl mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Active Music Production:</strong> Currently producing music or working on audio projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Commitment:</strong> Use JACAMENO at least 2-3 times per week during beta period</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Feedback:</strong> Provide detailed bug reports and feature feedback via surveys/Discord</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Technical Setup:</strong> Modern computer with decent specs (8GB RAM+, stable internet)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>NDA Agreement:</strong> Sign confidentiality agreement for unreleased features</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Beta Program Timeline
          </h2>
          <div className="max-w-4xl mx-auto">
            <TimelineItem
              phase="Phase 1: Closed Beta"
              date="January - March 2024"
              description="Limited to 100 invited testers. Focus on core features and stability."
              active={true}
            />
            <TimelineItem
              phase="Phase 2: Open Beta"
              date="April - June 2024"
              description="Expand to 1,000+ testers. Roll out advanced AI features and integrations."
              active={false}
            />
            <TimelineItem
              phase="Phase 3: Public Launch"
              date="July 2024"
              description="Full public release with all features polished and production-ready."
              active={false}
            />
          </div>
        </div>

        {/* Application CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Shape the Future?
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Applications are reviewed on a rolling basis. Limited spots available for Phase 1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/beta/apply"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition inline-block"
            >
              🎯 Apply for Beta Access
            </Link>
            <Link
              href="/"
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm text-white hover:bg-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition inline-block border border-gray-600"
            >
              Learn More About JACAMENO
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FAQItem
              question="Is the beta program free?"
              answer="Yes! Beta access is completely free. You'll also receive a 50% lifetime discount on our Pro subscription when we launch."
            />
            <FAQItem
              question="What happens to my projects after beta?"
              answer="All your projects, stems, and settings will carry over to the full release. You'll keep everything you create during beta."
            />
            <FAQItem
              question="How much time commitment is required?"
              answer="We recommend using JACAMENO 2-3 times per week and providing feedback once a week. It should fit naturally into your music production workflow."
            />
            <FAQItem
              question="What if I find a critical bug?"
              answer="Report it immediately via Discord or email (beta@jacameno.com). Critical bugs get priority attention, usually fixed within 24-48 hours."
            />
            <FAQItem
              question="Can I share screenshots or videos?"
              answer="You'll need to sign an NDA, so public sharing is limited. However, you can share within our private beta community channels."
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-primary-500 transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function FeatureItem({ title, description, status }: { title: string; description: string; status: string }) {
  const statusColors = {
    'Alpha': 'bg-yellow-600',
    'Beta': 'bg-blue-600',
    'Coming Soon': 'bg-purple-600'
  }
  
  return (
    <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className={`${statusColors[status as keyof typeof statusColors]} text-white text-xs px-2 py-1 rounded-full`}>
          {status}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function TimelineItem({ phase, date, description, active }: { phase: string; date: string; description: string; active: boolean }) {
  return (
    <div className="flex gap-4 mb-8 last:mb-0">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${active ? 'bg-primary-500' : 'bg-gray-600'} border-4 ${active ? 'border-primary-300' : 'border-gray-700'}`}></div>
        <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
      </div>
      <div className="pb-8">
        <h3 className="text-xl font-semibold text-white mb-1">{phase}</h3>
        <p className="text-primary-400 text-sm mb-2">{date}</p>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  )
}
