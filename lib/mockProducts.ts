import { mockProducts } from './data/products'

// Use the first 6 products for new drops
export const mockNewDrops = mockProducts.slice(0, 6).map(product => ({
  ...product,
  isNewArrival: true
}))

// Use products 7-11 for bestsellers
export const mockBestsellers = mockProducts.slice(6, 11).map(product => ({
  ...product,
  isBestseller: true
}))

// Use products with isOnSale flag for sale products
export const mockSaleProducts = mockProducts.filter(product => product.isOnSale)

export const allProducts = mockProducts
