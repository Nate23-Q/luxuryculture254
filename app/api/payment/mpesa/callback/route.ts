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

      // Find and update order by MerchantRequestID (stored as paymentReference)
      try {
        const updatedOrder = await Order.findOneAndUpdate(
          { paymentReference: MerchantRequestID },
          {
            paymentStatus: 'completed',
            orderStatus: 'confirmed',
            mpesaReceiptNumber: receiptNumber,
            $set: { updatedAt: new Date() }
          },
          { new: true }
        )

        if (updatedOrder) {
          console.log('✅ Order updated:', updatedOrder.orderNumber)
          return NextResponse.json({ 
            ResultCode: 0, 
            ResultDesc: 'Success',
            data: {
              orderNumber: updatedOrder.orderNumber,
              amount,
              receiptNumber,
              phoneNumber
            }
          })
        } else {
          // Order not found - log for manual review
          console.warn('⚠️ Order not found for MerchantRequestID:', MerchantRequestID)
          // Still return success to M-Pesa to prevent retry
          return NextResponse.json({ 
            ResultCode: 0, 
            ResultDesc: 'Success',
            data: {
              amount,
              receiptNumber,
              phoneNumber,
              warning: 'Order not found'
            }
          })
        }
      } catch (dbError: any) {
        console.error('Database error updating order:', dbError)
        // Still return success to M-Pesa
        return NextResponse.json({ 
          ResultCode: 0, 
          ResultDesc: 'Success',
          data: {
            amount,
            receiptNumber,
            phoneNumber,
            dbError: dbError.message
          }
        })
      }

    } else {
      console.log('❌ Payment Failed:', { ResultCode, ResultDesc })
      
      // Try to update order status to failed
      try {
        await Order.findOneAndUpdate(
          { paymentReference: MerchantRequestID },
          {
            paymentStatus: 'failed',
            orderStatus: 'cancelled'
          }
        )
        console.log('Order marked as failed for MerchantRequestID:', MerchantRequestID)
      } catch (dbError: any) {
        console.error('Error updating failed order:', dbError)
      }
      
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

