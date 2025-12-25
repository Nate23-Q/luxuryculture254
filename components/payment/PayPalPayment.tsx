'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Shield, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

interface PayPalPaymentProps {
  total: number
  orderInfo: {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    country: string
  }
  onSuccess: () => void
}



// Remove conflicting global declaration

export function PayPalPayment({ total, orderInfo, onSuccess }: PayPalPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [paypalButtonId] = useState(`paypal-button-${Date.now()}`)

  useEffect(() => {
    // Load PayPal SDK script
    const loadPayPalScript = async () => {
      try {
        // Check if PayPal SDK is already loaded
        if (window.paypal) {
          setIsScriptLoaded(true)
          return
        }

        // Create script element
        const script = document.createElement('script')
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'}&currency=USD&intent=capture`
        script.async = true
        
        script.onload = () => {
          setIsScriptLoaded(true)
        }
        
        script.onerror = () => {
          console.error('Failed to load PayPal SDK')
          toast.error('Failed to load PayPal. Please refresh the page.')
        }
        
        document.head.appendChild(script)
      } catch (error) {
        console.error('Error loading PayPal SDK:', error)
      }
    }

    loadPayPalScript()
  }, [])

  useEffect(() => {
    // Initialize PayPal button when script is loaded
    if (isScriptLoaded && window.paypal) {
      initializePayPalButton()
    }
  }, [isScriptLoaded, total, orderInfo])


  const initializePayPalButton = () => {
    if (!window.paypal || !window.paypal.Buttons) return

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: async (data: any, actions: any) => {
        try {
          // Prepare order data
          const orderData = {
            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                currency_code: 'USD', // PayPal USD for international
                value: (total / 130).toFixed(2), // Convert KES to USD (approximate rate)
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: (total / 130).toFixed(2)
                  }
                }
              },
              items: [{
                name: 'Luxury Culture Order',
                description: `Order for ${orderInfo.firstName} ${orderInfo.lastName}`,
                unit_amount: {
                  currency_code: 'USD',
                  value: (total / 130).toFixed(2)
                },
                quantity: '1',
                category: 'PHYSICAL_GOODS'
              }],
              shipping: {
                name: {
                  full_name: `${orderInfo.firstName} ${orderInfo.lastName}`
                },
                address: {
                  address_line_1: orderInfo.address,
                  admin_area_2: orderInfo.city,
                  country_code: 'KE' // Kenya
                }
              }
            }],
            payer: {
              email_address: orderInfo.email,
              name: {
                given_name: orderInfo.firstName,
                surname: orderInfo.lastName
              }
            },
            application_context: {
              brand_name: 'Luxury Culture',
              landing_page: 'LOGIN',
              user_action: 'PAY_NOW',
              return_url: `${window.location.origin}/checkout/paypal/success`,
              cancel_url: `${window.location.origin}/checkout/paypal/cancel`
            }
          }

          // Create PayPal order
          const response = await fetch('/api/payment/paypal/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
          })

          if (!response.ok) {
            throw new Error('Failed to create PayPal order')
          }

          const orderDetails = await response.json()
          return orderDetails.id
        } catch (error) {
          console.error('Error creating PayPal order:', error)
          toast.error('Failed to create PayPal order. Please try again.')
          throw error
        }
      },
      onApprove: async (data: any, actions: any) => {
        try {
          setIsLoading(true)
          
          // Capture the payment
          const response = await fetch('/api/payment/paypal/capture-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              orderID: data.orderID,
              orderInfo
            })
          })

          if (!response.ok) {
            throw new Error('Failed to capture PayPal payment')
          }

          const captureDetails = await response.json()
      
          if (captureDetails.status === 'COMPLETED') {
            toast.success('Payment completed successfully!')
            onSuccess()
            // Redirect to success page
            window.location.href = '/order/success'
          } else {
            throw new Error('Payment was not completed')
          }
        } catch (error) {
          console.error('Error capturing PayPal payment:', error)
          toast.error('Payment failed. Please try again.')
        } finally {
          setIsLoading(false)
        }
      },
      onError: (err: any) => {
        console.error('PayPal error:', err)
        toast.error('PayPal payment failed. Please try again.')
        setIsLoading(false)
      },

      onCancel: (data: any) => {
        console.log('PayPal payment cancelled:', data)
        toast('Payment was cancelled')
      }
    }).render(`#${paypalButtonId}`)
  }

  const handlePayPalError = () => {
    toast.error('PayPal is temporarily unavailable. Please try another payment method.')
  }

  return (
    <div className="space-y-6">
      {/* PayPal Information */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-blue-800 text-white p-2 rounded">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="font-bold text-blue-800">PayPal</h3>
            <p className="text-sm text-blue-700">Pay securely with your PayPal account</p>
          </div>
        </div>
        <p className="text-sm text-blue-700">
          PayPal is the safer, easier way to pay online without sharing your financial details. 
          Available worldwide with buyer protection.
        </p>
      </div>

      {/* PayPal Button Container */}
      <div className="space-y-4">
        {isScriptLoaded ? (
          <div>
            <div id={paypalButtonId}></div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Loader className="mx-auto mb-4 animate-spin text-blue-600" size={32} />
            <p className="text-secondary-600">Loading PayPal...</p>
          </div>
        )}
      </div>

      {/* Payment Summary */}
      <div className="bg-secondary-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Payment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total (KES):</span>
            <span>KSh {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total (USD)*:</span>
            <span>${(total / 130).toFixed(2)}</span>
          </div>
          <div className="text-xs text-secondary-600 mt-2">
            * Exchange rate: 1 USD = 130 KES (approximate)
          </div>
        </div>
      </div>

      {/* PayPal Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Shield className="mx-auto mb-2 text-blue-600" size={24} />
          <p className="font-medium">Buyer Protection</p>
          <p className="text-xs text-secondary-600">Full refund if item not received</p>
        </div>
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Shield className="mx-auto mb-2 text-blue-600" size={24} />
          <p className="font-medium">Fraud Protection</p>
          <p className="text-xs text-secondary-600">Advanced security monitoring</p>
        </div>
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Shield className="mx-auto mb-2 text-blue-600" size={24} />
          <p className="font-medium">24/7 Support</p>
          <p className="text-xs text-secondary-600">PayPal customer service</p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="text-center text-xs text-secondary-600">
        <p>
          🔒 Your payment is secured by PayPal's advanced encryption
        </p>
        <p className="mt-1">
          We never see your PayPal login details or financial information
        </p>
      </div>

      {/* Fallback Button (in case PayPal SDK fails to load) */}
      {!isScriptLoaded && (
        <Button
          onClick={handlePayPalError}
          variant="outline"
          className="w-full"
          disabled
        >
          PayPal Loading...
        </Button>
      )}
    </div>
  )
}
