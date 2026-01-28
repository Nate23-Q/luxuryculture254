 'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Users, Award, Truck, Shield, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const cultureFeatures = [
  {
    icon: Shield,
    title: '100% AUTHENTIC',
    description: 'Every product verified by our expert team. Guaranteed authentic or your money back.'
  },
  {
    icon: Truck,
    title: 'SAME-DAY DELIVERY',
    description: 'Order before 2PM and get your drops delivered the same day in Nairobi.'
  },
  {
    icon: Users,
    title: 'COMMUNITY FIRST',
    description: 'Join 10,000+ sneakerheads celebrating Kenyan streetwear culture.'
  }
]

const blogPosts = [
  {
    id: '1',
    title: 'The Evolution of Sneaker Culture in Kenya',
    excerpt: 'How streetwear and sneaker culture has grown across East Africa, from bootleg releases to official drops.',
    image: '/IMG/latest/lux14.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 15, 2024',
    href: '/editorial/sneaker-culture-kenya'
  },
  {
    id: '2',
    title: 'Top 10 Sneaker Drops of 2024',
    excerpt: 'The most hyped and sought-after releases that defined the year in sneaker culture.',
    image: '/IMG/latest/lux12.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 10, 2024', 
    href: '/editorial/top-10-drops-2024'
  },
  {
    id: '3',
    title: 'Style Guide: Mastering the Sneaker Fit',
    excerpt: 'How to perfectly pair your sneakers with outfits for any occasion, from casual to formal.',
    image: '/IMG/latest/lux16.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 5, 2024',
    href: '/editorial/sneaker-style-guide'
  }
]

export function CultureSection() {
  const brands = [
    { id: 'nike', name: 'Nike' },
    { id: 'adidas', name: 'Adidas' },
    { id: 'jordan', name: 'Jordan' },
    { id: 'converse', name: 'Converse' },
    { id: 'vans', name: 'Vans' },
    { id: 'new-balance', name: 'New Balance' },
    { id: 'puma', name: 'Puma' },
    { id: 'reebok', name: 'Reebok' },
  ]

  const [index, setIndex] = useState(0)
  const visible = 5
  const total = brands.length
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, 3000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [total])

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  return (
    <section className="section-padding bg-secondary text-primary">
      <div className="container-custom">
        {/* Kenyan Pride Banner */}
        <div className="bg-accent text-primary rounded-xl p-4 mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin size={24} />
              <div>
               
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-semibold">4.9★ Rating</span>
              </div>
              <div className="h-6 w-px bg-primary/30" />
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span className="text-sm font-semibold">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Retailer */}
        <div className="text-center mb-10">
          <h3 className="text-sm font-semibold text-secondary-600 uppercase mb-2">Official Retailer</h3>
          <p className="text-xl font-bold mb-6">Authorized dealer for premium brands</p>

          <div className="relative mx-auto max-w-4xl">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${(index / total) * 100}%)` }}
              >
                {brands.concat(brands).map((brand, idx) => (
                  <div key={`${brand.id}-${idx}`} className="w-1/5 px-3">
                    <div className="bg-primary border border-secondary rounded-xl p-6 h-28 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold text-sm mb-2">{brand.name[0]}</div>
                      <div className="text-sm text-secondary-600">{brand.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <button onClick={prev} aria-label="Previous" className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary border border-secondary p-2 rounded-full shadow-md">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next" className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary border border-secondary p-2 rounded-full shadow-md">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center space-x-2 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-accent to-red-500"></div>
              <span className="text-xs font-bold tracking-widest text-accent uppercase">The Culture</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              More Than
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-500">Just Sneakers</span>
            </h2>
            
            <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-lg leading-relaxed" style={{ lineHeight: '1.75' }}>
              We're not just a store – we're a community of passionate individuals 
              who celebrate sneaker culture, streetwear, and the stories behind every drop. 
              Join the movement.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {cultureFeatures.map((feature) => {
                const IconComponent = feature.icon
                return (
                  <div key={feature.title} className="group p-6 bg-white border border-gray-100 rounded-lg hover:shadow-lg hover:border-accent transition-all duration-300">
                    <div className="bg-gradient-to-br from-accent/10 to-red-500/10 p-4 rounded-lg w-fit mb-4 group-hover:from-accent group-hover:to-red-500 transition-all duration-300">
                      <IconComponent size={24} className="text-accent group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-base mb-3 group-hover:text-accent transition-colors">{feature.title}</h3>
                    <p className="text-sm opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            <Link href="/about">
              <Button className="group">
                LEARN MORE ABOUT US
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="/IMG/Lux/lux11.jpg"
              alt="Sneaker Culture"
              className="w-full h-[500px] object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
            
            {/* Floating Stats */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-primary text-secondary p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent">10K+</div>
                    <div className="text-xs">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">500+</div>
                    <div className="text-xs">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">50+</div>
                    <div className="text-xs">Brands</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Section */}
        <div className="border-t border-gray-200 pt-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-accent to-red-500"></div>
              <span className="text-xs font-bold tracking-widest text-accent uppercase">Editorial</span>
              <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-accent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Stories from the Culture
            </h2>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest news, trends, and stories from the world 
              of sneakers and streetwear.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="group card-luxury overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-200 image-zoom">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-4 font-medium tracking-wide">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-black group-hover:text-accent transition-colors mb-4 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={post.href} className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/editorial">
              <Button variant="outline" className="group">
                VIEW ALL STORIES
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
