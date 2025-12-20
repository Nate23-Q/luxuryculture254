'use client'

export function BrandShowcase() {
  const brands = [
    { name: 'Nike', logo: '✓' },
    { name: 'Adidas', logo: '⚡' },
    { name: 'Jordan', logo: '🏀' },
    { name: 'Converse', logo: '⭐' },
    { name: 'Vans', logo: '🛹' },
    { name: 'New Balance', logo: 'N' }
  ]

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Official Retailer</h2>
          <p className="text-body">Authorized dealer for premium brands</p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2 border border-secondary-200">
                <span className="text-2xl">{brand.logo}</span>
              </div>
              <p className="text-sm font-medium text-secondary-700">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}