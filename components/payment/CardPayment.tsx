'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CreditCard, Lock, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

interface CardPaymentProps {
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

export function CardPayment({ total, orderInfo, onSuccess }: CardPaymentProps) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.substring(0, 2) + '/' + digits.substring(2, 4)
    }
    return digits
  }

  const handleCardChange = (field: string, value: string) => {
    let formattedValue = value
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4)
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }))
  }

  const luhnCheck = (cardNumber: string) => {
    const digits = cardNumber.replace(/\s/g, '')
    let sum = 0
    let isEven = false
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i])
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
      isEven = !isEven
    }
    return sum % 10 === 0
  }

  const getCardBrand = (cardNumber: string) => {
    const digits = cardNumber.replace(/\s/g, '')
    if (/^4/.test(digits)) return 'Visa'
    if (/^5[1-5]/.test(digits)) return 'Mastercard'
    if (/^3[47]/.test(digits)) return 'American Express'
    return 'Unknown'
  }

  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvc, cardholderName } = cardDetails
    
    if (!cardholderName.trim()) {
      toast.error('Please enter the cardholder name')
      return false
    }
    
    const cleanCardNumber = cardNumber.replace(/\s/g, '')
    if (cleanCardNumber.length < 15 || cleanCardNumber.length > 16) {
      toast.error('Please enter a valid card number')
      return false
    }
    
    if (!luhnCheck(cleanCardNumber)) {
      toast.error('Invalid card number')
      return false
    }
    
    if (!expiryDate.includes('/') || expiryDate.length !== 5) {
      toast.error('Please enter a valid expiry date (MM/YY)')
      return false
    }
    
    const [month, year] = expiryDate.split('/')
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
    
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      toast.error('Please enter a valid expiry month')
      return false
    }
    
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      toast.error('Card has expired')
      return false
    }
    
    const cardBrand = getCardBrand(cleanCardNumber)
    const expectedCvcLength = cardBrand === 'American Express' ? 4 : 3
    if (cvc.length !== expectedCvcLength) {
      toast.error(`Please enter a valid ${expectedCvcLength}-digit CVC`)
      return false
    }
    
    return true
  }

  const processPayment = async () => {
    if (!validateCardDetails()) {
      return
    }

    setIsProcessing(true)

    try {
      const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, '')
      const paymentData = {
        amount: Math.round(total * 100),
        currency: 'KES',
        card: {
          number: cleanCardNumber,
          exp_month: parseInt(cardDetails.expiryDate.split('/')[0]),
          exp_year: parseInt('20' + cardDetails.expiryDate.split('/')[1]),
          cvc: cardDetails.cvc,
          name: cardDetails.cardholderName,
          brand: getCardBrand(cleanCardNumber)
        },
        billing_details: {
          name: cardDetails.cardholderName,
          email: orderInfo.email,
          phone: orderInfo.phone,
          address: {
            line1: orderInfo.address,
            city: orderInfo.city,
            country: 'KE'
          }
        },
        orderInfo
      }

      const response = await fetch('/api/payment/stripe/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Payment processed successfully!')
        onSuccess()
        window.location.href = '/order/success'
      } else {
        toast.error(result.error || 'Payment failed. Please try again.')
      }

    } catch (error) {
      console.error('Card payment error:', error)
      toast.error('Payment failed. Please check your card details and try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Card Payment Information */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-blue-600 text-white p-2 rounded">
            <CreditCard size={20} />
          </div>
          <div>
            <h3 className="font-bold text-blue-800">Credit/Debit Card</h3>
            <p className="text-sm text-blue-700">Secure card payment powered by Stripe</p>
          </div>
        </div>
        <p className="text-sm text-blue-700">
          We accept Visa, Mastercard, American Express, and other major cards. 
          Your payment information is encrypted and secure.
        </p>
      </div>

      {/* Card Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-secondary mb-2">
            Cardholder Name *
          </label>
          <input
            type="text"
            value={cardDetails.cardholderName}
            onChange={(e) => handleCardChange('cardholderName', e.target.value)}
            placeholder="John Doe"
            className="input-primary"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-secondary mb-2">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => handleCardChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19} // 16 digits + 3 spaces
              className="input-primary pl-12"
              required
            />
            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Expiry Date *
          </label>
          <input
            type="text"
            value={cardDetails.expiryDate}
            onChange={(e) => handleCardChange('expiryDate', e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            className="input-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            CVC *
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardDetails.cvc}
              onChange={(e) => handleCardChange('cvc', e.target.value)}
              placeholder="123"
              maxLength={4}
              className="input-primary pl-12"
              required
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-secondary-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Payment Summary</h4>
        <div className="flex justify-between text-sm">
          <span>Total Amount:</span>
          <span className="font-bold">KSh {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Processing Fee:</span>
          <span>KSh 0</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-secondary-200 pt-2 mt-2">
          <span>Final Amount:</span>
          <span>KSh {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Pay Button */}
      <Button
        onClick={processPayment}
        disabled={isProcessing || !cardDetails.cardholderName || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvc}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay KSh {total.toLocaleString()} with Card
          </>
        )}
      </Button>

      {/* Security Notice */}
      <div className="text-center text-xs text-secondary-600">
        <p>
          🔒 Your payment is secured by 256-bit SSL encryption
        </p>
        <p className="mt-1">
          Card information is processed securely by Stripe and never stored on our servers
        </p>
      </div>

      {/* Accepted Cards */}
      <div className="flex justify-center items-center space-x-4 text-xs text-secondary-500">
        <span>Accepted:</span>
        <div className="flex space-x-2">
          <span className="bg-secondary-100 px-2 py-1 rounded">VISA</span>
          <span className="bg-secondary-100 px-2 py-1 rounded">MC</span>
          <span className="bg-secondary-100 px-2 py-1 rounded">AMEX</span>
        </div>
      </div>
    </div>
  )
}
