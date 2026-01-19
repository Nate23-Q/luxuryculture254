'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function GiftSection() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden relative">
              <Image
                src="/IMG/Lux/lux4.jpg"
                alt="Gift boxes"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="heading-lg">WALK IN LUXURY, LIVE IN STYLE</h2>
            <p className="text-body">
              Built on authenticity. Driven by culture.
From iconic classics to rare finds, every sneaker at Luxury Culture is legit, verified, and selected for those who live boldly and dress intentionally.
            </p>
            <Button className="bg-secondary text-primary hover:bg-secondary-800">
              GIFT SOMEONE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}