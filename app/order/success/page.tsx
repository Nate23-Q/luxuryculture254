'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Package, Mail, ArrowRight, Loader } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface OrderDetails {
  orderNumber: string
  total: number
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  mpesaReceiptNumber?: string
  customer: {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    country: string
  }
  items: Array<{
    name: string
    price: number
    quantity: number
    size: string
    image: string
  }>
  createdAt: string
}

export default function OrderSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedOrderNumber = localStorage.getItem('lastOrderNumber')
    
    if (storedOrderNumber) {
      fetchOrderDetails(storedOrderNumber)
    } else {
      setOrderDetails({
        orderNumber: 'PENDING',
        total: 0,
        paymentMethod: 'M-Pesa',
        paymentStatus: 'completed',
        orderStatus: 'confirmed',
        customer: {
          email: 'customer@example.com',
          firstName: 'Customer',
          lastName: '',
          phone: '',
          address: '',
          city: '',
          country: ''
        },
        items: [],
        createdAt: new Date().toISOString()
      })
      setLoading(false)
    }
  }, [])

  const fetchOrderDetails = async (orderNumber: string) => {
    try {
      const response = await fetch(`/api/orders?orderNumber=${encodeURIComponent(orderNumber)}`)
      const data = await response.json()

      if (data.order) {
        setOrderDetails(data.order)
      } else {
        setError('Order not found')
      }
    } catch (err) {
      console.error('Error fetching order:', err)
      setError('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-20">
            <Loader className="w-12 h-12 animate-spin mx-auto text-accent" />
            <p className="mt-4 text-secondary-600">Loading order details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen bg-primary section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-yellow-600" />
              </div>
            </div>
            <h1 className="heading-lg mb-4">Order Processing</h1>
            <p className="text-body mb-8">
              Your payment is being processed. Order details will be available shortly.
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const estimatedDelivery = orderDetails.orderStatus === 'confirmed' 
    ? '2-3 business days' 
    : orderDetails.orderStatus === 'shipped' 
    ? '1-2 business days'
    : 'Processing'

  const getStepClass = (step: number) => {
    const currentStep = orderDetails.orderStatus === 'confirmed' ? 1 : orderDetails.orderStatus === 'shipped' ? 2 : orderDetails.orderStatus === 'delivered' ? 3 : 1
    if (step <= currentStep) {
      return 'bg-accent text-primary'
    }
    return 'bg-secondary-200 text-secondary'
  }

  return (
    <div className="min-h-screen bg-primary section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="heading-lg mb-4">Order Confirmed!</h1>
            <p className="text-body mb-2">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>
            <p className="text-small text-secondary-600">
              A confirmation email has been sent to {orderDetails.customer?.email || 'your email'}
            </p>
          </div>

          {/* Order Details Card */}
          <div className="card p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-secondary mb-6">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Order Number:</span>
                <span className="font-bold text-secondary">{orderDetails.orderNumber}</span>
              </div>
              
              {orderDetails.mpesaReceiptNumber && (
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">M-Pesa Receipt:</span>
                  <span className="font-medium text-secondary">{orderDetails.mpesaReceiptNumber}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Total Amount:</span>
                <span className="font-bold text-accent">${orderDetails.total.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Payment Method:</span>
                <span className="font-medium">
                  {orderDetails.paymentMethod === 'mpesa' ? 'M-Pesa' : 
                   orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' :
                   orderDetails.paymentMethod === 'paypal' ? 'PayPal' : 'Paystack'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Estimated Delivery:</span>
                <span className="font-medium">{estimatedDelivery}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Status:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  orderDetails.orderStatus === 'confirmed' || orderDetails.orderStatus === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  <Package className="w-3 h-3 mr-1" />
                  {orderDetails.orderStatus.charAt(0).toUpperCase() + orderDetails.orderStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items (if available) */}
          {orderDetails.items && orderDetails.items.length > 0 && (
            <div className="card p-6 mb-8 text-left">
              <h3 className="text-lg font-bold text-secondary mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-secondary-600">Size: {item.size} - Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Whats Next Section */}
          <div className="card p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-secondary mb-4">What is Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className={`${getStepClass(1)} rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold`}>1</div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-secondary-600">We are preparing your items for shipment</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className={`${getStepClass(2)} rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold`}>2</div>
                <div>
                  <p className="font-medium">Order Shipped</p>
                  <p className="text-sm text-secondary-600">You will receive a tracking number via email</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className={`${getStepClass(3)} rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold`}>3</div>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-secondary-600">Your order will be delivered to your address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/shop">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              
              <Link href={`/account/orders?order=${orderDetails.orderNumber}`}>
                <Button variant="secondary" className="w-full">
                  Track Order
                </Button>
              </Link>
            </div>
            
            <Link href="/">
              <Button className="w-full md:w-auto">
                <ArrowRight className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Support Section */}
          <div className="mt-12 p-6 bg-secondary text-primary rounded-lg">
            <h3 className="text-lg font-bold mb-4">Need Help?</h3>
            <p className="text-sm mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Mail className="mr-2" size={16} />
                Luxuryculture254@gmail.com
              </div>
              <div>+254 787 507945</div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 p-6 bg-accent text-primary rounded-lg">
            <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for exclusive deals and new arrivals.
            </p>
            <div className="flex space-x-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-secondary"
              />
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

