'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Heart, Users, Zap } from 'lucide-react'

export function BrandStory() {
  return (
    <section className="section-padding bg-gradient-to-br from-white via-primary to-secondary-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Story Text */}
          <div className="max-w-xl">
            <div className="mb-6">
              <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">
                ✨ OUR STORY
              </p>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                Luxury Isn't Just About
                <span className="text-accent"> Premium Products</span>
              </h2>
            </div>

            <p className="text-lg text-secondary-700 mb-6 leading-relaxed">
              At Luxury Culture, we believe in bringing authentic premium streetwear and sneakers to the people who appreciate quality, craftsmanship, and culture. Founded with a passion for connecting enthusiasts with the finest collections, we've curated a marketplace where every item tells a story.
            </p>

            <p className="text-lg text-secondary-700 mb-8 leading-relaxed">
              We're more than just a store—we're a movement. We celebrate the intersection of fashion, art, and community. Every release, every collaboration, every piece in our collection has been handpicked to ensure authenticity and excellence.
            </p>

            {/* Core Values */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Heart className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-secondary mb-1">Passion-Driven</h3>
                  <p className="text-secondary-600">We genuinely love what we do and it shows in every detail</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Users className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-secondary mb-1">Community-Focused</h3>
                  <p className="text-secondary-600">Building a culture where everyone feels included and celebrated</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Zap className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-secondary mb-1">Quality Obsessed</h3>
                  <p className="text-secondary-600">100% authentic products with uncompromising standards</p>
                </div>
              </div>
            </div>

            <Link href="/about">
              <Button>LEARN MORE ABOUT US</Button>
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="col-span-2 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/IMG/Lux/lux1.jpg"
                  alt="Luxury Culture Community"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Small Images */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/IMG/Lux/lux2.jpg"
                  alt="Premium Sneakers"
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/IMG/Lux/lux3.jpg"
                  alt="Authentic Products"
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Decorative Badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent text-white rounded-full p-6 shadow-xl">
              <div className="text-center">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs font-semibold whitespace-nowrap">AUTHENTIC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
