import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function OrderSuccessPage() {
  // In a real implementation, you would fetch order details from API/database
  const orderDetails = {
    orderId: 'SJ-' + Date.now(),
    total: 8750,
    paymentMethod: 'M-Pesa',
    estimatedDelivery: '2-3 business days',
    customerEmail: 'customer@example.com'
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
              A confirmation email has been sent to {orderDetails.customerEmail}
            </p>
          </div>

          {/* Order Details Card */}
          <div className="card p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-secondary mb-6">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Order Number:</span>
                <span className="font-bold text-secondary">{orderDetails.orderId}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Total Amount:</span>
                <span className="font-bold text-accent">KSh {orderDetails.total.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Payment Method:</span>
                <span className="font-medium">{orderDetails.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Estimated Delivery:</span>
                <span className="font-medium">{orderDetails.estimatedDelivery}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Status:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Package className="w-3 h-3 mr-1" />
                  Processing
                </span>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="card p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-secondary mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-accent text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-secondary-600">We're preparing your items for shipment</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-secondary-200 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-medium">Order Shipped</p>
                  <p className="text-sm text-secondary-600">You'll receive a tracking number via email</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-secondary-200 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
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
              <Button
                onClick={() => window.location.href = '/shop'}
                variant="outline"
                className="w-full"
              >
                Continue Shopping
              </Button>
              
              <Button
                onClick={() => window.location.href = '/account/orders'}
                variant="secondary"
                className="w-full"
              >
                Track Order
              </Button>
            </div>
            
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full md:w-auto"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
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
                support@shopjr.com
              </div>
              <div>+254 700 000 000</div>
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
