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
            <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
              <Image
                src="/Kicksmas.webp"
                alt="Gift boxes"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="heading-lg">The Best Gift By Far</h2>
            <p className="text-body">
              If you're stumped with their size, favorite color, or sneaker of choice, you don't need to worry. 
              Everyone loves gifts and we are here to make that gift-giving process worthwhile. Gift anyone 
              with our exclusive gift card collection on any of our products. All gift cards have specified 
              instructions on how to redeem them with no extra costs charged. Let's show out some LOVE.
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