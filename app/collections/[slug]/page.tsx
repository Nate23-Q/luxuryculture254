'use client'

import { useParams } from 'next/navigation'
import { ProductGrid } from '@/components/product/ProductGrid'
import { allProducts } from '@/lib/data/all-products'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const collections = {
  jordan: {
    title: 'Air Jordan Collection',
    description: 'The iconic line that started it all. From the classic AJ1 to the latest retros.',
    keywords: ['jordan', 'air jordan', 'aj1', 'retro']
  },
  yeezy: {
    title: 'Yeezy Collection', 
    description: "Kanye West's revolutionary designs that changed the sneaker game forever.",
    keywords: ['yeezy', 'adidas']
  },
  culture: {
    title: 'Culture Collection',
    description: 'Premium apparel and accessories for the culture. Style that speaks volumes.',
    keywords: ['nike', 'dunk', 'sb dunk', 'air force']
  }
}

export default function CollectionPage() {
  const params = useParams()
  const slug = params.slug as string
  const collection = collections[slug as keyof typeof collections]

  if (!collection) {
    return (
      <div className="min-h-screen bg-primary section-padding">
        <div className="container-custom text-center">
          <h1 className="heading-lg mb-4">Collection Not Found</h1>
          <Link href="/" className="text-accent hover:underline">Back to Home</Link>
        </div>
      </div>
    )
  }

  const collectionProducts = allProducts.filter(product => 
    collection.keywords.some(keyword => 
      product.name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.brand.toLowerCase().includes(keyword.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    )
  )

  return (
    <div className="min-h-screen bg-primary">
      <div className="section-padding">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-secondary-600 hover:text-accent">Home</Link>
            <ChevronRight size={16} className="text-secondary-400" />
            <span className="text-secondary-900">Collections</span>
            <ChevronRight size={16} className="text-secondary-400" />
            <span className="text-secondary-900">{collection.title}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">{collection.title}</h1>
            <p className="text-body max-w-2xl mx-auto mb-6">
              {collection.description}
            </p>
            <div className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-semibold inline-block">
              {collectionProducts.length} Products
            </div>
          </div>

          {/* Products */}
          {collectionProducts.length > 0 ? (
            <ProductGrid products={collectionProducts} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-secondary mb-2">No Products Found</h3>
              <p className="text-secondary-600 mb-6">
                Check back soon for new arrivals in this collection.
              </p>
              <Link href="/shop" className="text-accent hover:underline">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}