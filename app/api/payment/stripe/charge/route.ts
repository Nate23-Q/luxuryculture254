// Stripe Payment API Route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, card, billing_details, orderInfo } = await request.json()

    console.log('Stripe Payment Request:', {
      amount,
      currency,
      billing_details: {
        ...billing_details,
        email: billing_details.email // masked for security
      },
      orderInfo
    })

    // Validate required fields
    if (!amount || !card || !billing_details) {
      return NextResponse.json(
        { error: 'Missing required payment data' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use Stripe SDK:
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: currency.toLowerCase(),
      payment_method_types: ['card'],
      confirmation_method: 'manual',
      confirm: true,
      payment_method_data: {
        type: 'card',
        card: {
          number: card.number,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          cvc: card.cvc
        }
      },
      billing_details: billing_details,
      metadata: {
        orderId: orderInfo.orderId || `ORDER-${Date.now()}`,
        customerEmail: billing_details.email,
        customerName: billing_details.name
      }
    })

    return NextResponse.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret
      }
    })
    */

    // Simulate Stripe payment processing
    const simulatedPayment = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount,
      currency: currency,
      status: 'succeeded', // or 'requires_action' for 3D Secure
      created: Math.floor(Date.now() / 1000),
      payment_method: {
        type: 'card',
        card: {
          brand: 'visa', // Would be determined by Stripe
          last4: card.number.slice(-4),
          exp_month: card.exp_month,
          exp_year: card.exp_year
        }
      },
      billing_details: {
        name: billing_details.name,
        email: billing_details.email,
        phone: billing_details.phone,
        address: billing_details.address
      },
      metadata: {
        orderId: `ORDER-${Date.now()}`,
        source: 'shop-jr-web',
        paymentMethod: 'card'
      }
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate random success/failure for testing (90% success rate)
    const isSuccess = Math.random() > 0.1
    
    if (isSuccess) {
      console.log('Payment successful:', {
        paymentIntentId: simulatedPayment.id,
        amount: simulatedPayment.amount,
        currency: simulatedPayment.currency,
        last4: simulatedPayment.payment_method.card.last4
      })

      // In real implementation, you would:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Trigger fulfillment process
      // 4. Log transaction

      return NextResponse.json({
        success: true,
        paymentIntent: {
          id: simulatedPayment.id,
          status: 'succeeded',
          amount: simulatedPayment.amount,
          currency: simulatedPayment.currency,
          payment_method: simulatedPayment.payment_method,
          created: simulatedPayment.created
        },
        message: 'Payment processed successfully'
      })
    } else {
      // Simulate card declined or processing error
      const errors = [
        'Your card was declined.',
        'Your card has insufficient funds.',
        'Your card has expired.',
        'Your card number is incorrect.',
        'Processing error. Please try again.'
      ]
      const randomError = errors[Math.floor(Math.random() * errors.length)]

      console.log('Payment failed:', {
        error: randomError,
        paymentIntentId: simulatedPayment.id
      })

      return NextResponse.json(
        {
          success: false,
          error: randomError,
          code: 'card_declined',
          paymentIntent: {
            id: simulatedPayment.id,
            status: 'requires_payment_method'
          }
        },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Stripe payment error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Payment processing failed',
        message: 'An unexpected error occurred. Please try again.',
        code: 'processing_error'
      },
      { status: 500 }
    )
  }
}

// Handle payment method updates (for saved cards)
export async function PUT(request: NextRequest) {
  try {
    const { payment_method_id, customer_id } = await request.json()

    // In real implementation, you would use Stripe to update payment method
    console.log('Updating payment method:', { payment_method_id, customer_id })

    return NextResponse.json({
      success: true,
      message: 'Payment method updated successfully'
    })

  } catch (error) {
    console.error('Payment method update error:', error)
    return NextResponse.json(
      { error: 'Failed to update payment method' },
      { status: 500 }
    )
  }
}
