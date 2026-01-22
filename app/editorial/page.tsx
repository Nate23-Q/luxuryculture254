'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  User, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  Star
} from 'lucide-react'

// Story type definition
interface Story {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: 'all' | 'sneaker-culture' | 'style-guide' | 'brand-story' | 'news' | 'trends'
  readTime: string
  featured?: boolean
}

// All stories data
const stories: Story[] = [
  {
    id: '1',
    title: 'The Evolution of Sneaker Culture in Kenya',
    excerpt: 'How streetwear and sneaker culture has grown across East Africa, from bootleg releases to official drops.',
    content: 'Full article content would go here...',
    image: '/IMG/latest/lux14.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 15, 2024',
    category: 'sneaker-culture',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Top 10 Sneaker Drops of 2024',
    excerpt: 'The most hyped and sought-after releases that defined the year in sneaker culture.',
    content: 'Full article content would go here...',
    image: '/IMG/latest/lux12.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 10, 2024',
    category: 'trends',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Style Guide: Mastering the Sneaker Fit',
    excerpt: 'How to perfectly pair your sneakers with outfits for any occasion, from casual to formal.',
    content: 'Full article content would go here...',
    image: '/IMG/latest/lux16.jpg',
    author: 'Luxury Culture Team',
    date: 'Dec 5, 2024',
    category: 'style-guide',
    readTime: '10 min read'
  },
  {
    id: '4',
    title: 'Jordan History: From Courts to Streets',
    excerpt: 'Exploring the legendary journey of Air Jordan and its impact on basketball and fashion.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux1.jpg',
    author: 'Michael Chen',
    date: 'Nov 28, 2024',
    category: 'brand-story',
    readTime: '12 min read'
  },
  {
    id: '5',
    title: 'Nairobi Sneaker Events You Need to Know',
    excerpt: 'The hottest sneaker shows, pop-ups, and meetups happening in Nairobi this season.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux2.jpg',
    author: 'Amara Okafor',
    date: 'Nov 20, 2024',
    category: 'sneaker-culture',
    readTime: '5 min read'
  },
  {
    id: '6',
    title: 'How to Spot Fake Sneakers: A Complete Guide',
    excerpt: 'Expert tips on identifying authentic vs counterfeit sneakers before you buy.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux3.jpg',
    author: 'Luxury Culture Team',
    date: 'Nov 15, 2024',
    category: 'style-guide',
    readTime: '15 min read',
    featured: true
  },
  {
    id: '7',
    title: 'Adidas: From Soccer Fields to Streetwear Empire',
    excerpt: 'The remarkable transformation of Adidas from sports giant to cultural icon.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux4.jpg',
    author: 'David Mwangi',
    date: 'Nov 10, 2024',
    category: 'brand-story',
    readTime: '9 min read'
  },
  {
    id: '8',
    title: 'Sneaker Storage 101: Protecting Your Collection',
    excerpt: 'Best practices for storing and displaying your sneaker collection to maintain value.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux5.jpg',
    author: 'Sarah Johnson',
    date: 'Nov 5, 2024',
    category: 'style-guide',
    readTime: '7 min read'
  },
  {
    id: '9',
    title: 'The Rise of Kenya\'s Sneaker Resale Market',
    excerpt: 'Inside the growing community of Kenyan sneaker flippers and collectors.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux6.jpg',
    author: 'Amara Okafor',
    date: 'Oct 30, 2024',
    category: 'sneaker-culture',
    readTime: '11 min read'
  },
  {
    id: '10',
    title: 'New Balance: The Comfort Revolution',
    excerpt: 'How New Balance became the go-to brand for comfort-first sneaker enthusiasts.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux7.jpg',
    author: 'Michael Chen',
    date: 'Oct 25, 2024',
    category: 'brand-story',
    readTime: '8 min read'
  },
  {
    id: '11',
    title: 'Sneaker Care: Cleaning and Maintenance Tips',
    excerpt: 'Step-by-step guide to keeping your sneakers looking fresh and brand new.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux8.jpg',
    author: 'Luxury Culture Team',
    date: 'Oct 20, 2024',
    category: 'style-guide',
    readTime: '10 min read'
  },
  {
    id: '12',
    title: 'Limited Edition Releases: What Makes Them Special',
    excerpt: 'Understanding the hype behind limited sneaker releases and how to cop them.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux9.jpg',
    author: 'David Mwangi',
    date: 'Oct 15, 2024',
    category: 'trends',
    readTime: '6 min read'
  },
  {
    id: '13',
    title: 'Yeezy Journey: From Music to Fashion Empire',
    excerpt: 'Kanye West\'s transformation from artist to sneaker mogul with Adidas Yeezy.',
    content: 'Full article content would go here...',
    image: '/IMG/latest/lux13.jpg',
    author: 'Sarah Johnson',
    date: 'Oct 10, 2024',
    category: 'brand-story',
    readTime: '14 min read'
  },
  {
    id: '14',
    title: 'Sneakerhead Community Guidelines',
    excerpt: 'Essential etiquette for navigating the sneaker community respectfully.',
    content: 'Full article content would go here...',
    image: '/IMG/latest/lux15.jpg',
    author: 'Luxury Culture Team',
    date: 'Oct 5, 2024',
    category: 'sneaker-culture',
    readTime: '5 min read'
  },
  {
    id: '15',
    title: '2025 Sneaker Trends to Watch',
    excerpt: 'Predictions and leaks for the most anticipated releases of next year.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux11.jpg',
    author: 'Michael Chen',
    date: 'Sep 28, 2024',
    category: 'trends',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '16',
    title: 'The Art of Sneaker Photography',
    excerpt: 'Tips and tricks for capturing stunning sneaker photos for social media.',
    content: 'Full article content would go here...',
    image: '/IMG/Lux/lux12.jpg',
    author: 'Amara Okafor',
    date: 'Sep 20, 2024',
    category: 'style-guide',
    readTime: '9 min read'
  }
]

// Category configuration
const categories = [
  { id: 'all', label: 'All Stories', icon: BookOpen },
  { id: 'sneaker-culture', label: 'Sneaker Culture', icon: TrendingUp },
  { id: 'style-guide', label: 'Style Guides', icon: Sparkles },
  { id: 'brand-story', label: 'Brand Stories', icon: Star },
  { id: 'trends', label: 'Trends & News', icon: Zap },
] as const

export default function EditorialPage() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]['id']>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Filter and paginate stories
  const filteredStories = useMemo(() => {
    if (activeCategory === 'all') {
      return stories
    }
    return stories.filter(story => story.category === activeCategory)
  }, [activeCategory])

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage)
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Get featured stories
  const featuredStories = stories.filter(story => story.featured)

  const handleCategoryChange = (categoryId: typeof categories[number]['id']) => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent to-secondary text-primary py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="text-lg font-semibold uppercase tracking-wide">Editorial</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4">
              STORIES FROM
              <br />
              <span className="text-primary">THE CULTURE</span>
            </h1>
            <p className="text-lg lg:text-xl mb-6 text-primary/90 max-w-2xl">
              Stay updated with the latest news, trends, and stories from the world 
              of sneakers and streetwear. Join our community of passionate enthusiasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-primary text-accent px-4 py-2 rounded-full text-sm font-semibold">
                {stories.length} Stories
              </span>
              <span className="bg-primary/20 px-4 py-2 rounded-full text-sm font-semibold">
                Updated Weekly
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stories Carousel */}
      {featuredStories.length > 0 && activeCategory === 'all' && (
        <div className="py-12 bg-secondary-100">
          <div className="container-custom">
            <div className="flex items-center gap-2 mb-8">
              <Star className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-display font-bold">Featured Stories</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/editorial/${story.id}`}
                  className="group card-hover overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-12">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-accent text-primary'
                      : 'bg-secondary-100 text-secondary hover:bg-secondary-200'
                  }`}
                >
                  <IconComponent size={16} />
                  {category.label}
                </button>
              )
            })}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedStories.map((story) => (
              <Link
                key={story.id}
                href={`/editorial/${story.id}`}
                className="group card-hover overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-accent text-primary px-2 py-1 rounded text-xs font-semibold">
                    {story.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-secondary-500 mb-3">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {story.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {story.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {story.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-secondary-600 text-sm line-clamp-3 mb-4">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center text-accent font-medium text-sm group-hover:underline">
                    Read More
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mb-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-secondary-300 text-secondary hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-accent text-primary'
                      : 'bg-secondary-100 text-secondary hover:bg-secondary-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-secondary-300 text-secondary hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* No Results */}
          {paginatedStories.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">No Stories Found</h3>
              <p className="text-secondary-600 mb-6">
                There are no stories in this category yet. Check back soon!
              </p>
              <Button variant="outline" onClick={() => handleCategoryChange('all')}>
                View All Stories
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-secondary-200 py-16">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-accent text-primary px-4 py-2 rounded-lg font-bold text-sm inline-block mb-4">
              STAY IN THE LOOP
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Never Miss a Story
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              Get the latest stories, trends, and culture updates delivered straight 
              to your inbox. Be the first to know about new drops and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary"
                style={{ fontSize: '16px' }}
              />
              <Button>
                Subscribe
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
            <p className="text-sm text-secondary-500 mt-4">
              By subscribing, you agree to receive updates from Luxury Culture.
              Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-primary py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-4 text-secondary">Popular Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleCategoryChange('sneaker-culture')}
                    className="text-secondary-600 hover:text-accent transition-colors"
                  >
                    Sneaker Culture
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryChange('style-guide')}
                    className="text-secondary-600 hover:text-accent transition-colors"
                  >
                    Style Guides
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryChange('brand-story')}
                    className="text-secondary-600 hover:text-accent transition-colors"
                  >
                    Brand Stories
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryChange('trends')}
                    className="text-secondary-600 hover:text-accent transition-colors"
                  >
                    Trends & News
                  </button>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-4 text-secondary">Popular Stories</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/editorial/1"
                    className="text-secondary-600 hover:text-accent transition-colors"
                  >
                    Evolution of Sneaker Culture in Kenya
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/editorial/6"
                    className="text-secondary-600 hover:text-accent transition-colors"
                  >
                    How to Spot Fake Sneakers
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/editorial/15"
                    className="text-secondary-600 hover:text-accent transition-colors"
                  >
                    2025 Sneaker Trends to Watch
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-4 text-secondary">Connect With Us</h3>
              <p className="text-secondary-600 mb-4">
                Follow us on social media for daily content, sneak peeks, and community highlights.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary hover:bg-accent hover:text-primary transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary hover:bg-accent hover:text-primary transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary hover:bg-accent hover:text-primary transition-colors"
                >
                  <span className="sr-only">TikTok</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.68 1.33-3.88 2.12-6.05 2.12-2.13 0-4.1-.76-5.66-2.1-1.53-1.32-2.43-3.16-2.43-5.26 0-2.41 1.18-4.59 3.09-6.07 1.63-1.26 3.8-1.91 6.02-1.91v4.05c-1.27-.24-2.53-.53-3.76-.7-1.23-.17-2.47-.17-3.7-.17-1.58 0-3.11.43-4.42 1.22-1.28.78-2.21 1.94-2.66 3.3-.11.27-.21.55-.29.83v.01c1.35.26 2.73.4 4.15.4 1.51 0 2.96-.24 4.32-.67.27-.08.54-.17.8-.26v4.31c-.26-.08-.52-.16-.79-.25-1.61-.52-2.89-1.69-3.37-3.3-.15-.51-.22-1.04-.22-1.59 0-1.57.68-3.03 1.79-4.03 1.11-1 2.57-1.46 4.04-1.46v4.12c2.11-.34 4.01-1.22 5.38-2.47 1.37-1.25 2.26-2.91 2.53-4.74.05-.36.07-.73.07-1.11V.02z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

