'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Shield, Award, Truck } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Collections', href: '/collections', hasDropdown: true },
  { name: 'Sale', href: '/shop?sale=true' },
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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 transition-all duration-300 hover:shadow-lg">
      {/* Top Trust Bar */}
      <div className="bg-accent text-white py-3 hidden sm:block">
        <div className="container-custom">
          <div className="flex items-center justify-between text-xs font-medium tracking-wide">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 hover:gap-3 transition-all">
                <Shield size={14} />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center space-x-2 hover:gap-3 transition-all">
                <Truck size={14} />
                <span>Same-day Nairobi delivery</span>
              </div>
              <div className="flex items-center space-x-2 hover:gap-3 transition-all">
                <Award size={14} />
                <span>Kenyan Owned & Operated</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/size-guide" className="hover:gap-1 transition-all hover:underline">
                Size Guide
              </Link>
              <span className="opacity-50">|</span>
              <Link href="/shipping" className="hover:gap-1 transition-all hover:underline">
                Shipping
              </Link>
              <span className="opacity-50">|</span>
              <Link href="/returns" className="hover:gap-1 transition-all hover:underline">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden touch-target text-black hover:text-accent transition-colors rounded-md active-scale"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1.5 group flex-shrink-0">
              <img
                src="/IMG/logo3.png"
                alt="Luxury Culture Logo"
                className="h-12 w-auto lg:h-20 transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              />
              <div className="bg-gradient-to-br from-accent to-red-700 text-white px-2.5 py-1.5 lg:px-4 lg:py-2.5 rounded-md lg:rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group-hover:from-red-600 group-hover:to-red-800 border border-white/20 flex-shrink-0 whitespace-nowrap">
                <div className="text-[11px] md:text-xs lg:text-sm font-bold tracking-wider uppercase drop-shadow-md">
                  Luxury Culture
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center space-x-8">
                {navigation.map((item) => (
                  item.hasDropdown ? (
                    <li key={item.name} className="relative group">
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-accent py-2 ${
                          pathname === item.href
                            ? 'text-accent border-b-2 border-accent'
                            : 'text-black'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                      </Link>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-200 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="p-8">
                          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-6 text-accent">
                            Featured Collections
                          </h4>
                          <div className="space-y-3">
                            {item.name === 'Collections' && (
                              <>
                                <Link href="/collections/footwear" className="block p-3 hover:bg-accent/5 rounded-lg transition-all hover:translate-x-1 group/link">
                                  <p className="text-sm font-semibold text-black group-hover/link:text-accent transition-colors">Footwear</p>
                                  <p className="text-xs text-gray-500">Premium sneakers & kicks</p>
                                </Link>
                                <Link href="/collections/apparel" className="block p-3 hover:bg-accent/5 rounded-lg transition-all hover:translate-x-1 group/link">
                                  <p className="text-sm font-semibold text-black group-hover/link:text-accent transition-colors">Apparel</p>
                                  <p className="text-xs text-gray-500">Exclusive streetwear</p>
                                </Link>
                                <Link href="/collections/accessories" className="block p-3 hover:bg-accent/5 rounded-lg transition-all hover:translate-x-1 group/link">
                                  <p className="text-sm font-semibold text-black group-hover/link:text-accent transition-colors">Accessories</p>
                                  <p className="text-xs text-gray-500">Premium finishing touches</p>
                                </Link>
                              </>
                            )}
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <Link 
                              href={item.href} 
                              className="inline-flex items-center text-accent font-bold text-sm hover:gap-2 transition-all"
                            >
                              Explore All Collections <ChevronDown size={14} className="ml-2 rotate-180" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-colors hover:text-accent py-2 ${
                          pathname === item.href
                            ? 'text-accent border-b-2 border-accent'
                            : 'text-black'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-grid-2 py-grid-2 pl-10 border border-gray-200 rounded-md bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-white transition-all duration-200"
                  style={{ fontSize: '16px' }}
                />
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={18} 
                />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              <Link
                href="/account"
                className="touch-target text-black hover:text-accent hover:bg-gray-50 rounded-lg transition-all duration-200 active-scale"
                aria-label="Account"
              >
                <User size={22} />
              </Link>

              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative touch-target text-black hover:text-accent hover:bg-gray-50 rounded-lg transition-all duration-200 active-scale"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-grid-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-primary pl-10"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={18} 
              />
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="container-custom py-6">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-base font-medium transition-colors hover:text-accent py-2 ${
                    pathname === item.href ? 'text-accent' : 'text-black'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile Account Link */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link
                href="/account"
                className="flex items-center space-x-3 text-black hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span className="text-base font-medium">My Account</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
