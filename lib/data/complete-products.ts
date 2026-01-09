import { Product } from '@/types'

// Complete list of all Nike and Air Jordan shoes as requested
export const allShoeProducts: Product[] = [
  // Nike SB Dunk Low Pro variations
  { id: '1', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-1', description: 'Classic skateboarding shoe with premium materials.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11'], colors: ['Black/White'], images: ['/IMG/latest/photo_2026-01-09_09-26-03.jpg'], inStock: true, isOnSale: false, isBestseller: true, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  
  // Nike Air Force 1 variations
  { id: '2', name: 'Nike Air Force 1', slug: 'nike-air-force-1-1', description: 'The classic Air Force 1 with clean leather upper.', price: 90, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11', '12'], colors: ['White', 'Black'], images: ['/IMG/latest/photo_2026-01-09_09-26-04.jpg'], inStock: true, isOnSale: false, isBestseller: true, isNewArrival: true, tags: ['basketball'], createdAt: '2024-01-02', updatedAt: '2024-01-02' },
  
  { id: '3', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-2', description: 'Skateboarding shoe with durable construction.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11'], colors: ['Grey/White'], images: ['/IMG/latest/photo_2026-01-09_09-26-05.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-03', updatedAt: '2024-01-03' },
  
  // Nike Dunk Low Rift variations
  { id: '4', name: 'Nike Dunk Low Rift', slug: 'nike-dunk-low-rift-1', description: 'Classic Dunk Low with premium materials.', price: 100, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11'], colors: ['White/Blue'], images: ['/IMG/latest/photo_2026-01-09_09-26-06.jpg'], inStock: true, isOnSale: true, originalPrice: 120, isBestseller: false, isNewArrival: true, tags: ['basketball'], createdAt: '2024-01-04', updatedAt: '2024-01-04' },
  
  // Nike Court Vision Low variations
  { id: '5', name: 'Nike Court Vision Low', slug: 'nike-court-vision-low-1', description: 'Modern basketball-inspired shoe with clean lines.', price: 75, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11', '12'], colors: ['White'], images: ['/IMG/latest/photo_2026-01-09_09-26-08.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['basketball'], createdAt: '2024-01-05', updatedAt: '2024-01-05' },
  
  // Nike SB Dunk Low P60 variations
  { id: '6', name: 'Nike SB Dunk Low P60', slug: 'nike-sb-dunk-low-p60-1', description: 'Special edition SB Dunk Low with unique colorway.', price: 125, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11'], colors: ['Multi-Color'], images: ['/IMG/latest/photo_2026-01-09_09-26-09.jpg'], inStock: true, isOnSale: false, isBestseller: true, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-06', updatedAt: '2024-01-06' },
  
  { id: '7', name: 'Nike SB Dunk Low P60', slug: 'nike-sb-dunk-low-p60-2', description: 'Premium skateboarding shoe with enhanced durability.', price: 125, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11'], colors: ['Black/Grey'], images: ['/IMG/latest/photo_2026-01-09_09-26-10.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-07', updatedAt: '2024-01-07' },
  
  { id: '8', name: 'Nike SB Dunk Low P60', slug: 'nike-sb-dunk-low-p60-3', description: 'Skateboarding shoe designed for performance.', price: 125, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11'], colors: ['White/Red'], images: ['/IMG/latest/photo_2026-01-09_09-26-11.jpg'], inStock: true, isOnSale: false, isBestseller: true, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-08', updatedAt: '2024-01-08' },
  
  { id: '9', name: 'Nike SB Dunk Low P60', slug: 'nike-sb-dunk-low-p60-4', description: 'Classic SB Dunk Low with modern updates.', price: 125, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['Grey/Black'], images: ['/IMG/latest/photo_2026-01-09_09-26-27.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-09', updatedAt: '2024-01-09' },
  
  // More Nike SB Dunk Low Pro variations
  { id: '10', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-3', description: 'Professional skateboarding shoe with enhanced board feel.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11'], colors: ['Black/White'], images: ['/IMG/latest/photo_2026-01-09_09-26-29.jpg'], inStock: true, isOnSale: false, isBestseller: true, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  
  { id: '11', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-4', description: 'Classic SB Dunk Low Pro with premium materials.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11'], colors: ['White/Green'], images: ['/IMG/latest/photo_2026-01-09_09-26-30.jpg'], inStock: true, isOnSale: true, originalPrice: 130, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-11', updatedAt: '2024-01-11' },
  
  // Nike SB Dunk Low Q70 variations
  { id: '12', name: 'Nike SB Dunk Low Q70', slug: 'nike-sb-dunk-low-q70-1', description: 'Special edition SB Dunk Low with unique design elements.', price: 135, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['Multi-Color'], images: ['/IMG/latest/photo_2026-01-09_09-26-31.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-12', updatedAt: '2024-01-12' },
  
  // Continue with more Nike SB Dunk Low Pro
  { id: '13', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-5', description: 'Professional grade skateboarding shoe.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['Navy/White'], images: ['/IMG/latest/photo_2026-01-09_09-26-32.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-13', updatedAt: '2024-01-13' },
  
  { id: '14', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-6', description: 'Iconic SB Dunk Low Pro with timeless design.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11'], colors: ['White/Blue'], images: ['/IMG/latest/photo_2026-01-09_09-26-33.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-14', updatedAt: '2024-01-14' },
  
  // Nike Dunk Low Rift (second variation)
  { id: '15', name: 'Nike Dunk Low Rift', slug: 'nike-dunk-low-rift-2', description: 'Retro basketball shoe with classic silhouette.', price: 100, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['White/Black'], images: ['/IMG/latest/photo_2026-01-09_09-26-35.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['basketball'], createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  
  // More Nike SB Dunk Low Pro
  { id: '16', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-7', description: 'Premium skateboarding shoe with enhanced durability.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11'], colors: ['Black/White'], images: ['/IMG/latest/photo_2026-01-09_09-26-37.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-16', updatedAt: '2024-01-16' },
  
  { id: '17', name: 'Nike SB Dunk Low Pro', slug: 'nike-sb-dunk-low-pro-8', description: 'Classic SB Dunk Low Pro with superior board feel.', price: 110, brand: 'Nike', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['White/Green'], images: ['/IMG/latest/photo_2026-01-09_09-26-38.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['skateboarding'], createdAt: '2024-01-17', updatedAt: '2024-01-17' },
  
  // Air Jordan 4 Retro CG/AP
  { id: '18', name: 'Air Jordan 4 Retro CG/AP', slug: 'air-jordan-4-retro-cg-ap', description: 'Iconic Jordan 4 with premium materials and classic basketball heritage.', price: 200, brand: 'Jordan', category: 'footwear', gender: 'unisex', sizes: ['6', '7', '8', '9', '10', '11', '12'], colors: ['Black/Red'], images: ['/IMG/latest/photo_2026-01-09_09-26-39.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['basketball'], createdAt: '2024-01-18', updatedAt: '2024-01-18' },
  
  // Air Jordan 4 Retro CG/SP
  { id: '19', name: 'Air Jordan 4 Retro CG/SP', slug: 'air-jordan-4-retro-cg-sp', description: 'Special edition Jordan 4 with unique colorway.', price: 210, brand: 'Jordan', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['Grey/White'], images: ['/IMG/latest/photo_2026-01-09_09-26-40.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['basketball'], createdAt: '2024-01-19', updatedAt: '2024-01-19' },
  
  // Air Jordan 5 Retro SE
  { id: '20', name: 'Air Jordan 5 Retro SE', slug: 'air-jordan-5-retro-se', description: 'Classic Jordan 5 with special edition details.', price: 190, brand: 'Jordan', category: 'footwear', gender: 'unisex', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['Black/Red'], images: ['/IMG/latest/photo_2026-01-09_09-26-41.jpg'], inStock: true, isOnSale: false, isBestseller: false, isNewArrival: true, tags: ['basketball'], createdAt: '2024-01-20', updatedAt: '2024-01-20' }
]

// Export the complete list
export const mockProducts = allShoeProducts

export const brands = ['Nike', 'Jordan', 'Adidas', 'Xuec']
export const categories = ['footwear', 'apparel', 'accessories']  
export const genders = ['men', 'women', 'unisex']
export const sizes = ['6', '7', '8', '9', '10', '11', '12', 'S', 'M', 'L', 'XL', 'One Size']
export const colors = ['Black', 'White', 'Red', 'Black/Red', 'White/Black', 'Navy/White', 'Grey/White', 'Multi-Color', 'Chicago', 'Bred', 'Fire Red', 'Pink/White']
