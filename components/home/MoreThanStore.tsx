'use client'

export function MoreThanStore() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <div className="mb-8">
          <h2 className="text-sm font-bold text-secondary-600 uppercase tracking-wide mb-2">
            MORE THAN A STORE 🏪
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Community */}
          <div className="relative group cursor-pointer">
            <div className="aspect-[4/5] bg-secondary-100 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                alt="Community member"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-bold text-lg">COMMUNITY</h3>
              <p className="text-white text-sm opacity-90">
                Join our community of sneaker enthusiasts and culture
              </p>
            </div>
          </div>

          {/* Collaboration */}
          <div className="relative group cursor-pointer">
            <div className="aspect-[4/5] bg-secondary-100 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop"
                alt="Collaboration workspace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-bold text-lg">COLLABORATION</h3>
              <p className="text-white text-sm opacity-90">
                Working with brands and artists to bring unique culture
              </p>
            </div>
          </div>

          {/* Authenticity */}
          <div className="relative group cursor-pointer">
            <div className="aspect-[4/5] bg-secondary-100 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop"
                alt="Authentic sneakers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-bold text-lg">AUTHENTICITY</h3>
              <p className="text-white text-sm opacity-90">
                100% authentic products. Real Kicks for real enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}