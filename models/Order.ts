import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  image: string
}

export interface IOrder extends Document {
  orderNumber: string
  customer: {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    country: string
  }
  items: IOrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethod: 'mpesa' | 'card' | 'paypal' | 'paystack'
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed'
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentReference?: string
  mpesaReceiptNumber?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true },
  image: { type: String, required: true }
}, { _id: false })

const OrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['mpesa', 'card', 'paypal', 'paystack'], 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed'], 
    default: 'pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  paymentReference: { type: String },
  mpesaReceiptNumber: { type: String }
}, { timestamps: true })

// Generate unique order number
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  }
  next()
})

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export default Order

