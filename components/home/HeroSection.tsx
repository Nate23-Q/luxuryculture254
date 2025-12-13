import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-secondary overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=1920&h=1080&fit=crop"
          alt="Luxury Culture Hero"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-custom h-full flex items-center">
        <div className="max-w-2xl text-primary">
          {/* Logo Badge */}
          <div className="inline-flex items-center bg-accent text-primary px-4 py-2 rounded-lg font-bold text-lg mb-6">
            LUXURY CULTURE
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            PREMIUM
            <br />
            <span className="text-accent">SNEAKERS</span>
            <br />
            & STREETWEAR
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-lg">
            Your ultimate destination for the latest drops, exclusive releases, 
            and timeless classics. Step into the culture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop?filter=new">
              <Button size="lg" className="group">
                SHOP NEW DROPS
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/shop?sale=true">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-secondary">
                SHOP SALE
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Free Shipping Over KSh 5,000</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Authenticity Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
