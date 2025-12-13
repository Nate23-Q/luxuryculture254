import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Users, Award, Truck } from 'lucide-react'

const cultureFeatures = [
  {
    icon: Users,
    title: 'COMMUNITY',
    description: 'Join thousands of sneakerheads and streetwear enthusiasts sharing their passion.'
  },
  {
    icon: Award,
    title: 'AUTHENTICITY',
    description: 'Every product is verified for authenticity. Your peace of mind is guaranteed.'
  },
  {
    icon: Truck,
    title: 'FAST DELIVERY',
    description: 'Get your drops delivered fast. Same-day delivery in Nairobi, nationwide shipping.'
  }
]

const blogPosts = [
  {
    id: '1',
    title: 'The Evolution of Sneaker Culture in Kenya',
    excerpt: 'How streetwear and sneaker culture has grown across East Africa, from bootleg releases to official drops.',
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&h=400&fit=crop',
    author: 'Luxury Culture Team',
    date: 'Dec 15, 2024',
    href: '/editorial/sneaker-culture-kenya'
  },
  {
    id: '2',
    title: 'Top 10 Sneaker Drops of 2024',
    excerpt: 'The most hyped and sought-after releases that defined the year in sneaker culture.',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=400&fit=crop',
    author: 'Luxury Culture Team',
    date: 'Dec 10, 2024',
    href: '/editorial/top-10-drops-2024'
  },
  {
    id: '3',
    title: 'Style Guide: Mastering the Sneaker Fit',
    excerpt: 'How to perfectly pair your sneakers with outfits for any occasion, from casual to formal.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    author: 'Luxury Culture Team',
    date: 'Dec 5, 2024',
    href: '/editorial/sneaker-style-guide'
  }
]

export function CultureSection() {
  return (
    <section className="section-padding bg-secondary text-primary">
      <div className="container-custom">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <div>
            <div className="bg-accent text-primary px-4 py-2 rounded-lg font-bold text-sm inline-block mb-6">
              THE CULTURE
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">
              MORE THAN JUST
              <br />
              <span className="text-accent">SNEAKERS</span>
            </h2>
            
            <p className="text-lg mb-8 opacity-90 max-w-lg">
              We're not just a store – we're a community of passionate individuals 
              who celebrate sneaker culture, streetwear, and the stories behind every drop. 
              Join the movement.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {cultureFeatures.map((feature) => {
                const IconComponent = feature.icon
                return (
                  <div key={feature.title} className="text-center">
                    <div className="bg-accent text-primary p-3 rounded-lg w-fit mx-auto mb-3">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="font-bold text-sm mb-2">{feature.title}</h3>
                    <p className="text-xs opacity-80">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            <Link href="/about">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-secondary">
                LEARN MORE ABOUT US
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&h=600&fit=crop"
              alt="Sneaker Culture"
              className="w-full h-[500px] object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
            
            {/* Floating Stats */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-primary text-secondary p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent">10K+</div>
                    <div className="text-xs">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">500+</div>
                    <div className="text-xs">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">50+</div>
                    <div className="text-xs">Brands</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Section */}
        <div className="border-t border-primary-700 pt-16">
          <div className="text-center mb-12">
            <div className="bg-accent text-primary px-4 py-2 rounded-lg font-bold text-sm inline-block mb-4">
              EDITORIAL
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              STORIES FROM THE CULTURE
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Stay updated with the latest news, trends, and stories from the world 
              of sneakers and streetwear.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={post.href}
                className="group card-hover overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-secondary-400 mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-secondary group-hover:text-accent transition-colors mb-3">
                    {post.title}
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/editorial">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-secondary">
                VIEW ALL STORIES
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
