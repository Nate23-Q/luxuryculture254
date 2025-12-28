'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Home"
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight size={16} className="text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link 
              href={item.href}
              className="text-gray-500 hover:text-gray-700 transition-colors capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium capitalize" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}