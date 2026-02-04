export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  brand: string
  category: 'sneakers' | 'boots' | 'lifestyle' | 'footwear'
  gender: 'men' | 'women' | 'unisex'
  sizes: string[]
  colors: string[]
  images: string[]
  inStock: boolean
  isOnSale?: boolean
  isBestseller?: boolean
  isNewArrival?: boolean
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  size: string
  color: string
  image: string
  quantity: number
  brand: string
  slug: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  addresses: Address[]
  orders: Order[]
  createdAt: string
  updatedAt: string
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'mpesa' | 'card' | 'paypal'
  paymentDetails: any
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
}

export interface PaymentMethod {
  id: string
  type: 'mpesa' | 'card' | 'paypal'
  details: any
  isDefault: boolean
}

export interface FilterOptions {
  categories: string[]
  brands: string[]
  genders: string[]
  sizes: string[]
  priceRange: {
    min: number
    max: number
  }
  colors: string[]
  inStock: boolean
  onSale: boolean
}

export interface PaginationOptions {
  page: number
  limit: number
  total: number
  totalPages: number
}
