// M-Pesa Callback API Route
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import Order from '@/models/Order'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const callbackData = await request.json()
    console.log('M-Pesa Callback:', JSON.stringify(callbackData, null, 2))

    const { Body } = callbackData
    if (!Body?.stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid callback data' })
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback

    if (ResultCode === 0) {
      // Payment successful
      const metadata = CallbackMetadata?.Item || []
      const transactionDetails = metadata.reduce((acc: any, item: any) => {
        acc[item.Name] = item.Value
        return acc
      }, {})

      const amount = transactionDetails.Amount
      const receiptNumber = transactionDetails.MpesaReceiptNumber
      const phoneNumber = transactionDetails.PhoneNumber

      console.log('✅ Payment Success:', {
        merchantRequest: MerchantRequestID,
        checkoutRequest: CheckoutRequestID,
        amount,
        receipt: receiptNumber,
        phone: phoneNumber
      })

      // Try to find and update order by MerchantRequestID or CheckoutRequestID
      // For now, we'll log the successful payment
      // In production, you would store the MerchantRequestID when initiating STK Push
      // and use it to find the corresponding order

      return NextResponse.json({ 
        ResultCode: 0, 
        ResultDesc: 'Success',
        data: {
          amount,
          receiptNumber,
          phoneNumber
        }
      })

    } else {
      console.log('❌ Payment Failed:', { ResultCode, ResultDesc })
      
      return NextResponse.json({ 
        ResultCode: 1, 
        ResultDesc: ResultDesc || 'Payment failed' 
      })
    }

  } catch (error: any) {
    console.error('Callback error:', error)
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Error processing callback' })
  }
}

