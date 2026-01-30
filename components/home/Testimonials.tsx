'use client'

import { Star, Shield, Award, Users } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'James Mitchell',
    role: 'Sneaker Enthusiast',
    text: 'Luxury Culture changed how I shop for premium sneakers. The quality is unmatched, and the customer service is exceptional. Every purchase feels like an investment.',
    rating: 5,
    image: '/IMG/Lux/pro.jpeg',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Fashion Blogger',
    text: 'The curated collections at Luxury Culture are absolutely fire. You can tell they genuinely care about authenticity and bringing the best pieces to their customers.',
    rating: 5,
    image: '/IMG/Lux/pro1.jpeg',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Streetwear Collector',
    text: 'Fast shipping, authentic products, and a real community vibe. This is the place where serious collectors come. Highly recommended to anyone who values quality.',
    rating: 5,
    image: '/IMG/Lux/pro2.jpeg',
  },
  {
    id: 4,
    name: 'Emma Williams',
    role: 'Style Director',
    text: 'What I love most is the attention to detail. From the product descriptions to the packaging, everything screams premium. Worth every penny.',
    rating: 5,
    image: '/IMG/Lux/pro3.jpeg',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/4 -translate-x-1/4" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-red-500"></div>
            <span className="text-xs font-bold tracking-widest text-accent uppercase">Verified Reviews</span>
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-accent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Loved by Thousands
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who've made Luxury Culture their go-to destination for premium streetwear and authentic sneakers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group card-luxury p-8 hover:shadow-2xl"
            >
              {/* Trust Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Shield size={14} className="text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Verified</span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-8 leading-relaxed text-sm font-medium">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                />
                <div>
                  <p className="font-bold text-black text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-accent/10 to-red-500/10 p-4 rounded-full group-hover:from-accent group-hover:to-red-500 transition-all duration-300">
                  <Users size={28} className="text-accent group-hover:text-white transition-colors" />
                </div>
              </div>
              <p className="text-4xl lg:text-5xl font-black text-accent mb-2">10K+</p>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-accent/10 to-red-500/10 p-4 rounded-full group-hover:from-accent group-hover:to-red-500 transition-all duration-300">
                  <Star size={28} className="text-accent fill-current group-hover:text-white group-hover:fill-white transition-colors" />
                </div>
              </div>
              <p className="text-4xl lg:text-5xl font-black text-accent mb-2">4.9★</p>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-accent/10 to-red-500/10 p-4 rounded-full group-hover:from-accent group-hover:to-red-500 transition-all duration-300">
                  <Shield size={28} className="text-accent group-hover:text-white transition-colors" />
                </div>
              </div>
              <p className="text-4xl lg:text-5xl font-black text-accent mb-2">100%</p>
              <p className="text-gray-600 font-medium">Authentic</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-accent/10 to-red-500/10 p-4 rounded-full group-hover:from-accent group-hover:to-red-500 transition-all duration-300">
                  <Award size={28} className="text-accent group-hover:text-white transition-colors" />
                </div>
              </div>
              <p className="text-4xl lg:text-5xl font-black text-accent mb-2">50+</p>
              <p className="text-gray-600 font-medium">Premium Brands</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
