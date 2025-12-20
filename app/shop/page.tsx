'use client'

import { useState } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Search, SlidersHorizontal } from 'lucide-react'

const mockProducts = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    slug: 'air-jordan-1-retro-high-og',
    description: 'The legendary Air Jordan 1 returns with premium materials and classic colorway.',
    price: 15000,
    originalPrice: 18000,
    brand: 'Nike',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Black'],
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
    inStock: true,
    isOnSale: true,
    isNewArrival: true,
    tags: ['retro', 'basketball', 'iconic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Yeezy Boost 350 V2',
    slug: 'yeezy-boost-350-v2',
    description: 'Kanye West\'s revolutionary sneaker with BOOST technology.',
    price: 12000,
    brand: 'Adidas',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['Cream', 'Black', 'Beluga'],
    images: ['https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop'],
    inStock: true,
    isOnSale: false,
    isNewArrival: true,
    tags: ['boost', 'casual', 'modern'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const brands = ['all', 'Nike', 'Adidas', 'Jordan', 'Converse']

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand
    return matchesSearch && matchesBrand
  })

  return (
    <div className="min-h-screen bg-primary">
      <div className="container-custom section-padding">
        <div className="mb-8">
          <h1 className="heading-lg mb-4">Shop All Products</h1>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-primary pl-10 w-full md:w-96"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-secondary-300 rounded-lg"
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </button>

          {showFilters && (
            <div className="p-6 bg-secondary-50 rounded-lg">
              <h3 className="font-semibold mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={selectedBrand === brand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}