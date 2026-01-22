'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, TrendingUp } from 'lucide-react'

export function StrategicCTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-accent via-red-600 to-accent relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Copy */}
          <div className="flex-1 max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={24} />
              <p className="font-bold uppercase tracking-widest text-sm">LIMITED TIME</p>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              Don't Miss Out on
              <br />
              Exclusive Drops
            </h2>

            <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
              New releases arrive weekly. Subscribe to our newsletter and be the first to know about upcoming collections, special offers, and exclusive previews.
            </p>

            {/* Newsletter Form */}
            <form className="flex flex-col sm:flex-row gap-3 mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg bg-white text-secondary placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <Button className="bg-white text-accent hover:bg-gray-100">
                NOTIFY ME
              </Button>
            </form>

            <p className="text-sm text-white/70">
              Join 10,000+ sneaker enthusiasts. No spam, just fire drops.
            </p>
          </div>

          {/* Right: Feature List */}
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="font-bold text-xl text-white mb-6">Why Join?</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white text-accent rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Early Access</p>
                  <p className="text-white/80 text-sm">Be first to grab limited releases</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white text-accent rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Exclusive Discounts</p>
                  <p className="text-white/80 text-sm">15% off your first order</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white text-accent rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Community Access</p>
                  <p className="text-white/80 text-sm">Connect with other enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
