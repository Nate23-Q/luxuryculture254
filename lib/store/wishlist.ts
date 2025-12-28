'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface WishlistItem {
  id: string
  product: Product
  addedAt: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  getItemCount: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        const { items } = get()
        const existingItem = items.find(item => item.product.id === product.id)
        
        if (!existingItem) {
          set({
            items: [
              ...items,
              {
                id: `wishlist-${product.id}-${Date.now()}`,
                product,
                addedAt: new Date().toISOString()
              }
            ]
          })
        }
      },
      
      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.product.id !== productId)
        })
      },
      
      isInWishlist: (productId: string) => {
        return get().items.some(item => item.product.id === productId)
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
      
      getItemCount: () => {
        return get().items.length
      }
    }),
    {
      name: 'luxury-culture-wishlist'
    }
  )
)