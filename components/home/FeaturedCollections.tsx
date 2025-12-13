import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const collections = [
  {
    id: '1',
    title: 'AIR JORDAN',
    subtitle: 'LEGENDARY BEGINS HERE',
    description: 'The iconic line that started it all. From the classic AJ1 to the latest retros.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
    href: '/shop?brand=nike',
    bgColor: 'bg-accent',
    textColor: 'text-primary'
  },
  {
    id: '2',
    title: 'YEEZY',
    subtitle: 'THE FUTURE IS NOW',
    description: 'Kanye West\'s revolutionary designs that changed the sneaker game forever.',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=600&fit=crop',
    href: '/shop?brand=adidas',
    bgColor: 'bg-secondary',
    textColor: 'text-primary'
  },
  {
    id: '3',
    title: 'STREETWEAR',
    subtitle: 'EXPRESS YOURSELF',
    description: 'Premium apparel and accessories for the culture. Style that speaks volumes.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    href: '/shop?category=apparel',
    bgColor: 'bg-primary',
    textColor: 'text-secondary'
  }
]

export function FeaturedCollections() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">FEATURED COLLECTIONS</h2>
          <p className="text-body max-w-2xl mx-auto">
            Discover curated collections from the world's most iconic brands. 
            Each piece tells a story of style, innovation, and culture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] transition-transform duration-300 hover:scale-105"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className={`inline-block ${collection.bgColor} ${collection.textColor} px-3 py-1 rounded font-bold text-sm mb-4 w-fit`}>
                  {collection.title}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-primary mb-3">
                  {collection.subtitle}
                </h3>
                
                <p className="text-primary/90 text-sm mb-6 max-w-xs">
                  {collection.description}
                </p>

                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-secondary w-fit"
                >
                  EXPLORE COLLECTION
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
