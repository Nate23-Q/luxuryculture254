'use client'

import { useState } from 'react'
import { X, Plus, Check, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import { Product } from '@/types'

interface ProductComparisonProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
  onRemoveProduct: (productId: string) => void
  onAddToCart: (product: Product) => void
}

export function ProductComparison({ 
  isOpen, 
  onClose, 
  products, 
  onRemoveProduct, 
  onAddToCart 
}: ProductComparisonProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }))
  }

  const handleAddToCart = (product: Product) => {
    const selectedSize = selectedSizes[product.id]
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size first')
      return
    }
    onAddToCart(product)
  }

  const comparisonFeatures = [
    { key: 'price', label: 'Price' },
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Category' },
    { key: 'sizes', label: 'Available Sizes' },
    { key: 'colors', label: 'Colors' },
    { key: 'rating', label: 'Rating' },
    { key: 'inStock', label: 'Availability' }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">Compare Products</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="max-w-7xl mx-auto p-6">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products to compare</h3>
                <p className="text-gray-600">Add products to your comparison list to see them here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <td className="w-48 p-4"></td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 min-w-[280px]">
                          <div className="relative">
                            <button
                              onClick={() => onRemoveProduct(product.id)}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                            >
                              <X size={16} />
                            </button>
                            
                            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                              <div className=\"aspect-square bg-white rounded-lg overflow-hidden\">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className=\"w-full h-full object-cover\"
                                />
                              </div>
                              
                              <div className=\"text-center\">
                                <h3 className=\"font-semibold text-lg mb-2\">{product.name}</h3>
                                <div className=\"flex items-center justify-center space-x-2 mb-3\">
                                  <span className=\"text-2xl font-bold text-red-500\">
                                    KSh {product.price.toLocaleString()}
                                  </span>
                                  {product.originalPrice && (
                                    <span className=\"text-sm text-gray-500 line-through\">
                                      KSh {product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                
                                {/* Size Selection */}
                                {product.sizes && product.sizes.length > 0 && (
                                  <div className=\"mb-3\">
                                    <p className=\"text-sm font-medium mb-2\">Select Size:</p>
                                    <div className=\"grid grid-cols-3 gap-1\">
                                      {product.sizes.slice(0, 6).map((size) => (
                                        <button
                                          key={size}
                                          onClick={() => handleSizeSelect(product.id, size)}
                                          className={`py-1 px-2 text-xs border rounded transition-all ${\n                                            selectedSizes[product.id] === size\n                                              ? 'border-red-500 bg-red-500 text-white'\n                                              : 'border-gray-300 hover:border-gray-400'\n                                          }`}
                                        >
                                          {size}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                <Button
                                  onClick={() => handleAddToCart(product)}
                                  className=\"w-full py-2 text-sm\"\n                                  disabled={!product.inStock}
                                >
                                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </thead>
                  
                  <tbody>
                    {comparisonFeatures.map((feature) => (
                      <tr key={feature.key} className=\"border-t border-gray-100\">
                        <td className=\"p-4 font-medium text-gray-900 bg-gray-50\">
                          {feature.label}
                        </td>
                        {products.map((product) => (
                          <td key={product.id} className=\"p-4 text-center\">
                            {feature.key === 'price' && (
                              <div>
                                <span className=\"text-lg font-bold text-red-500\">
                                  KSh {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <div className=\"text-sm text-gray-500 line-through\">
                                    KSh {product.originalPrice.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            )}
                            {feature.key === 'brand' && (
                              <span className=\"font-medium\">{product.brand}</span>
                            )}
                            {feature.key === 'category' && (
                              <span className=\"capitalize\">{product.category}</span>
                            )}
                            {feature.key === 'sizes' && (
                              <div className=\"flex flex-wrap gap-1 justify-center\">
                                {product.sizes?.slice(0, 4).map((size) => (
                                  <span
                                    key={size}
                                    className=\"px-2 py-1 bg-gray-100 text-xs rounded\"
                                  >
                                    {size}
                                  </span>
                                ))}
                                {product.sizes && product.sizes.length > 4 && (
                                  <span className=\"text-xs text-gray-500\">
                                    +{product.sizes.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}
                            {feature.key === 'colors' && (
                              <div className=\"flex flex-wrap gap-1 justify-center\">
                                {product.colors?.slice(0, 3).map((color) => (
                                  <span
                                    key={color}
                                    className=\"px-2 py-1 bg-gray-100 text-xs rounded\"
                                  >
                                    {color}
                                  </span>
                                ))}
                                {product.colors && product.colors.length > 3 && (
                                  <span className=\"text-xs text-gray-500\">
                                    +{product.colors.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                            {feature.key === 'rating' && (
                              <div className=\"flex items-center justify-center space-x-1\">
                                <div className=\"flex items-center\">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                                <span className=\"text-sm text-gray-600\">(4.2)</span>
                              </div>
                            )}
                            {feature.key === 'inStock' && (
                              <div className=\"flex items-center justify-center\">
                                {product.inStock ? (
                                  <div className=\"flex items-center space-x-1 text-green-600\">
                                    <Check size={16} />
                                    <span className=\"text-sm font-medium\">In Stock</span>
                                  </div>
                                ) : (
                                  <span className=\"text-sm font-medium text-red-600\">Out of Stock</span>
                                )}
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}