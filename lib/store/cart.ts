import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id && item.size === newItem.size
          )

          if (existingItemIndex >= 0) {
            // Item exists, update quantity
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex].quantity += newItem.quantity
            return { items: updatedItems }
          } else {
            // New item, add to cart
            return { items: [...state.items, newItem] }
          }
        })
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.size === size)),
        }))
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'shop-jr-cart',
    }
  )
)
