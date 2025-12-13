 'use client'

import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store/cart'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.inStock) {
      toast.error('This item is currently out of stock')
      return
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: product.colors[0] || 'Default',
      image: product.images[0] || '/placeholder-shoe.jpg',
      quantity: 1,
      brand: product.brand,
      slug: product.slug,
    }

    addItem(cartItem)
    toast.success('Added to cart!')
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div 
      className={`group relative ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="card-hover overflow-hidden">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary-100">
            <img
              src={product.images[0] || '/placeholder-shoe.jpg'}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isOnSale && discount > 0 && (
                <span className="product-badge-sale">
                  -{discount}%
                </span>
              )}
              {product.isNewArrival && (
                <span className="product-badge bg-secondary text-primary">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="product-badge bg-accent text-primary">
                  BESTSELLER
                </span>
              )}
              {!product.inStock && (
                <span className="product-badge bg-secondary-800 text-primary">
                  SOLD OUT
                </span>
              )}
            </div>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
                isLiked 
                  ? 'bg-accent text-primary' 
                  : 'bg-primary-100 text-secondary hover:bg-accent hover:text-primary'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>

            {/* Quick Add to Cart */}
            {product.inStock && (
              <div className={`absolute bottom-2 left-2 right-2 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                <Button
                  onClick={handleAddToCart}
                  className="w-full text-sm"
                  size="sm"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  QUICK ADD
                </Button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <p className="text-xs text-secondary-600 uppercase tracking-wide font-medium">
                {product.brand}
              </p>
              <h3 className="text-sm font-semibold text-secondary line-clamp-2 group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </div>

            {/* Size Selection */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {product.sizes.slice(0, 4).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedSize(size)
                    }}
                    className={`w-8 h-8 text-xs border rounded transition-colors ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-primary'
                        : 'border-secondary-300 text-secondary hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
                {product.sizes.length > 4 && (
                  <span className="text-xs text-secondary-600 self-center">
                    +{product.sizes.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-secondary">
                KSh {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="price-original">
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
