// M-Pesa STK Push API Route
import { NextRequest, NextResponse } from 'next/server'

const MPESA_BASE_URL = process.env.MPESA_ENVIRONMENT === 'production' 
  ? 'https://api.safaricom.co.ke' 
  : 'https://sandbox.safaricom.co.ke'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = await request.json()

    // Validate required fields
    if (!phoneNumber || !amount || !accountReference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate access token
    const generateAccessToken = async () => {
      const consumerKey = process.env.MPESA_CONSUMER_KEY
      const consumerSecret = process.env.MPESA_CONSUMER_SECRET
      const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
      
      const response = await fetch(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`
        }
      })
      const data = await response.json()
      return data.access_token
    }

    // Initiate STK Push
    const accessToken = await generateAccessToken()
    const shortcode = process.env.MPESA_BUSINESS_SHORT_CODE
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
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc || 'Payment for order'
    }

    const response = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stkPushRequest)
    })
    
    const data = await response.json()

    if (data.ResponseCode === '0') {
      return NextResponse.json({
        success: true,
        data,
        message: 'STK Push initiated. Check your phone to complete payment.'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: data.errorMessage || 'STK Push failed',
        data
      }, { status: 400 })
    }

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
