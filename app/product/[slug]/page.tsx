'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/lib/store/cart'
import { Button } from '@/components/ui/Button'
import { Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react'

// Mock product data - matches homepage products
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
    description: 'Kanye West\'s revolutionary sneaker with BOOST technology and Primeknit upper.',
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
  },
  {
    id: '3',
    name: 'Dunk Low "Panda"',
    slug: 'dunk-low-panda',
    description: 'Nike\'s classic basketball-inspired sneaker in the iconic black and white colorway.',
    price: 8000,
    originalPrice: 10000,
    brand: 'Nike',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['Black/White'],
    images: ['https://images.unsplash.com/photo-1606813907291-76e2d7d5e1a4?w=400&h=400&fit=crop'],
    inStock: true,
    isOnSale: true,
    tags: ['skate', 'casual', 'classic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCartStore()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = mockProducts.find(p => p.slug === params.slug)

  if (!product) {
    return (
      <div className="min-h-screen bg-primary section-padding">
        <div className="container-custom text-center">
          <h1 className="heading-lg mb-4">Product Not Found</h1>
          <Button onClick={() => window.location.href = '/shop'}>
            Back to Shop
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity
    })

    alert('Added to cart!')
  }

  return (
    <div className="min-h-screen bg-primary section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-secondary-600 uppercase tracking-wide mb-2">
                {product.brand}
              </p>
              <h1 className="heading-lg mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold">
                  KSh {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-secondary-500 line-through">
                    KSh {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-accent text-primary px-2 py-1 text-sm font-bold rounded">
                    SALE
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-secondary-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-primary'
                        : 'border-secondary-300 hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-secondary-300 rounded-lg hover:border-accent"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-secondary-300 rounded-lg hover:border-accent"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>ADD TO CART</span>
              </Button>

              <div className="flex space-x-4">
                <button className="flex-1 p-3 border border-secondary-300 rounded-lg hover:border-accent transition-colors flex items-center justify-center space-x-2">
                  <Heart size={20} />
                  <span>Wishlist</span>
                </button>
                <button className="flex-1 p-3 border border-secondary-300 rounded-lg hover:border-accent transition-colors flex items-center justify-center space-x-2">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-secondary-200 pt-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Brand:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span className="text-green-600">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}