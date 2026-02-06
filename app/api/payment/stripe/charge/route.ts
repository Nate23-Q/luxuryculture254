// Stripe Payment API Route
import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const USE_REAL_STRIPE = STRIPE_SECRET_KEY && STRIPE_SECRET_KEY.startsWith('sk_')

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, card, billing_details, orderInfo } = await request.json()

    if (!amount || !card || !billing_details) {
      return NextResponse.json(
        { error: 'Missing required payment data' },
        { status: 400 }
      )
    }

    // Real Stripe Integration
    if (USE_REAL_STRIPE) {
      try {
        const stripe = require('stripe')(STRIPE_SECRET_KEY)
        
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: currency.toLowerCase(),
          payment_method_types: ['card'],
          payment_method_data: {
            type: 'card',
            card: {
              number: card.number,
              exp_month: card.exp_month,
              exp_year: card.exp_year,
              cvc: card.cvc
            },
            billing_details: {
              name: billing_details.name,
              email: billing_details.email,
              phone: billing_details.phone,
              address: billing_details.address
            }
          },
          confirm: true,
          metadata: {
            orderId: `ORDER-${Date.now()}`,
            customerEmail: billing_details.email,
            customerName: billing_details.name
          }
        })

        if (paymentIntent.status === 'succeeded') {
          return NextResponse.json({
            success: true,
            paymentIntent: {
              id: paymentIntent.id,
              status: paymentIntent.status,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency
            },
            message: 'Payment processed successfully'
          })
        } else {
          return NextResponse.json(
            {
              success: false,
              error: 'Payment requires additional action',
              paymentIntent: {
                id: paymentIntent.id,
                status: paymentIntent.status
              }
            },
            { status: 400 }
          )
        }
      } catch (stripeError: any) {
        console.error('Stripe error:', stripeError)
        return NextResponse.json(
          {
            success: false,
            error: stripeError.message || 'Payment failed',
            code: stripeError.code
          },
          { status: 400 }
        )
      }
    }

    // Simulated Payment (for testing without real Stripe keys)
    console.log('Using simulated payment (no real Stripe key configured)')
    
    const simulatedPayment = {
      id: `pi_sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount,
      currency: currency,
      status: 'succeeded',
      created: Math.floor(Date.now() / 1000),
      payment_method: {
        type: 'card',
        card: {
          brand: card.brand || 'visa',
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
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    const isSuccess = Math.random() > 0.1
    
    if (isSuccess) {
      return NextResponse.json({
        success: true,
        paymentIntent: {
          id: simulatedPayment.id,
          status: 'succeeded',
          amount: simulatedPayment.amount,
          currency: simulatedPayment.currency,
          payment_method: simulatedPayment.payment_method
        },
        message: 'Payment processed successfully (simulated)'
      })
    } else {
      const errors = [
        'Your card was declined.',
        'Your card has insufficient funds.',
        'Your card has expired.',
        'Your card number is incorrect.'
      ]
      return NextResponse.json(
        {
          success: false,
          error: errors[Math.floor(Math.random() * errors.length)],
          code: 'card_declined'
        },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Payment processing failed',
        code: 'processing_error'
      },
      { status: 500 }
    )
  }
}
