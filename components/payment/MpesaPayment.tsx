'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Smartphone, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

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
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSTKSent, setIsSTKSent] = useState(false)

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Handle different input formats
    if (digits.startsWith('254')) {
      return `+${digits}`
    } else if (digits.startsWith('0')) {
      return `+254${digits.substring(1)}`
    } else if (digits.length === 9) {
      return `+254${digits}`
    }
    return digits
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const initiateSTKPush = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your M-Pesa phone number')
      return
    }

    // Validate phone number format
    const phoneRegex = /^(\+254|0)[17]\d{8}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      toast.error('Please enter a valid Kenyan phone number')
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/payment/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace(/\s/g, ''),
          amount: Math.round(total),
          accountReference: `SHOPJR${Date.now()}`,
          transactionDesc: 'Luxury Culture Online Purchase'
        })
      })

      const data = await response.json()

      if (data.success) {
        setIsSTKSent(true)
        toast.success('STK Push sent! Check your phone to complete payment.')
      } else {
        toast.error(data.error || 'Failed to initiate payment')
      }

    } catch (error) {
      console.error('STK Push error:', error)
      toast.error('Failed to initiate M-Pesa payment. Please try again.')
    } finally {
      setIsProcessing(false)
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
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="+254 7XX XXX XXX or 07XX XXX XXX"
            className="input-primary pl-12"
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
