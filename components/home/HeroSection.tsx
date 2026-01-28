import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield, Truck, Award, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen lg:min-h-[90vh] bg-black overflow-hidden flex items-center">
      {/* Background Image with Premium Treatment */}
      <div className="absolute inset-0">
        <img
          src="/IMG/Arrivals/DSC02186.JPG"
          alt="Luxury Culture Hero"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 100vw"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/50" />
        {/* Luxury shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative container-custom w-full py-20 lg:py-24">
        <div className="max-w-3xl">
          {/* Luxury badge with refined styling */}
          <div className="inline-flex items-center space-x-2 mb-8 animate-fade-in-up">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-red-500"></div>
            <span className="text-xs font-bold tracking-widest text-accent uppercase">Welcome to Luxury Culture</span>
          </div>

          {/* Main Headline - Premium Typography */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] animate-fade-in-up stagger-1" style={{ letterSpacing: '-0.02em' }}>
            PREMIUM
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-500 to-amber-400">
              STREETWEAR
            </span>
            CULTURE
          </h1>

          {/* Refined Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-2xl leading-relaxed animate-fade-in-up stagger-2" style={{ letterSpacing: '0.01em' }}>
            Discover authentic premium drops, exclusive releases, and the latest streetwear culture from the heart of Nairobi.
          </p>

          {/* Brand Promise */}
          <p className="text-lg text-gray-300 mb-10 max-w-xl opacity-90 animate-fade-in-up stagger-3" style={{ lineHeight: '1.7' }}>
            100% authentic products. Same-day delivery. Trusted by over 10,000 sneaker enthusiasts across Kenya.
          </p>

          {/* CTA Buttons - Premium Styling */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up stagger-4">
            <Link href="/shop?filter=new" className="group">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-accent to-red-600 hover:shadow-2xl hover:shadow-accent/50 transform hover:scale-105 transition-all duration-300">
                <Sparkles size={20} className="mr-2" />
                EXPLORE PREMIUM DROPS
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/new-arrivals" className="group">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-gray-500 text-white hover:bg-white/10 hover:border-accent transition-all duration-300">
                NEW ARRIVALS
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Refined Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 animate-fade-in-up stagger-5">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Shield size={24} className="text-accent mt-1" />
              </div>
              <div>
                <p className="font-semibold text-white">100% Authentic</p>
                <p className="text-sm text-gray-400">Guaranteed verified products</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Truck size={24} className="text-accent mt-1" />
              </div>
              <div>
                <p className="font-semibold text-white">Same-Day Delivery</p>
                <p className="text-sm text-gray-400">Order before 2PM in Nairobi</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Award size={24} className="text-accent mt-1" />
              </div>
              <div>
                <p className="font-semibold text-white">Kenyan Owned</p>
                <p className="text-sm text-gray-400">10,000+ happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:flex flex-col items-center">
        <p className="text-white text-xs font-semibold mb-2 opacity-60">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
