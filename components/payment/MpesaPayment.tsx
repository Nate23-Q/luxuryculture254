'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Smartphone, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/lib/store/cart'

interface MpesaPaymentProps {
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

export function MpesaPayment({ total, orderInfo, onSuccess }: MpesaPaymentProps) {
  const { items } = useCartStore()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSTKSent, setIsSTKSent] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>('')

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '')
    
    if (digits.startsWith('254')) {
      return digits.length <= 12 ? digits : digits.substring(0, 12)
    } else if (digits.startsWith('0')) {
      const without0 = digits.substring(1)
      return without0.length <= 9 ? `254${without0}` : `254${without0.substring(0, 9)}`
    } else if (digits.length <= 9) {
      return `254${digits}`
    }
    return digits.substring(0, 12)
  }

  const validatePhoneNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, '')
    if (!digits.startsWith('254')) return false
    if (digits.length !== 12) return false
    const thirdDigit = digits[3]
    return ['7', '1'].includes(thirdDigit)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const displayPhoneNumber = (phone: string) => {
    if (!phone) return ''
    const digits = phone.replace(/\D/g, '')
    if (digits.startsWith('254') && digits.length === 12) {
      return `+254 ${digits.substring(3, 6)} ${digits.substring(6, 9)} ${digits.substring(9)}`
    }
    return phone
  }

  const initiateSTKPush = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your M-Pesa phone number')
      return
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Please enter a valid Kenyan M-Pesa number (07XX XXX XXX or 01XX XXX XXX)')
      return
    }

    if (!orderInfo.email || !orderInfo.firstName || !orderInfo.city) {
      toast.error('Please fill in all customer information')
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/payment/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace(/\D/g, ''),
          amount: Math.round(total),
          accountReference: `SHOPJR${Date.now()}`,
          transactionDesc: 'Luxury Culture Purchase',
          orderInfo: {
            ...orderInfo,
            phone: phoneNumber.replace(/\D/g, ''),
            items: items.map(item => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              size: item.size,
              image: item.image
            }))
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        // Store order number for success page
        if (data.data?.orderNumber) {
          localStorage.setItem('lastOrderNumber', data.data.orderNumber)
        }

        // Check if database was unavailable
        if (data.data?.dbWarning) {
          toast(data.data.dbWarning, {
            icon: '⚠️',
            duration: 6000
          })
        }

        if (data.data?.isSimulation) {
          // Simulation mode - payment completed immediately
          toast.success(`Payment successful! Order: ${data.data.orderNumber}`)
          onSuccess()
          window.location.href = '/order/success'
        } else {
          // Real M-Pesa - STK Push sent
          setIsSTKSent(true)
          setOrderNumber(data.data?.orderNumber || '')
          toast.success('STK Push sent! Check your phone to complete payment.')
          
          // Poll for payment confirmation (for simulation/demo)
          setTimeout(() => {
            checkPaymentStatus(data.data?.MerchantRequestID)
          }, 30000)
        }
      } else {
        // Show specific error message from backend
        let errorMessage = data.error || 'Failed to initiate payment. Please check your details and try again.'
        
        // Add debugging info in development
        if (process.env.NODE_ENV !== 'production' && data.debug) {
          console.error('Payment error debug:', data.debug)
        }
        
        toast.error(errorMessage, {
          duration: 5000,
          style: {
            padding: '16px',
            borderRadius: '8px',
          }
        })
      }

    } catch (error) {
      console.error('STK Push error:', error)
      toast.error('Network error. Please check your connection and try again.', {
        duration: 5000
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const checkPaymentStatus = async (merchantRequestId: string) => {
    try {
      // For demo purposes, check if order was updated
      if (merchantRequestId) {
        toast.success('Payment may have been confirmed. Please check your order status.')
      }
    } catch (error) {
      console.error('Status check error:', error)
    }
  }

  const handleResendSTK = () => {
    setIsSTKSent(false)
    setIsProcessing(false)
  }

  if (isSTKSent) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
          <Smartphone size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">STK Push Sent!</h3>
          <p className="text-sm">
            Please check your M-Pesa and enter your PIN to complete the payment of{' '}
            <strong>${total.toLocaleString()}</strong>
          </p>
          {orderNumber && (
            <p className="text-xs mt-2 opacity-75">
              Order Number: {orderNumber}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Instructions:</h4>
            <ol className="text-sm text-left space-y-1">
              <li>1. Check your phone for an M-Pesa SMS</li>
              <li>2. Enter your M-Pesa PIN when prompted</li>
              <li>3. Confirm the transaction details</li>
              <li>4. Your order will be processed automatically</li>
            </ol>
          </div>
          
          <Button 
            onClick={handleResendSTK} 
            variant="outline" 
            disabled={isProcessing}
          >
            Resend STK Push
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* M-Pesa Information */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-green-600 text-white p-2 rounded">
            <Smartphone size={20} />
          </div>
          <div>
            <h3 className="font-bold text-green-800">M-Pesa (Lipa na M-Pesa)</h3>
            <p className="text-sm text-green-700">Pay securely with your mobile money</p>
          </div>
        </div>
        <p className="text-sm text-green-700">
          You'll receive an STK push on your phone to complete the payment. 
          Make sure you have sufficient M-Pesa balance.
        </p>
      </div>

      {/* Phone Number Input */}
      <div>
        <label className="block text-sm font-medium text-secondary mb-2">
          M-Pesa Phone Number *
        </label>
        <div className="relative">
          <input
            type="tel"
            value={displayPhoneNumber(phoneNumber)}
            onChange={handlePhoneChange}
            placeholder="07XX XXX XXX or 01XX XXX XXX"
            className="input-primary pl-12"
            maxLength={17}
            required
          />
          <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
        </div>
        <p className="text-xs text-secondary-600 mt-1">
          Enter the phone number registered with M-Pesa
        </p>
      </div>

      {/* Payment Summary */}
      <div className="bg-secondary-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Payment Summary</h4>
        <div className="flex justify-between text-sm">
          <span>Total Amount:</span>
          <span className="font-bold">${total.toLocaleString()}</span>
        </div>
        <div className="text-xs text-secondary-600 mt-1">
          Items: {items.length}
        </div>
      </div>

      {/* Pay Button */}
      <Button
        onClick={initiateSTKPush}
        disabled={isProcessing || !phoneNumber}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Initiating Payment...
          </>
        ) : (
          <>
            <Smartphone className="mr-2 h-4 w-4" />
            Pay ${total.toLocaleString()} with M-Pesa
          </>
        )}
      </Button>

      {/* Security Notice */}
      <div className="text-center text-xs text-secondary-600">
        <p>
          🔒 Your payment is secured by Safaricom M-Pesa infrastructure
        </p>
        <p className="mt-1">
          This is a secure transaction. We never store your M-Pesa PIN or sensitive information.
        </p>
      </div>
    </div>
  )
}

