'use client'

import { Star } from 'lucide-react'

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
    name: 'Marcus Johnson',
    role: 'Sneaker Enthusiast',
    text: 'Luxury Culture changed how I shop for premium sneakers. The quality is unmatched, and the customer service is exceptional. Every purchase feels like an investment.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Fashion Blogger',
    text: 'The curated collections at Luxury Culture are absolutely fire. You can tell they genuinely care about authenticity and bringing the best pieces to their customers.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: 3,
    name: 'David Okonkwo',
    role: 'Streetwear Collector',
    text: 'Fast shipping, authentic products, and a real community vibe. This is the place where serious collectors come. Highly recommended to anyone who values quality.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    id: 4,
    name: 'Emma Williams',
    role: 'Style Director',
    text: 'What I love most is the attention to detail. From the product descriptions to the packaging, everything screams premium. Worth every penny.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  },
]

export function Testimonials() {
  return (
    <section className="section-padding bg-secondary text-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">
            ⭐ WHAT OUR CUSTOMERS SAY
          </p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Loved by Luxury Enthusiasts
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made Luxury Culture their go-to destination for premium streetwear.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20 hover:border-accent/50"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-100 mb-6 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-5xl font-bold text-accent mb-2">10K+</p>
            <p className="text-gray-300">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-accent mb-2">4.9★</p>
            <p className="text-gray-300">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-accent mb-2">100%</p>
            <p className="text-gray-300">Authentic Products</p>
          </div>
        </div>
      </div>
    </section>
  )
}
