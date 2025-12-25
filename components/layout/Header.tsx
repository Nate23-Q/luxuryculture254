'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Footwear', href: '/collections/footwear', hasDropdown: true },
  { name: 'Apparel', href: '/collections/apparel', hasDropdown: true },
  { name: 'Accessories', href: '/collections/accessories', hasDropdown: true },
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-accent text-white text-center py-2 text-sm font-medium tracking-wide">
        ALL PRICE WILL HAVE 10% DISCOUNT ON THE WEBSITE AS END OF THE YEAR PROMO
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-black hover:text-accent transition-colors rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/logo3.png"
                alt="Luxury Culture Logo"
                className="h-20 w-auto"
              />
              <div className="bg-accent text-white px-6 py-3 rounded-xl shadow-lg">
                <div className="text-sm font-bold tracking-widest uppercase">
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
                      <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-6">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Shop All {item.name}
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {item.name === 'Footwear' && (
                              <>
                                <Link href="/shop?category=sneakers" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Sneakers</p>
                                </Link>
                                <Link href="/shop?category=boots" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Boots</p>
                                </Link>
                                <Link href="/shop?category=running" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Running</p>
                                </Link>
                                <Link href="/shop?category=court" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Court</p>
                                </Link>
                              </>
                            )}
                            {item.name === 'Apparel' && (
                              <>
                                <Link href="/shop?category=tops" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Tops</p>
                                </Link>
                                <Link href="/shop?category=bottoms" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Bottoms</p>
                                </Link>
                                <Link href="/shop?category=outerwear" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Outerwear</p>
                                </Link>
                                <Link href="/shop?category=hoodies" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Hoodies</p>
                                </Link>
                              </>
                            )}
                            {item.name === 'Accessories' && (
                              <>
                                <Link href="/shop?category=bags" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Bags</p>
                                </Link>
                                <Link href="/shop?category=hats" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Hats</p>
                                </Link>
                                <Link href="/shop?category=belts" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Belts</p>
                                </Link>
                                <Link href="/shop?category=jewelry" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                                  <p className="text-sm font-medium text-black">Jewelry</p>
                                </Link>
                              </>
                            )}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <Link 
                              href={item.href} 
                              className="text-accent text-sm font-medium hover:text-accent-600 transition-colors"
                            >
                              View All {item.name} →
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
                  className="w-80 px-4 py-2.5 pl-10 border border-gray-200 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-white transition-all duration-200"
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
                className="p-2.5 text-black hover:text-accent hover:bg-gray-50 rounded-lg transition-all duration-200"
                aria-label="Account"
              >
                <User size={22} />
              </Link>

              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 text-black hover:text-accent hover:bg-gray-50 rounded-lg transition-all duration-200"
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
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-white transition-all duration-200"
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
