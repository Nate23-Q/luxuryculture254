'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Share2, Heart } from 'lucide-react'
import { useParams } from 'next/navigation'

// Editorial posts data - same as in editorial/page.tsx
const editorialPosts = [
  {
    id: '1',
    slug: 'sneaker-culture-kenya',
    title: 'The Evolution of Sneaker Culture in Kenya',
    excerpt: 'How streetwear and sneaker culture has grown across East Africa, from bootleg releases to official drops.',
    image: '/IMG/latest/lux14.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 15, 2024',
    category: 'sneaker-culture',
    readTime: '8 min read',
    featured: true,
    content: `
      <p>Sneaker culture in Kenya has undergone a remarkable transformation over the past decade. What started as underground communities 
      trading bootleg releases has evolved into a thriving ecosystem of collectors, enthusiasts, and official retailers.</p>

      <h3>The Early Days</h3>
      <p>In the early 2010s, genuine sneakers were hard to come by in Kenya. Most people wore fakes or waited for friends traveling 
      abroad to bring back authentic pairs. Online shopping was limited, shipping was expensive, and customs duties made legal imports 
      prohibitively costly.</p>

      <h3>The Digital Revolution</h3>
      <p>Everything changed with improved internet connectivity and the rise of e-commerce platforms. Suddenly, Kenyan sneaker enthusiasts 
      could access the global market. Communities formed on social media, sharing knowledge about releases, prices, and authenticity.</p>

      <h3>The Modern Era</h3>
      <p>Today, Kenya hosts major sneaker events, official brand partnerships, and a thriving resale market. Luxury Culture stands at the 
      forefront of this movement, bringing authentic sneakers directly to East African consumers with same-day delivery in Nairobi.</p>

      <p>The culture continues to grow, with younger generations embracing sneakers not just as footwear, but as art, status, and community.</p>
    `
  },
  {
    id: '2',
    slug: 'top-10-drops-2024',
    title: 'Top 10 Sneaker Drops of 2024',
    excerpt: 'The most hyped and sought-after releases that defined the year in sneaker culture.',
    image: '/IMG/latest/lux12.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 10, 2024',
    category: 'news',
    readTime: '6 min read',
    featured: false,
    content: `
      <p>2024 was an incredible year for sneaker releases. From collaborative masterpieces to nostalgic retros, we've compiled the top 10 
      drops that had the sneaker community buzzing all year long.</p>

      <h3>1. Nike x Travis Scott Air Jordan 1 Low OG</h3>
      <p>A stunning collaboration that brought together high fashion and streetwear aesthetics. The reverse swoosh and premium materials made this 
      an instant classic.</p>

      <h3>2. Adidas Originals NMD_S1 Retro</h3>
      <p>Bringing back the beloved NMD silhouette with modern updates. Comfort meets style in this reissue.</p>

      <h3>3. Jordan Brand Air Jordan XX Retro</h3>
      <p>A throwback to early 2000s basketball that resonated with both old-school and new fans alike.</p>

      <h3>And More...</h3>
      <p>2024 had no shortage of incredible releases across all major brands. From Nike to Adidas, Puma to New Balance, there was something 
      for every type of sneaker enthusiast.</p>
    `
  },
  {
    id: '3',
    slug: 'sneaker-style-guide',
    title: 'Style Guide: Mastering the Sneaker Fit',
    excerpt: 'How to perfectly pair your sneakers with outfits for any occasion, from casual to formal.',
    image: '/IMG/latest/lux16.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 5, 2024',
    category: 'style-guide',
    readTime: '7 min read',
    featured: false,
    content: `
      <p>Sneakers have become a wardrobe staple, but styling them correctly can be the difference between looking fresh and looking sloppy. 
      Here's our comprehensive guide to mastering the sneaker fit.</p>

      <h3>The Casual Street Fit</h3>
      <p>Start with your foundation: clean, well-fitted jeans or joggers. Pair them with a simple t-shirt or hoodie. Add a chain or watch 
      for subtle accessories. Choose neutral or bold sneakers depending on your style.</p>

      <h3>Business Casual</h3>
      <p>Yes, sneakers can work in professional settings. Pair minimalist, clean sneakers with tailored trousers and a crisp button-up shirt. 
      Keep colors neutral and let your sneakers make a statement.</p>

      <h3>Athleisure</h3>
      <p>The easiest fit to pull off. Matching sets, coordinating colors, and performance-oriented sneakers create an effortlessly cool look 
      that works everywhere.</p>

      <h3>High Fashion</h3>
      <p>Luxury sneakers pair beautifully with statement pieces. Try oversized blazers, designer tracksuits, or avant-garde clothing. 
      The key is confidence and intentionality.</p>
    `
  }
]

export default function EditorialPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  // Find the post by slug
  const post = editorialPosts.find(p => p.slug === slug)
  
  // Find related posts
  const relatedPosts = editorialPosts
    .filter(p => p.id !== post?.id)
    .slice(0, 2)
  
  const [liked, setLiked] = useState(false)

  if (!post) {
    return (
      <div className="min-h-screen bg-primary text-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-lg mb-8">The editorial post you're looking for doesn't exist.</p>
          <Link href="/editorial">
            <Button className="group">
              <ArrowLeft size={18} className="mr-2" />
              Back to Editorial
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary text-secondary">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-primary/95 backdrop-blur border-b border-secondary">
        <div className="container-custom py-4">
          <Link href="/editorial" className="inline-flex items-center text-accent hover:gap-2 transition-all">
            <ArrowLeft size={18} />
            <span className="ml-2">Back to Stories</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <div className="container-custom max-w-4xl">
            <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-xs font-semibold uppercase mb-4 backdrop-blur">
              {post.category.replace('-', ' ')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-padding bg-primary">
        <div className="container-custom max-w-4xl">
          {/* Article Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-12 border-b border-secondary">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <User size={20} className="text-accent" />
              </div>
              <div>
                <div className="font-semibold">{post.author}</div>
                <div className="text-sm text-gray-500">Published {post.date}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  liked 
                    ? 'bg-red-500/20 text-red-500' 
                    : 'bg-secondary/20 text-secondary hover:bg-secondary/30'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-current' : ''} />
                <span className="text-sm font-medium">{liked ? 'Liked' : 'Like'}</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-all">
                <Share2 size={18} />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none mb-16">
            <article 
              className="text-lg leading-relaxed text-gray-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* CTA Section */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-8 mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to elevate your sneaker game?</h3>
              <p className="text-gray-400 mb-6">Explore our curated collection of premium sneakers and find your next favorite pair.</p>
              <Link href="/shop">
                <Button className="group">
                  SHOP NOW
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-8">More Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {relatedPosts.map((relPost) => (
                  <div key={relPost.id} className="group card-luxury overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-800">
                      <img
                        src={relPost.image}
                        alt={relPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <span>{relPost.author}</span>
                        <span className="mx-2">•</span>
                        <span>{relPost.date}</span>
                      </div>
                      <h4 className="text-lg font-bold mb-4 group-hover:text-accent transition-colors">
                        {relPost.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">{relPost.excerpt}</p>
                      <Link href={`/editorial/${relPost.slug}`} className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
