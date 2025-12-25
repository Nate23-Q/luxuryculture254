'use client'

import { useMemo } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { mockProducts } from '@/lib/data/products'
import { TrendingUp, Star, ArrowRight, Crown } from 'lucide-react'
import Link from 'next/link'

export default function BestSellersPage() {
  const bestSellerProducts = useMemo(() => {
    return mockProducts.filter(product => product.isBestseller && product.inStock)
  }, [])

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-accent text-primary py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-8 w-8" />
                <span className="text-lg font-semibold uppercase tracking-wide">Top Rated</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4">
                Best Sellers
              </h1>
              <p className="text-lg lg:text-xl mb-6 text-primary/90 max-w-2xl">
                The most loved and sought-after styles in our collection. These are the shoes 
                that define trends and set the standard for excellence.
              </p>
              <div className="flex items-center gap-4">
                <span className="bg-primary text-secondary px-4 py-2 rounded-full text-sm font-semibold">
                  {bestSellerProducts.length} Best Sellers
                </span>
                <Link 
                  href="/new-arrivals" 
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <span className="text-sm font-medium">View New Arrivals</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-2">
                <Star className="h-12 w-12 text-primary/30" />
                <TrendingUp className="h-16 w-16 text-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Showcase */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-secondary-100 p-6 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                Customer Favorites
              </h3>
              <p className="text-secondary-600">Most loved styles by our community</p>
            </div>
            <div className="bg-secondary-100 p-6 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Trending Now
              </h3>
              <p className="text-secondary-600">The hottest picks right now</p>
            </div>
            <div className="bg-secondary-100 p-6 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
                <Crown className="h-5 w-5 text-accent" />
                Premium Quality
              </h3>
              <p className="text-secondary-600">Crafted for style and comfort</p>
            </div>
          </div>

          {/* Best Sellers Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Crown className="h-6 w-6 text-accent" />
                Our Best Selling Collection
              </h2>
              <span className="text-secondary-600">
                Latest arrivals and trending styles
              </span>
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {[
                'DSC02183.JPG', 'DSC02186.JPG', 'DSC02222.JPG', 'DSC02242.JPG',
                'DSC02252.JPG', 'DSC02254.JPG', 'DSC02256.JPG', 'DSC02262.JPG',
                'DSC02264.JPG', 'DSC02269.JPG', 'DSC02868.JPG', 'DSC02877.JPG',
                'DSC02889.JPG', 'DSC02893.JPG', 'DSC02922.JPG', 'DSC02926.JPG',
                'DSC02927.JPG', 'DSC02928.JPG', 'DSC02935.JPG', 'DSC02949.JPG',
                'DSC02952.JPG', 'DSC02954.JPG', 'DSC02955.JPG', 'DSC02956.JPG',
                'DSC02962.JPG', 'DSC02994_1.JPG', 'DSC02997_1.JPG', 'DSC03056_1.JPG'
              ].map((image, index) => (
                <div key={image} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={`/Arrivals/${image}`}
                      alt={`Best Seller ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold text-sm">Premium Style #{index + 1}</h3>
                    <p className="text-accent font-bold">Best Seller</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Best Sellers */}
      <div className="bg-secondary-200 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Why Our Best Sellers Stand Out
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              These products have earned their place as our best sellers through quality, 
              style, and customer satisfaction. Here's what makes them special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-accent text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">5-Star Reviews</h3>
              <p className="text-sm text-secondary-600">Consistently rated highest by our customers</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Trending Styles</h3>
              <p className="text-sm text-secondary-600">Always ahead of the fashion curve</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-secondary-600">Built to last with superior materials</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold">K</span>
              </div>
              <h3 className="font-semibold mb-2">Kicks Certified</h3>
              <p className="text-sm text-secondary-600">100% authentic guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Can't Decide? Try Our Best Sellers
          </h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who chose our best-selling styles. 
            Quality you can trust, style you can love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Browse All Products
            </Link>
            <Link 
              href="/new-arrivals" 
              className="border-2 border-accent text-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent hover:text-primary transition-colors"
            >
              View New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
