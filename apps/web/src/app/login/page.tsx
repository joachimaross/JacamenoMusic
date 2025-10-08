'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">JACAMENO</h1>
            <p className="text-gray-300">AI Music Production & Streaming</p>
          </div>

          {/* Login/Register Form */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded transition ${
                  isLogin
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded transition ${
                  !isLogin
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-300">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary-400 hover:text-primary-300">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
                  <span>🔵</span>
                  <span>Google</span>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
                  <span>⚫</span>
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">Join thousands of creators using JACAMENO</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">10K+</p>
                <p className="text-xs text-gray-400">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-xs text-gray-400">Tracks Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">5M+</p>
                <p className="text-xs text-gray-400">Streams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
