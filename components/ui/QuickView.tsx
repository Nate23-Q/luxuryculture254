'use client'

import { useState } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { Button } from './Button'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store/cart'

interface QuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const { addItem } = useCartStore()

  if (!isOpen) return null

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
      brand: product.brand,
      slug: product.slug,
      color: product.colors[0]
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Quick View</h2>
            <button onClick={onClose} className="p-2 hover:bg-secondary-100 rounded">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-secondary-600 uppercase">{product.brand}</p>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-xl font-bold text-accent">KSh {product.price.toLocaleString()}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Size</h4>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2 border rounded text-center ${
                        selectedSize === size
                          ? 'border-accent bg-accent text-primary'
                          : 'border-secondary-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full">
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}