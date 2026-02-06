import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import Order from '@/models/Order'

// GET - Fetch orders
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const orderNumber = searchParams.get('orderNumber')
    const email = searchParams.get('email')

    if (orderNumber) {
      const order = await Order.findOne({ orderNumber })
      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ order })
    }

    if (email) {
      const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 })
      return NextResponse.json({ orders })
    }

    return NextResponse.json(
      { error: 'Please provide orderNumber or email' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const orderData = await request.json()

    // Generate order number if not provided
    if (!orderData.orderNumber) {
      orderData.orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    }

    const order = await Order.create(orderData)

    return NextResponse.json(
      { 
        success: true, 
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          total: order.total,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

