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
            <img
              src="/logo2.png"
              alt="Shop JR Logo"
              className="h-20 w-auto"
            />
            <div className="bg-accent text-primary px-3 py-2 rounded-lg font-display font-bold text-xl lg:text-2xl">
              LUXURY CULTURE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center space-x-8">
              {navigation.map((item) => (
                item.name.toLowerCase() === 'footwear' ? (
                  <li key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-accent ${
                        pathname === item.href
                          ? 'text-accent border-b-2 border-accent pb-1'
                          : 'text-secondary'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Footwear Dropdown panel */}
                    <div className="absolute left-0 mt-3 w-[820px] bg-primary border border-secondary shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                      <div className="flex">
                        <div className="w-1/3 border-r border-secondary p-6">
                          <h4 className="text-xs font-semibold text-secondary-600 uppercase mb-3">Shop All Footwear</h4>
                          <ul className="space-y-2 text-sm text-secondary">
                            <li><Link href="/shop?brand=" className="hover:text-accent">Brand</Link></li>
                            <li><Link href="/shop?gender=" className="hover:text-accent">Gender</Link></li>
                            <li><Link href="/shop?category=footwear" className="hover:text-accent">Categories</Link></li>
                            <li><Link href="/shop?bestseller=true" className="hover:text-accent">Bestseller</Link></li>
                          </ul>
                        </div>

                        <div className="w-2/3 p-6 grid grid-cols-3 gap-4">
                          <Link href="/shop?category=sneakers" className="block p-3 hover:bg-secondary-100 rounded">
                            <p className="text-sm font-medium">Sneakers</p>
                          </Link>
                          <Link href="/shop?category=boots" className="block p-3 hover:bg-secondary-100 rounded">
                            <p className="text-sm font-medium">Boots</p>
                          </Link>
                          <Link href="/shop?category=slipons" className="block p-3 hover:bg-secondary-100 rounded">
                            <p className="text-sm font-medium">Slip-ons</p>
                          </Link>
                          <Link href="/shop?category=running" className="block p-3 hover:bg-secondary-100 rounded">
                            <p className="text-sm font-medium">Running</p>
                          </Link>
                          <Link href="/shop?category=court" className="block p-3 hover:bg-secondary-100 rounded">
                            <p className="text-sm font-medium">Court</p>
                          </Link>
                          <Link href="/shop?category=high-tops" className="block p-3 hover:bg-secondary-100 rounded">
                            <p className="text-sm font-medium">High Tops</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : item.name.toLowerCase() === 'apparel' ? (
                  <li key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-accent ${
                        pathname === item.href
                          ? 'text-accent border-b-2 border-accent pb-1'
                          : 'text-secondary'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Apparel Dropdown panel with image */}
                    <div className="absolute left-0 mt-3 w-[920px] bg-primary border border-secondary shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                      <div className="flex">
                        <div className="w-2/3 p-6 grid grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-600 uppercase mb-3">Shop All Apparel</h4>
                            <ul className="space-y-2 text-sm text-secondary">
                              <li><Link href="/shop?brand=adidas" className="hover:text-accent">Adidas</Link></li>
                              <li><Link href="/shop?brand=nike" className="hover:text-accent">Nike</Link></li>
                              <li><Link href="/shop?brand=new-balance" className="hover:text-accent">New Balance</Link></li>
                              <li><Link href="/shop?brand=puma" className="hover:text-accent">Puma</Link></li>
                              <li><Link href="/shop?brand=restyle" className="hover:text-accent">Restyle</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-600 uppercase mb-3">Gender</h4>
                            <ul className="space-y-2 text-sm text-secondary">
                              <li><Link href="/shop?gender=mens" className="hover:text-accent">Mens</Link></li>
                              <li><Link href="/shop?gender=womens" className="hover:text-accent">Womens</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-600 uppercase mb-3">Categories</h4>
                            <ul className="space-y-2 text-sm text-secondary">
                              <li><Link href="/shop?category=tops" className="hover:text-accent">Tops</Link></li>
                              <li><Link href="/shop?category=bottoms" className="hover:text-accent">Bottoms</Link></li>
                              <li><Link href="/shop?category=outerwear" className="hover:text-accent">Outerwear</Link></li>
                              <li><Link href="/shop?category=accessories" className="hover:text-accent">Accessories</Link></li>
                            </ul>
                          </div>
                        </div>

                        <div className="w-1/3 p-6 flex items-center justify-center">
                          <div className="relative w-full">
                            <img src="/logo2.png" alt="Apparel" className="w-full h-64 object-cover rounded" />
                            <Link href="/shop?category=apparel" className="absolute left-4 bottom-4 bg-primary border border-secondary px-3 py-2 rounded text-sm">Shop</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : item.name.toLowerCase() === 'accessories' ? (
                  <li key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-accent ${
                        pathname === item.href
                          ? 'text-accent border-b-2 border-accent pb-1'
                          : 'text-secondary'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Accessories Dropdown panel with image */}
                    <div className="absolute left-0 mt-3 w-[920px] bg-primary border border-secondary shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                      <div className="flex">
                        <div className="w-2/3 p-6 grid grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-600 uppercase mb-3">Shop All Accessories</h4>
                            <ul className="space-y-2 text-sm text-secondary">
                              <li><Link href="/shop?category=accessories" className="hover:text-accent">All Accessories</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-600 uppercase mb-3">Brand</h4>
                            <ul className="space-y-2 text-sm text-secondary">
                              <li><Link href="/shop?brand=puma" className="hover:text-accent">Puma</Link></li>
                              <li><Link href="/shop?brand=nike" className="hover:text-accent">Nike</Link></li>
                              <li><Link href="/shop?brand=restyle" className="hover:text-accent">Restyle</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-600 uppercase mb-3">Categories</h4>
                            <ul className="space-y-2 text-sm text-secondary">
                              <li><Link href="/shop?category=accessories&sub=bags" className="hover:text-accent">Bags</Link></li>
                              <li><Link href="/shop?category=accessories&sub=hats" className="hover:text-accent">Hats</Link></li>
                              <li><Link href="/shop?category=accessories&sub=belts" className="hover:text-accent">Belts</Link></li>
                            </ul>
                          </div>
                        </div>

                        <div className="w-1/3 p-6 flex items-center justify-center">
                          <div className="relative w-full">
                            <img src="/logo.jpeg" alt="Accessories" className="w-full h-64 object-cover rounded" />
                            <Link href="/shop?category=accessories" className="absolute left-4 bottom-4 bg-primary border border-secondary px-3 py-2 rounded text-sm">All Accessories</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-accent ${
                        pathname === item.href
                          ? 'text-accent border-b-2 border-accent pb-1'
                          : 'text-secondary'
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
