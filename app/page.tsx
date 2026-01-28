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
import { BrandStorySection } from '@/components/home/BrandStorySection'
import { Testimonials } from '@/components/home/Testimonials'
import { StrategicCTA } from '@/components/home/StrategicCTA'
import { allProducts } from '@/lib/data/all-products'

// Get products from actual data with fallback to show some products
const newDrops = allProducts.slice(0, 4)
const bestsellers = allProducts.slice(4, 8) 
const saleProducts = allProducts.slice(8, 12)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* End of Year Promo Banner */}
      <EndOfYearPromo />

      {/* Hero Section */}
      <HeroSection />

      {/* Brand Story Section - Build Trust & Connection */}
      <BrandStorySection />

      {/* New Drops Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">NEW DROPS</h2>
            <p className="text-body-lg mb-6 max-w-2xl mx-auto">
              Be the first to cop the latest releases from your favorite brands. 
              Fresh heat, straight to your doorstep.
            </p>
            <Link href="/new-arrivals">
              <Button variant="outline">VIEW ALL NEW ARRIVALS</Button>
            </Link>
          </div>
          <ProductGrid products={newDrops} />
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="section-padding bg-secondary-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">BESTSELLERS</h2>
            <p className="text-body-lg mb-6 max-w-2xl mx-auto">
              The most popular kicks that everyone's talking about. 
              These classics never go out of style.
            </p>
            <Link href="/best-sellers">
              <Button variant="outline">VIEW ALL BESTSELLERS</Button>
            </Link>
          </div>
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      {/* Gift Section */}
      <GiftSection />

      {/* More Than Store Section */}
      <MoreThanStore />

      {/* Strategic CTA - Newsletter & Engagement */}
      <StrategicCTA />

      {/* Sale Section */}
      <section className="section-padding bg-accent text-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">SALE</h2>
            <p className="text-body-lg mb-6 max-w-2xl mx-auto opacity-90">
              Serious deals on premium footwear. Limited time only - 
              don't miss out on these fire discounts with latest sneaker photos.
            </p>
            <Link href="/shop">
              <Button variant="secondary">SHOP ALL SALE ITEMS</Button>
            </Link>
          </div>
          <ProductGrid products={saleProducts} />
        </div>
      </section>

      {/* Testimonials Section - Social Proof */}
      <Testimonials />

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Culture Section */}
      <CultureSection />
    </div>
  )
}
