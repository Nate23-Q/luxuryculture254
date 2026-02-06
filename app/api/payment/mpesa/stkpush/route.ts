// M-Pesa STK Push API Route
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import Order from '@/models/Order'

const MPESA_BASE_URL = process.env.MPESA_ENVIRONMENT === 'production' 
  ? 'https://api.safaricom.co.ke' 
  : 'https://sandbox.safaricom.co.ke'

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET
const USE_REAL_MPESA = MPESA_CONSUMER_KEY && MPESA_CONSUMER_SECRET && 
                       !MPESA_CONSUMER_KEY.includes('your_consumer_key')

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { phoneNumber, amount, accountReference, transactionDesc, orderInfo } = await request.json()

    if (!phoneNumber || !amount || !accountReference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate phone number format
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    if (!cleanPhone.startsWith('254') || cleanPhone.length !== 12) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Use 254XXXXXXXXX' },
        { status: 400 }
      )
    }

    // Validate amount
    if (amount < 1 || amount > 150000) {
      return NextResponse.json(
        { error: 'Amount must be between KES 1 and KES 150,000' },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // Calculate order breakdown
    const subtotal = amount
    const shipping = subtotal > 5000 ? 0 : 500
    const taxRate = 0.16
    const taxAmount = (subtotal * taxRate) / (1 + taxRate)
    const totalAmount = Math.round(amount)

    // Create pending order in database
    const order = await Order.create({
      orderNumber,
      customer: {
        email: orderInfo?.email || `${cleanPhone}@mpesa.ke`,
        firstName: orderInfo?.firstName || 'M-Pesa',
        lastName: orderInfo?.lastName || 'Customer',
        phone: cleanPhone,
        address: orderInfo?.address || 'N/A',
        city: orderInfo?.city || 'Nairobi',
        country: orderInfo?.country || 'Kenya'
      },
      items: orderInfo?.items || [],
      subtotal,
      shipping,
      tax: taxAmount,
      total: totalAmount,
      paymentMethod: 'mpesa',
      paymentStatus: 'processing',
      orderStatus: 'pending',
      paymentReference: `STK-${Date.now()}`
    })

    console.log('✅ Order created:', order.orderNumber)

    // Real M-Pesa Integration
    if (USE_REAL_MPESA) {
      try {
        // Generate access token
        const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64')
        
        const tokenResponse = await fetch(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`
          }
        })
        
        if (!tokenResponse.ok) {
          throw new Error('Failed to generate M-Pesa access token')
        }
        
        const tokenData = await tokenResponse.json()
        const accessToken = tokenData.access_token

        // Prepare STK Push request
        const shortcode = process.env.MPESA_BUSINESS_SHORT_CODE
        const passkey = process.env.MPESA_PASSKEY
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

        const stkPushRequest = {
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: totalAmount,
          PartyA: cleanPhone,
          PartyB: shortcode,
          PhoneNumber: cleanPhone,
          CallBackURL: process.env.MPESA_CALLBACK_URL || `${process.env.NEXTAUTH_URL}/api/payment/mpesa/callback`,
          AccountReference: orderNumber,
          TransactionDesc: transactionDesc || `Payment for order ${orderNumber}`
        }

        const stkResponse = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(stkPushRequest)
        })
        
        const stkData = await stkResponse.json()

        if (stkData.ResponseCode === '0') {
          // Update order with M-Pesa reference
          await Order.findByIdAndUpdate(order._id, {
            paymentReference: stkData.MerchantRequestID
          })

          return NextResponse.json({
            success: true,
            data: {
              orderNumber: order.orderNumber,
              MerchantRequestID: stkData.MerchantRequestID,
              CheckoutRequestID: stkData.CheckoutRequestID,
              ResponseCode: stkData.ResponseCode,
              ResponseDescription: stkData.ResponseDescription,
              CustomerMessage: stkData.CustomerMessage
            },
            message: 'STK Push initiated. Check your phone to complete payment.'
          })
        } else {
          // Update order status to failed
          await Order.findByIdAndUpdate(order._id, {
            paymentStatus: 'failed',
            orderStatus: 'cancelled'
          })

          return NextResponse.json({
            success: false,
            error: stkData.errorMessage || stkData.ResponseDescription || 'STK Push failed',
            data: stkData
          }, { status: 400 })
        }
      } catch (mpesaError: any) {
        console.error('M-Pesa API error:', mpesaError)
        
        // Update order status
        await Order.findByIdAndUpdate(order._id, {
          paymentStatus: 'failed',
          orderStatus: 'cancelled'
        })

        return NextResponse.json(
          {
            success: false,
            error: mpesaError.message || 'M-Pesa service unavailable'
          },
          { status: 500 }
        )
      }
    }

    // Simulated M-Pesa (for testing without real credentials)
    console.log('🧪 Using simulated M-Pesa (no real credentials)')
    
    await new Promise(resolve => setTimeout(resolve, 2000))

    const simulatedResponse = {
      MerchantRequestID: `MR-${Date.now()}`,
      CheckoutRequestID: `CR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ResponseCode: '0',
      ResponseDescription: 'Success. Request accepted for processing',
      CustomerMessage: 'Success. Request accepted for processing'
    }

    // Update order with simulated payment reference
    await Order.findByIdAndUpdate(order._id, {
      paymentReference: simulatedResponse.MerchantRequestID,
      paymentStatus: 'completed',
      orderStatus: 'confirmed',
      mpesaReceiptNumber: `SIM${Date.now()}`
    })

    return NextResponse.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        ...simulatedResponse,
        isSimulation: true
      },
      message: 'Payment successful (simulated). Order confirmed!'
    })

  } catch (error) {
    console.error('STK Push error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to initiate STK Push'
      },
      { status: 500 }
    )
  }
}

