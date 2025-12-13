'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'

const navigation = [
  { name: 'Footwear', href: '/shop?category=footwear' },
  { name: 'Apparel', href: '/shop?category=apparel' },
  { name: 'Accessories', href: '/shop?category=accessories' },
  { name: 'Sale', href: '/shop?sale=true' },
  { name: 'Editorial', href: '/editorial' },
  { name: 'Gift Cards', href: '/gift-cards' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const { items } = useCartStore()

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-secondary">
      {/* Top Bar */}
      <div className="bg-accent text-primary text-center py-2 text-sm font-medium">
        FREE SHIPPING ON ORDERS OVER KSh 5,000 | 30-DAY RETURNS
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-secondary hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-accent text-primary px-3 py-2 rounded-lg font-display font-bold text-xl lg:text-2xl">
              SHOP JR
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  pathname === item.href
                    ? 'text-accent border-b-2 border-accent pb-1'
                    : 'text-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-primary w-64 pl-10 pr-4"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" 
                size={18} 
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <Link
              href="/account"
              className="p-2 text-secondary hover:text-accent transition-colors"
              aria-label="Account"
            >
              <User size={24} />
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-secondary hover:text-accent transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-primary w-full pl-10 pr-4"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" 
                size={18} 
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-secondary">
          <nav className="container-custom py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium transition-colors hover:text-accent ${
                  pathname === item.href ? 'text-accent' : 'text-secondary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
