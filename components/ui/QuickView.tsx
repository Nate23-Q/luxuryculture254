'use client'

import { useState } from 'react'
import { X, Plus, Minus, Heart, Share2, Star, Truck, Shield, RotateCcw, Eye } from 'lucide-react'
import { Button } from './Button'
import { useCartStore } from '@/lib/store/cart'
import { Product } from '@/types'

interface QuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('details')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCartStore()

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize || 'One Size',
      color: selectedColor || product.colors[0],
      quantity,
      brand: product.brand,
      slug: product.slug
    })

    onClose()
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.origin + `/product/${product.slug}`
      })
    } else {
      navigator.clipboard.writeText(window.location.origin + `/product/${product.slug}`)
      alert('Product link copied to clipboard!')
    }
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
        >
          <X size={20} />
        </button>

        {/* Sale Badge */}
        {product.isOnSale && discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discountPercentage}%
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="bg-gray-50 p-6">
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm relative group">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye size={16} />
                </button>
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-red-500 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 overflow-y-auto max-h-[95vh]">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
                  {product.isNewArrival && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      New
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-black mb-3">{product.name}</h2>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-red-500">
                    KSh {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      KSh {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.2)</span>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">24 reviews</span>
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Size</h4>
                    <button className="text-sm text-blue-600 hover:underline">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-3 border rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                          selectedSize === size
                            ? 'border-red-500 bg-red-500 text-white shadow-md'
                            : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                      >
                        UK {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 1 && (
                <div>
                  <h4 className="font-semibold mb-3">Color: {selectedColor || product.colors[0]}</h4>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                          (selectedColor || product.colors[0]) === color
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h4 className="font-semibold mb-3">Quantity</h4>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 py-3 border border-gray-300 rounded-lg min-w-[80px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full py-4 text-lg font-semibold"
                  disabled={!selectedSize && product.sizes && product.sizes.length > 0}
                >
                  Add to Cart - KSh {(product.price * quantity).toLocaleString()}
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex items-center justify-center space-x-2 py-3 border rounded-lg transition-all hover:scale-105 ${
                      isWishlisted 
                        ? 'border-red-500 bg-red-50 text-red-600' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
                    <span className="font-medium">Wishlist</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all hover:scale-105"
                  >
                    <Share2 size={16} />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-3 py-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck size={16} className="text-green-600" />
                  <span>Free delivery within Nairobi</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RotateCcw size={16} className="text-blue-600" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield size={16} className="text-purple-600" />
                  <span>100% authentic guarantee</span>
                </div>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex border-b border-gray-200 mb-4">
                  {['details', 'shipping', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'border-b-2 border-red-500 text-red-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div><strong>Brand:</strong> {product.brand}</div>
                        <div><strong>Category:</strong> {product.category}</div>
                        <div><strong>SKU:</strong> {product.id.toUpperCase()}</div>
                        <div className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                          <strong>Status:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p>• Free delivery within Nairobi (1-2 business days)</p>
                      <p>• Nationwide delivery available (3-5 business days)</p>
                      <p>• Express delivery option available</p>
                      <p>• Secure packaging guaranteed</p>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Overall Rating: 4.2/5</span>
                        <span>24 reviews</span>
                      </div>
                      <p className="text-gray-500">Customer reviews will be displayed here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}