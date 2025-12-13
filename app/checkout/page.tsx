'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { Button } from '@/components/ui/Button'
import { MpesaPayment } from '@/components/payment/MpesaPayment'
import { CardPayment } from '@/components/payment/CardPayment'
import { PayPalPayment } from '@/components/payment/PayPalPayment'
import { Lock, Shield, CreditCard } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [selectedPayment, setSelectedPayment] = useState<'mpesa' | 'card' | 'paypal'>('mpesa')
  const [orderInfo, setOrderInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya',
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal > 5000 ? 0 : 500
  const tax = subtotal * 0.16
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-primary section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="heading-lg mb-4">No Items to Checkout</h1>
            <p className="text-body mb-8">
              Your cart is empty. Add some items before proceeding to checkout.
            </p>
            <Button onClick={() => window.location.href = '/shop'}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary section-padding">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Secure Checkout</h1>
            <p className="text-body">Complete your order with our secure payment options</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Order Details & Payment */}
            <div className="space-y-6">
              {/* Order Items Summary */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-secondary mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-secondary-600">Size: {item.size} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">KSh {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-secondary-200 mt-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>KSh {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{shipping === 0 ? 'FREE' : `KSh ${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (VAT):</span>
                      <span>KSh {tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-secondary-200 pt-2">
                      <span>Total:</span>
                      <span>KSh {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-secondary mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">First Name *</label>
                    <input
                      type="text"
                      value={orderInfo.firstName}
                      onChange={(e) => setOrderInfo({...orderInfo, firstName: e.target.value})}
                      className="input-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={orderInfo.lastName}
                      onChange={(e) => setOrderInfo({...orderInfo, lastName: e.target.value})}
                      className="input-primary"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary mb-2">Email *</label>
                    <input
                      type="email"
                      value={orderInfo.email}
                      onChange={(e) => setOrderInfo({...orderInfo, email: e.target.value})}
                      className="input-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={orderInfo.phone}
                      onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                      placeholder="+254 7XX XXX XXX"
                      className="input-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">City *</label>
                    <input
                      type="text"
                      value={orderInfo.city}
                      onChange={(e) => setOrderInfo({...orderInfo, city: e.target.value})}
                      className="input-primary"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary mb-2">Address *</label>
                    <input
                      type="text"
                      value={orderInfo.address}
                      onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                      className="input-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-secondary mb-6 flex items-center">
                  <Lock className="mr-2" size={20} />
                  Payment Method
                </h2>

                {/* Payment Method Selection */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border border-secondary rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="mpesa"
                      checked={selectedPayment === 'mpesa'}
                      onChange={(e) => setSelectedPayment(e.target.value as 'mpesa')}
                      className="mr-3"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-600 text-white p-2 rounded">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-medium">M-Pesa (Lipa na M-Pesa)</p>
                        <p className="text-sm text-secondary-600">Pay with your M-Pesa mobile money</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-secondary rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === 'card'}
                      onChange={(e) => setSelectedPayment(e.target.value as 'card')}
                      className="mr-3"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 text-white p-2 rounded">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-secondary-600">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-secondary rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={selectedPayment === 'paypal'}
                      onChange={(e) => setSelectedPayment(e.target.value as 'paypal')}
                      className="mr-3"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-800 text-white p-2 rounded">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-secondary-600">Pay securely with your PayPal account</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Payment Method Content */}
                <div className="border-t border-secondary-200 pt-6">
                  {selectedPayment === 'mpesa' && (
                    <MpesaPayment 
                      total={total}
                      orderInfo={orderInfo}
                      onSuccess={() => clearCart()}
                    />
                  )}
                  {selectedPayment === 'card' && (
                    <CardPayment 
                      total={total}
                      orderInfo={orderInfo}
                      onSuccess={() => clearCart()}
                    />
                  )}
                  {selectedPayment === 'paypal' && (
                    <PayPalPayment 
                      total={total}
                      orderInfo={orderInfo}
                      onSuccess={() => clearCart()}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Order Total & Security */}
            <div className="space-y-6">
              {/* Total Summary */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-secondary mb-4">Order Total</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `KSh ${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (VAT)</span>
                    <span>KSh {tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-secondary pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>KSh {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-secondary mb-4">Security & Trust</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="text-accent" size={20} />
                    <div>
                      <p className="font-medium">256-bit SSL Encryption</p>
                      <p className="text-sm text-secondary-600">Your payment information is secure</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Lock className="text-accent" size={20} />
                    <div>
                      <p className="font-medium">PCI DSS Compliant</p>
                      <p className="text-sm text-secondary-600">Industry-standard security</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="text-accent" size={20} />
                    <div>
                      <p className="font-medium">Money-back Guarantee</p>
                      <p className="text-sm text-secondary-600">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="card p-6 bg-secondary text-primary">
                <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                <p className="text-sm mb-4">
                  Our customer support team is here to help with your order.
                </p>
                <div className="space-y-2 text-sm">
                  <p>📞 +254 700 000 000</p>
                  <p>📧 support@shopjr.com</p>
                  <p>🕒 Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
