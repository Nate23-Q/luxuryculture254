'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import { useWishlistStore } from '@/lib/store/wishlist'
import { Button } from '@/components/ui/Button'
import { Minus, Plus, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react'
import { allProducts } from '@/lib/data/all-products'
import { lux2Products } from '@/lib/data/lux2-products'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Combine all products to include Lux2 products
  const allAvailableProducts = [...allProducts, ...lux2Products]
  const product = allAvailableProducts.find(p => p.slug === params.slug)

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
      color: product.colors[0],
      brand: product.brand,
      slug: product.slug,
      quantity
    })

    alert('Added to cart!')
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      alert('Removed from wishlist!')
    } else {
      addToWishlist(product)
      alert('Added to wishlist!')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} for $${product.price}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Product link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-primary section-padding">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-secondary-600 hover:text-accent">Home</Link>
          <ChevronRight size={16} className="text-secondary-400" />
          <Link href="/shop" className="text-secondary-600 hover:text-accent">Shop</Link>
          <ChevronRight size={16} className="text-secondary-400" />
          <span className="text-secondary-900">{product.name}</span>
        </nav>

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
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-secondary-500 line-through">
                    ${product.originalPrice.toLocaleString()}
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
                <button 
                  onClick={handleWishlistToggle}
                  className={`flex-1 p-3 border rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isInWishlist(product.id) 
                      ? 'border-accent bg-accent text-primary' 
                      : 'border-secondary-300 hover:border-accent'
                  }`}
                >
                  <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                  <span>Wishlist</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 p-3 border border-secondary-300 rounded-lg hover:border-accent transition-colors flex items-center justify-center space-x-2"
                >
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