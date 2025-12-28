// M-Pesa Callback API Route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
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

      console.log('Payment Success:', {
        merchantRequest: MerchantRequestID,
        amount: transactionDetails.Amount,
        receipt: transactionDetails.MpesaReceiptNumber,
        phone: transactionDetails.PhoneNumber
      })

      // TODO: Update order status in database
      // TODO: Send confirmation email
      // TODO: Trigger fulfillment

    } else {
      console.log('Payment Failed:', { ResultCode, ResultDesc })
      // TODO: Update order status to failed
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' })

  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Error' })
  }
}
