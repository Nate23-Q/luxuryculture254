// PayPal Capture Order API Route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { orderID, orderInfo } = await request.json()
    
    console.log('PayPal Capture Order Request:', { orderID, orderInfo })

    // Validate required fields
    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use PayPal SDK:
    /*
    const paypal = require('@paypal/checkout-server-sdk')
    
    // Create PayPal environment
    const environment = process.env.PAYPAL_MODE === 'live' 
      ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
      : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
    
    const client = new paypal.core.PayPalHttpClient(environment)
    
    // Capture order request
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})
    
    const response = await client.execute(request)
    return NextResponse.json(response.result)
    */

    // Simulate PayPal order capture
    const simulatedCapture = {
      id: orderID,
      status: 'COMPLETED',
      payer: {
        payer_id: `PAYER-${Date.now()}`,
        email_address: orderInfo?.email || 'customer@example.com',
        name: {
          given_name: orderInfo?.firstName || 'John',
          surname: orderInfo?.lastName || 'Doe'
        },
        phone: {
          phone_number: {
            national_number: orderInfo?.phone || '254700000000'
          }
        }
      },
      purchase_units: [{
        reference_id: `PUHF-${Date.now()}`,
        amount: {
          currency_code: 'USD',
          value: '50.00', // Would be actual amount from original order
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: '50.00'
            }
          }
        },
        payments: {
          captures: [{
            id: `CAP-${Date.now()}`,
            status: 'COMPLETED',
            amount: {
              currency_code: 'USD',
              value: '50.00'
            },
            seller_protection: {
              status: 'ELIGIBLE',
              dispute_categories: [
                'ITEM_NOT_RECEIVED',
                'UNAUTHORIZED_TRANSACTION'
              ]
            },
            final_capture: true,
            create_time: new Date().toISOString(),
            update_time: new Date().toISOString()
          }]
        }
      }],
      payer_id: `PAYER-${Date.now()}`,
      payment_source: {
        paypal: {
          email_address: orderInfo?.email || 'customer@example.com',
          account_id: `PA-${Date.now()}`,
          account_status: 'VERIFIED',
          name: {
            given_name: orderInfo?.firstName || 'John',
            surname: orderInfo?.lastName || 'Doe'
          },
          address: {
            country_code: 'KE',
            address_line_1: orderInfo?.address || '123 Test Street',
            admin_area_2: orderInfo?.city || 'Nairobi',
            country_code_type: 'ISO'
          }
        }
      },
      create_time: new Date(Date.now() - 30000).toISOString(), // Order creation time
      update_time: new Date().toISOString(), // Capture time
      links: [
        {
          href: `https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}`,
          rel: 'self',
          method: 'GET'
        }
      ]
    }

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate random success/failure for testing (95% success rate)
    const isSuccess = Math.random() > 0.05
    
    if (isSuccess) {
      console.log('PayPal payment captured successfully:', {
        orderId: simulatedCapture.id,
        status: simulatedCapture.status,
        payerId: simulatedCapture.payer.payer_id,
        captureId: simulatedCapture.purchase_units[0].payments.captures[0].id,
        amount: simulatedCapture.purchase_units[0].amount.value,
        currency: simulatedCapture.purchase_units[0].amount.currency_code
      })

      // In real implementation, you would:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Trigger fulfillment process
      // 4. Log transaction for audit
      // 5. Save PayPal transaction details for refunds/disputes

      const orderUpdate = {
        orderId: simulatedCapture.id,
        status: 'paid',
        paymentMethod: 'paypal',
        transactionId: simulatedCapture.purchase_units[0].payments.captures[0].id,
        payerId: simulatedCapture.payer.payer_id,
        amount: simulatedCapture.purchase_units[0].amount.value,
        currency: simulatedCapture.purchase_units[0].amount.currency_code,
        email: simulatedCapture.payer.email_address,
        timestamp: simulatedCapture.update_time,
        payerProtection: simulatedCapture.purchase_units[0].payments.captures[0].seller_protection
      }

      console.log('Order updated after PayPal capture:', orderUpdate)

      return NextResponse.json({
        success: true,
        orderID: simulatedCapture.id,
        status: simulatedCapture.status,
        payer: simulatedCapture.payer,
        purchase_units: simulatedCapture.purchase_units,
        payment_source: simulatedCapture.payment_source,
        create_time: simulatedCapture.create_time,
        update_time: simulatedCapture.update_time,
        message: 'Payment captured successfully'
      })
    } else {
      // Simulate capture failure
      const errors = [
        'INSTRUMENT_DECLINED',
        'PAYMENT_CANNOT_BE_COMPLETED',
        'PAYMENT_EXPIRED',
        'PAYMENT_APPROVAL_EXPIRED',
        'ORDER_ALREADY_CAPTURED'
      ]
      const randomError = errors[Math.floor(Math.random() * errors.length)]

      console.log('PayPal capture failed:', {
        error: randomError,
        orderId: simulatedCapture.id
      })

      return NextResponse.json(
        {
          success: false,
          error: randomError,
          message: 'Payment could not be completed. Please try again or choose another payment method.',
          details: 'The payment was declined by the payment provider.'
        },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('PayPal capture order error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'PAYMENT_PROCESSING_ERROR',
        message: 'An error occurred while processing your payment. Please try again.',
        details: 'Please check your PayPal account and try again.'
      },
      { status: 500 }
    )
  }
}

// Handle refund requests
export async function PUT(request: NextRequest) {
  try {
    const { captureId, amount, reason } = await request.json()

    console.log('PayPal Refund Request:', { captureId, amount, reason })

    if (!captureId) {
      return NextResponse.json(
        { error: 'Capture ID is required for refund' },
        { status: 400 }
      )
    }

    // In real implementation, you would use PayPal SDK to process refund
    /*
    const paypal = require('@paypal/checkout-server-sdk')
    const environment = process.env.PAYPAL_MODE === 'live' 
      ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
      : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
    
    const client = new paypal.core.PayPalHttpClient(environment)
    
    // Create refund request
    const request = new paypal.payments.CapturesRefundRequest(captureId)
    request.requestBody({
      amount: {
        value: amount,
        currency_code: 'USD'
      },
      note_to_payer: reason
    })
    
    const response = await client.execute(request)
    return NextResponse.json(response.result)
    */

    // Simulate refund processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const simulatedRefund = {
      id: `REF-${Date.now()}`,
      status: 'COMPLETED',
      amount: {
        currency_code: 'USD',
        value: amount || '50.00'
      },
      capture_id: captureId,
      seller_protection: {
        status: 'NOT_ELIGIBLE'
      },
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString(),
      note_to_payer: reason || 'Refund requested by customer'
    }

    console.log('PayPal refund processed:', simulatedRefund)

    return NextResponse.json({
      success: true,
      refund: simulatedRefund,
      message: 'Refund processed successfully'
    })

  } catch (error) {
    console.error('PayPal refund error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'REFUND_PROCESSING_ERROR',
        message: 'Failed to process refund. Please contact support.'
      },
      { status: 500 }
    )
  }
}
