'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import { Button } from '@/components/ui/Button'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (id: string, size: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id, size)
    } else {
      updateQuantity(id, size, newQuantity)
    }
  }

  const handleRemoveItem = (id: string, size: string) => {
    removeItem(id, size)
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 5000 ? 0 : 500
  const tax = subtotal * 0.16 // 16% VAT
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-primary section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag size={64} className="mx-auto text-secondary-400 mb-6" />
            <h1 className="heading-lg mb-4">Your Cart is Empty</h1>
            <p className="text-body mb-8">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up!
            </p>
            <Link href="/shop">
              <Button size="lg">START SHOPPING</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Shopping Cart</h1>
            <p className="text-body">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="card p-4 sm:p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 sm:w-24 h-20 sm:h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <h3 className="font-semibold text-secondary truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-secondary-600">
                              {item.brand} • Size {item.size} • {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.size)}
                            className="p-2 text-secondary-400 hover:text-accent transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-secondary-600">Qty:</span>
                            <div className="flex items-center border border-secondary rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                                className="p-2 hover:bg-secondary-50 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-2 text-center min-w-[3rem]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                                className="p-2 hover:bg-secondary-50 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-secondary">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-secondary-600">
                              ${item.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-8">
                <h2 className="text-xl font-bold text-secondary mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-accent">FREE</span>
                      ) : (
                        `$${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Tax (VAT)</span>
                    <span className="font-medium">${tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-secondary pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-secondary">Total</span>
                      <span className="text-lg font-bold text-secondary">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Banner */}
                {subtotal < 5000 && (
                  <div className="bg-accent text-primary p-3 rounded-lg mb-6">
                    <p className="text-sm font-medium">
                      Add ${(5000 - subtotal).toLocaleString()} more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'PROCEED TO CHECKOUT'}
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <div className="space-y-2 text-sm text-secondary-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>30-day returns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Authenticity guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
