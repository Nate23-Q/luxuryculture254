'use client'

export function BrandShowcase() {
  const brands = [
    { 
      name: 'Nike', 
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.205-1.848-.68-1.232-.68-2.464 0-3.696.68-1.232 1.749-1.848 3.205-1.848.989 0 2.212.309 3.668.925L24 7.8z"/>
        </svg>
      )
    },
    { 
      name: 'Jordan', 
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12.425 21.997c-.775 0-1.55-.3-2.137-.887L1.413 12.235c-1.175-1.175-1.175-3.1 0-4.275L10.288.887c.587-.587 1.362-.887 2.137-.887s1.55.3 2.137.887l8.875 8.875c1.175 1.175 1.175 3.1 0 4.275l-8.875 8.875c-.587.587-1.362.887-2.137.887z"/>
        </svg>
      )
    },
    { 
      name: 'Adidas', 
      logo: (
        <div className="text-2xl font-bold">A</div>
      )
    },
    { 
      name: 'ASICS', 
      logo: (
        <div className="text-xl font-bold">ASICS</div>
      )
    },
    { 
      name: 'Timberland', 
      logo: (
        <div className="text-lg font-bold">T</div>
      )
    },
    { 
      name: 'Nike SB', 
      logo: (
        <div className="text-lg font-bold">SB</div>
      )
    }
  ]

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-red-500"></div>
            <span className="text-xs font-bold tracking-widest text-accent uppercase">Official Retailer</span>
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-accent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Premium Brand Partners
          </h2>
          <p className="text-lg text-gray-600 font-medium">Authorized dealer for premium brands trusted worldwide</p>
        </div>
        
        <div className="overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-8 lg:p-12">
          <div className="flex animate-scroll space-x-12 lg:space-x-16">
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 text-center group">
                <div className="w-24 h-24 lg:w-28 lg:h-28 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-gray-200 shadow-lg group-hover:shadow-2xl group-hover:border-accent transition-all duration-300 group-hover:scale-110">
                  <div className="text-accent text-3xl group-hover:scale-125 transition-transform duration-300">{brand.logo}</div>
                </div>
                <p className="text-base font-bold text-gray-800 group-hover:text-accent transition-colors">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Statement */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm font-medium max-w-2xl mx-auto">
            Every product is 100% authentic and verified by our expert team. We partner only with authorized distributors to ensure quality and authenticity.
          </p>
        </div>
      </div>
    </section>
  )
}