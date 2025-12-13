// M-Pesa Callback API Route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json()
    
    console.log('M-Pesa Callback received:', callbackData)

    // Extract callback data
    const { Body } = callbackData
    
    if (!Body) {
      return NextResponse.json(
        { error: 'Invalid callback data' },
        { status: 400 }
      )
    }

    const { stkCallback } = Body
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback

    console.log('STK Callback details:', {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata
    })

    // Process the callback based on result code
    if (ResultCode === 0) {
      // Payment successful
      const metadata = CallbackMetadata?.Item || []
      
      // Extract transaction details
      const transactionDetails = metadata.reduce((acc: any, item: any) => {
        acc[item.Name] = item.Value
        return acc
      }, {})

      console.log('Transaction successful:', {
        merchantRequest: MerchantRequestID,
        checkoutRequest: CheckoutRequestID,
        amount: transactionDetails.Amount,
        mpesaReceipt: transactionDetails.MpesaReceiptNumber,
        phoneNumber: transactionDetails.PhoneNumber,
        transactionDate: transactionDetails.TransactionDate
      })

      // In a real implementation, you would:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Trigger order fulfillment process
      // 4. Log transaction for audit purposes

      // Simulate order update
      const orderUpdate = {
        orderId: MerchantRequestID,
        status: 'paid',
        paymentMethod: 'mpesa',
        transactionId: transactionDetails.MpesaReceiptNumber,
        amount: transactionDetails.Amount,
        phoneNumber: transactionDetails.PhoneNumber,
        timestamp: transactionDetails.TransactionDate
      }

      console.log('Order updated:', orderUpdate)

      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: 'Success'
      })

    } else {
      // Payment failed or cancelled
      console.log('Payment failed:', {
        ResultCode,
        ResultDesc,
        MerchantRequestID,
        CheckoutRequestID
      })

      // In a real implementation, you would:
      // 1. Update order status to 'failed'
      // 2. Notify customer of failed payment
      // 3. Log failure for audit

      return NextResponse.json({
        ResultCode,
        ResultDesc
      })
    }

  } catch (error) {
    console.error('M-Pesa callback error:', error)
    
    // Return error response to Safaricom
    return NextResponse.json({
      ResultCode: 1,
      ResultDesc: 'Internal server error'
    }, { status: 500 })
  }
}

// Handle validation requests (optional - for security)
export async function GET(request: NextRequest) {
  // This endpoint can be used for validation if needed
  const { searchParams } = new URL(request.url)
  const accountReference = searchParams.get('accountReference')
  
  console.log('M-Pesa validation request:', { accountReference })
  
  // In real implementation, you would validate the transaction
  return NextResponse.json({
    ResultCode: 0,
    ResultDesc: 'Account reference valid'
  })
}
