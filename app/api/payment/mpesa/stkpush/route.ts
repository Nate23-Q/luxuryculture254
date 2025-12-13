// M-Pesa STK Push API Route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc, callbackUrl, orderInfo } = await request.json()

    console.log('STK Push Request:', {
      phoneNumber,
      amount,
      accountReference,
      transactionDesc,
      orderInfo
    })

    // Validate required fields
    if (!phoneNumber || !amount || !accountReference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate M-Pesa access token (in real implementation)
    const generateAccessToken = async () => {
      const consumerKey = process.env.MPESA_CONSUMER_KEY
      const consumerSecret = process.env.MPESA_CONSUMER_SECRET
      const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
      
      try {
        const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`
          }
        })
        const data = await response.json()
        return data.access_token
      } catch (error) {
        console.error('Error generating access token:', error)
        throw error
      }
    }

    // Initiate STK Push
    const initiateSTKPush = async () => {
      const accessToken = await generateAccessToken()
      const shortcode = process.env.MPESA_SHORTCODE || '174379'
      const passkey = process.env.MPESA_PASSKEY

      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
      const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

      const stkPushRequest = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: phoneNumber,
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL || `${request.nextUrl.origin}/api/payment/mpesa/callback`,
        AccountReference: accountReference,
        TransactionDesc: transactionDesc
      }

      try {
        const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(stkPushRequest)
        })
        
        const data = await response.json()
        return data
      } catch (error) {
        console.error('Error initiating STK push:', error)
        throw error
      }
    }

    // Simulate successful STK Push initiation
    const stkResponse = {
      MerchantRequestID: `SHOPJR-${Date.now()}`,
      CheckoutRequestID: `ws_co_${Date.now()}`,
      ResponseCode: '0',
      ResponseDescription: 'Success. Request accepted for processing',
      CustomerMessage: 'Success. Request accepted for processing'
    }

    // In real implementation, you would call:
    // const stkResponse = await initiateSTKPush()

    // Log the transaction for simulation
    console.log('STK Push Response:', stkResponse)

    return NextResponse.json({
      success: true,
      data: stkResponse,
      message: 'STK Push initiated successfully. Please check your phone to complete payment.'
    })

  } catch (error) {
    console.error('STK Push error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to initiate STK Push',
        message: 'Please try again or contact support'
      },
      { status: 500 }
    )
  }
}
