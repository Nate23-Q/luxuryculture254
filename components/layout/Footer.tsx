'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
  ]

  const resourceLinks = [
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'FAQ', href: '/faq' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/shopjr' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/shopjr' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/shopjr' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/shopjr' },
  ]

  return (
    <footer className="bg-secondary text-primary mt-16">
      {/* Newsletter Section */}
      <div className="bg-accent text-primary py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              STAY IN THE LOOP
            </h3>
            <p className="text-sm mb-6 opacity-90">
              Be the first to know about new drops, exclusive offers, and street culture news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 text-secondary rounded-lg border-0 focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-accent px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:bg-secondary hover:text-primary"
              >
                SUBSCRIBE
              </button>
            </form>
            {isSubscribed && (
              <p className="text-sm mt-4 text-primary font-medium">
                ✓ Thanks for subscribing! Check your email for confirmation.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Contact */}
            <div className="lg:col-span-1">
              <div className="bg-accent text-primary px-4 py-2 rounded-lg font-display font-bold text-xl inline-block mb-6">
                SHOP JR
              </div>
              <p className="text-sm mb-6 opacity-90">
                Your ultimate destination for premium sneakers and streetwear. 
                Representing the culture, one drop at a time.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={16} />
                  <span className="text-sm">support@shopjr.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} />
                  <span className="text-sm">+254 700 000 000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={16} />
                  <span className="text-sm">Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg mb-4">COMPANY</h4>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-lg mb-4">RESOURCES</h4>
              <ul className="space-y-2">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-lg mb-4">LEGAL</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="border-t border-primary-700 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-90">FOLLOW US:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary-800 hover:bg-accent hover:text-primary rounded-lg transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent size={18} />
                  </a>
                )
              })}
            </div>

            {/* Copyright */}
            <div className="text-sm opacity-90 text-center md:text-right">
              <p>&copy; {currentYear} SHOP JR. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ in Nairobi</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
