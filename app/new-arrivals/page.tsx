'use client'

import { useMemo } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { allProducts } from '@/lib/data/all-products'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NewArrivalsPage() {
  const newArrivalProducts = useMemo(() => {
    return allProducts.filter(product => product.isNewArrival && product.inStock)
  }, [])

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent to-secondary text-primary py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8" />
                <span className="text-lg font-semibold uppercase tracking-wide">Fresh Drops</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4">
                New Arrivals
              </h1>
              <p className="text-lg lg:text-xl mb-6 text-primary/90 max-w-2xl">
                Be the first to cop the latest releases. Fresh styles, cutting-edge designs, 
                and exclusive drops from your favorite brands.
              </p>
              <div className="flex items-center gap-4">
                <span className="bg-primary text-accent px-4 py-2 rounded-full text-sm font-semibold">
                  {newArrivalProducts.length} New Products
                </span>
                <Link 
                  href="/best-sellers" 
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <span className="text-sm font-medium">View Best Sellers</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/logo2.png" 
                alt="New Arrivals" 
                className="h-32 w-auto opacity-20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collection Showcase */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-secondary-100 p-6 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2">🚀 Latest Drops</h3>
              <p className="text-secondary-600">Fresh styles just landed in-store and online</p>
            </div>
            <div className="bg-secondary-100 p-6 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2">✨ Exclusive Releases</h3>
              <p className="text-secondary-600">Limited edition collabs and brand partnerships</p>
            </div>
            <div className="bg-secondary-100 p-6 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2">🔥 Hot Trends</h3>
              <p className="text-secondary-600">What's hot right now in sneaker culture</p>
            </div>
          </div>

          {/* Products Grid */}
          {newArrivalProducts.length > 0 ? (
            <ProductGrid products={newArrivalProducts} className="mb-12" />
          ) : (
            <div className="text-center py-16">
              <Sparkles className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">No New Arrivals Yet</h3>
              <p className="text-secondary-600 mb-6">
                Check back soon for the latest drops and fresh releases.
              </p>
              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Browse All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-secondary-200 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Never Miss a Drop
          </h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            Get notified when new arrivals drop. Be the first to know about exclusive releases, 
            restocks, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
