'use client'

import { useState, useEffect } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function EndOfYearPromo() {
  const [timeLeft, setTimeLeft] = useState({ days: 11, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const target = new Date('2025-01-05T23:59:59')
      const diff = target.getTime() - now.getTime()
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white">
      <div className="relative z-10 py-16 px-4">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Clock className="h-4 w-4" />
            LIMITED TIME OFFER
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-black mb-4 leading-tight">
            <span className="block text-yellow-300">END OF YEAR</span>
            <span className="block">DISCOUNT PROMO SALE</span>
          </h1>

          <div className="inline-block bg-black text-white px-8 py-4 rounded-2xl mb-6">
            <span className="text-4xl lg:text-6xl font-black">UP TO 10% OFF</span>
          </div>

          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto font-medium">
            The Offer sale of the year! Premium sneakers, streetwear & accessories at unbeatable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/shop" 
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-black text-lg hover:bg-yellow-300 hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              SHOP NOW
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/new-arrivals" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              VIEW NEW ARRIVALS
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}