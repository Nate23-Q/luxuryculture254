'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubscribed(true)
      setEmail('')
      toast.success('Thanks for subscribing! Check your email for confirmation.')
      
      setTimeout(() => setIsSubscribed(false), 5000)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="section-padding bg-accent text-primary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="bg-primary text-accent p-4 rounded-full w-fit mx-auto mb-6">
            <Mail size={32} />
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            STAY IN THE LOOP
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Be the first to know about exclusive drops, limited releases, and street culture news. 
            Join our community of 10,000+ sneakerheads.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-secondary rounded-lg border-0 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || isSubscribed}
                className="bg-primary text-accent hover:bg-secondary hover:text-primary whitespace-nowrap"
                size="md"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SUBSCRIBING...
                  </>
                ) : isSubscribed ? (
                  '✓ SUBSCRIBED'
                ) : (
                  'SUBSCRIBE'
                )}
              </Button>
            </div>
          </form>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-bold mb-2">EXCLUSIVE DROPS</h3>
              <p className="opacity-80">First access to limited releases and restocks</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-bold mb-2">STYLE TIPS</h3>
              <p className="opacity-80">Weekly styling guides and outfit inspiration</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-bold mb-2">SPECIAL OFFERS</h3>
              <p className="opacity-80">Member-only discounts and early sale access</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <p className="text-sm opacity-80 mb-4">
              Join over 10,000 sneaker enthusiasts who trust Luxury Culture for the latest drops
            </p>
            <div className="flex justify-center items-center space-x-8 text-xs opacity-60">
              <span>✓ No spam, ever</span>
              <span>✓ Unsubscribe anytime</span>
              <span>✓ Your data is safe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
