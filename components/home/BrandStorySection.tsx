'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Heart, Target, Zap, Users } from 'lucide-react'

export function BrandStorySection() {
  const pillars = [
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'We believe in authenticity and quality. Every product is hand-selected by our team of sneaker enthusiasts who understand the culture.'
    },
    {
      icon: Target,
      title: 'Purpose First',
      description: 'Our mission is to elevate Kenyan streetwear culture by providing access to premium, authentic products at fair prices.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Same-day delivery, exclusive drops, and community-first initiatives make Luxury Culture the go-to destination for sneakerheads.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We are more than a store. We are a movement building the largest sneaker community in East Africa.'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/4 translate-y-1/4" />

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-red-500"></div>
            <span className="text-xs font-bold tracking-widest text-accent uppercase">Our Story</span>
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-accent"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-[1.1]" style={{ letterSpacing: '-0.02em' }}>
            Why We Exist
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed" style={{ lineHeight: '1.75' }}>
            Luxury Culture isn't just a store—it's a movement. We exist to democratize access to premium streetwear and sneakers, empowering the Kenyan sneaker community with authentic, curated products delivered with excellence.
          </p>

          <p className="text-base text-gray-600" style={{ lineHeight: '1.7' }}>
            In 2023, we started with a simple belief: Nairobi deserves access to authentic premium sneakers and streetwear at fair prices with exceptional service. Today, we're proud to serve over 10,000 satisfied customers and counting.
          </p>
        </div>

        {/* Four Pillars - Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={index}
                className="group p-8 bg-white border border-gray-100 rounded-lg hover:shadow-xl hover:border-accent transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="mb-6 inline-flex p-3 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Icon size={28} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-accent transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Key Stats Section */}
        <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-12 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="border-r border-gray-700 last:border-r-0">
              <p className="text-4xl md:text-5xl font-black text-accent mb-2">10K+</p>
              <p className="text-gray-300">Happy Customers</p>
            </div>
            <div className="border-r border-gray-700 last:border-r-0">
              <p className="text-4xl md:text-5xl font-black text-accent mb-2">500+</p>
              <p className="text-gray-300">Premium Products</p>
            </div>
            <div className="border-r border-gray-700 last:border-r-0">
              <p className="text-4xl md:text-5xl font-black text-accent mb-2">24HR</p>
              <p className="text-gray-300">Nairobi Delivery</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-accent mb-2">100%</p>
              <p className="text-gray-300">Authentic Guarantee</p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-8 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">What We Offer</h3>
            <ul className="space-y-3 text-gray-700 group-hover:text-white transition-colors">
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>100% Verified Authentic Products</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Exclusive Drops & Releases</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Same-Day Nairobi Delivery</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Expert Community Support</span>
              </li>
            </ul>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-8 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Why Choose Us</h3>
            <ul className="space-y-3 text-gray-700 group-hover:text-white transition-colors">
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Luxury Culture:</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Passionate Team of Sneakerheads</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Premium Quality Over Quantity</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Fair Pricing for All</span>
              </li>
            </ul>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-8 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Our Difference</h3>
            <ul className="space-y-3 text-gray-700 group-hover:text-white transition-colors">
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Local Expertise & Understanding</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Fast, Reliable Service</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Community Over Profit</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent group-hover:text-white font-bold">✓</span>
                <span>Building Culture, Not Just Sales</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-8">Join thousands of satisfied customers experiencing the Luxury Culture difference.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="group w-full sm:w-auto">
                START SHOPPING
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
