import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ProductGrid } from '@/components/product/ProductGrid'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedCollections } from '@/components/home/FeaturedCollections'
import { CultureSection } from '@/components/home/CultureSection'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'
import { BrandShowcase } from '@/components/home/BrandShowcase'
import { GiftSection } from '@/components/home/GiftSection'
import { MoreThanStore } from '@/components/home/MoreThanStore'
import { EndOfYearPromo } from '@/components/home/EndOfYearPromo'


// Mock data - replace with actual API calls
const mockNewDrops = [
  {
    id: '1',
    name: 'Nike SB DUNK LOW PRO - White/Black(Size)-44',
    slug: 'air-jordan-1-retro-high-og',
    description: 'The legendary Air Jordan 1 returns with premium materials and classic colorway.',
    price: 350,
    originalPrice: 400,
    brand: 'Nike',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Black'],
    images: ['/IMG/latest/photo_2026-01-09_09-24-49.jpg'],
    inStock: true,
    isOnSale: true,
    isNewArrival: true,
    tags: ['retro', 'basketball', 'iconic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },

  {
    id: '2',
    name: 'Nike SB DUNK LOW THERE SKATEBOARDS (Size)-43',
    slug: 'Nike SB Dunk Low Pro',
    description: 'Kanye West\'s revolutionary sneaker with BOOST technology andPrimeknit upper.',
    price: 600,
    brand: 'Adidas',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['Cream', 'Black', 'Beluga'],
    images: ['/IMG/latest/photo_2026-01-09_09-24-51.jpg'],
    inStock: true,
    isOnSale: false,
    isNewArrival: true,
    tags: ['boost', 'casual', 'modern'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Nike SB DUNK LOW SUPREME 94 BLACK (Size)-42',
    slug: 'dunk-low-panda',
    description: 'Nike\'s classic basketball-inspired sneaker in the iconic black and white colorway.',
    price: 450,
    originalPrice: 500,
    brand: 'Nike',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['Black/White'],
    images: ['/IMG/latest/photo_2026-01-09_09-24-52.jpg'],
    inStock: true,
    isOnSale: true,
    tags: ['skate', 'casual', 'classic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },

  {
    id: '4',
    name: 'Nike SB DUNK LOW SUPREME 94 WHITE (Size)-45',
    slug: 'new-balance-550',
    description: 'Classic \'90s basketball shoe revived with premium materials and retro styling.',
    price: 500,
    brand: 'New Balance',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White/Green', 'White/Navy'],
    images: ['/IMG/latest/photo_2026-01-09_09-24-53.jpg'],
    inStock: true,
    isOnSale: false,
    isNewArrival: true,
    tags: ['retro', 'basketball', 'premium'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]


const mockBestsellers = [
  {
    id: '5',
    name: 'Air Force 1 \'07',
    slug: 'air-force-1-07',
    description: 'The timeless Nike Air Force 1 with classic leather upper and Air-Sole unit.',
    price: 7500,
    brand: 'Nike',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Triple Black'],
    images: ['/IMG/Arrivals/DSC02186.JPG'],
    inStock: true,
    isOnSale: false,
    isBestseller: true,
    tags: ['classic', 'leather', 'basketball'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '6',
    name: 'UltraBoost 22',
    slug: 'ultraboost-22',
    description: 'Adidas\' most responsive running shoe with BOOST midsole and Primeknit upper.',
    price: 11000,
    brand: 'Adidas',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Core Black', 'Cloud White', 'Blue'],
    images: ['/IMG/Arrivals/DSC02222.JPG'],
    inStock: true,
    isOnSale: false,
    isBestseller: true,
    tags: ['running', 'boost', 'performance'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '7',
    name: 'Chuck Taylor All Star',
    slug: 'chuck-taylor-all-star',
    description: 'The iconic Converse Chuck Taylor with classic canvas upper and rubber sole.',
    price: 4500,
    brand: 'Converse',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['4', '5', '6', '7', '8', '9', '10', '11'],
    colors: ['Black', 'White', 'Red'],
    images: ['/IMG/Arrivals/DSC02242.JPG'],
    inStock: true,
    isOnSale: false,
    isBestseller: true,
    tags: ['canvas', 'classic', 'casual'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '8',
    name: 'Classic Leather',
    slug: 'classic-leather',
    description: 'Reebok\'s timeless leather sneaker with vintage styling and comfortable fit.',
    price: 6500,
    brand: 'Reebok',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Navy'],
    images: ['/IMG/Arrivals/DSC02252.JPG'],
    inStock: true,
    isOnSale: false,
    isBestseller: true,
    tags: ['leather', 'vintage', 'comfort'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

const mockSaleProducts = [
  {
    id: '9',
    name: 'Air Max 90',
    slug: 'air-max-90',
    description: 'Nike\'s classic Air Max 90 with visible Air cushioning and sleek design.',
    price: 70,
    originalPrice: 90,
    brand: 'Nike',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['White/Grey', 'Black/White', 'Infrared'],
    images: ['https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop'],
    inStock: true,
    isOnSale: true,
    tags: ['air-max', 'retro', 'cushioning'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '10',
    name: 'Air Force–style sneaker',
    slug: 'stan-smith',
    description: 'Adidas\' most iconic tennis shoe with clean design and premium materials.',
    price: 65,
    originalPrice: 70,
    brand: 'Adidas',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['White/Green', 'White/Red', 'All White'],
    images: ['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400&h=400&fit=crop'],
    inStock: true,
    isOnSale: true,
    tags: ['tennis', 'minimalist', 'classic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '11',
    name: 'Vans Old Skool',
    slug: 'old-skool',
    description: 'Vans\' iconic skate shoe with suede and canvas upper and signature side stripe.',
    price: 55,
    originalPrice: 60,
    brand: 'Vans',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['5', '6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'Navy/White', 'Checkerboard'],
    images: ['/Arrivals/DSC02264.JPG'],
    inStock: true,
    isOnSale: true,
    tags: ['skate', 'vans', 'side-stripe'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '12',
    name: 'Gel-Lyte III',
    slug: 'gel-lyte-iii',
    description: 'ASICS\' classic running shoe with GEL cushioning and unique split-tongue design.',
    price: 90,
    originalPrice: 100,
    brand: 'ASICS',
    category: 'footwear' as const,
    gender: 'unisex' as const,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['White/Grey', 'Navy/White', 'Red/White'],
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop'],
    inStock: true,
    isOnSale: true,
    tags: ['running', 'gel', 'japanese'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* End of Year Promo Banner */}
      <EndOfYearPromo />

      {/* Hero Section */}
      <HeroSection />

      {/* New Drops Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">NEW DROPS</h2>
            <p className="text-body mb-6 max-w-2xl mx-auto">
              Be the first to cop the latest releases from your favorite brands. 
              Fresh heat, straight to your doorstep.
            </p>
            <Link href="/new-arrivals">
              <Button variant="outline">VIEW ALL NEW ARRIVALS</Button>
            </Link>
          </div>
          <ProductGrid products={mockNewDrops} />
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="section-padding bg-secondary-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">BESTSELLERS</h2>
            <p className="text-body mb-6 max-w-2xl mx-auto">
              The most popular kicks that everyone's talking about. 
              These classics never go out of style.
            </p>
            <Link href="/best-sellers">
              <Button variant="outline">VIEW ALL BESTSELLERS</Button>
            </Link>
          </div>
          <ProductGrid products={mockBestsellers} />
        </div>
      </section>

      {/* Gift Section */}
      <GiftSection />

      {/* More Than Store Section */}
      <MoreThanStore />

      {/* Sale Section */}
      <section className="section-padding bg-accent text-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">SALE</h2>
            <p className="text-body mb-6 max-w-2xl mx-auto opacity-90">
              Serious deals on premium footwear. Limited time only - 
              don't miss out on these fire discounts.
            </p>
            <Link href="/shop?sale=true">
              <Button variant="secondary">SHOP ALL SALE ITEMS</Button>
            </Link>
          </div>
          <ProductGrid products={mockSaleProducts} />
        </div>
      </section>

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Culture Section */}
      <CultureSection />
    </div>
  )
}
