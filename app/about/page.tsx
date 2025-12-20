export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-lg mb-8">About Luxury Culture</h1>
          
          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-body mb-4">
                Luxury Culture was founded with a simple mission: to bring the latest and greatest in sneaker culture 
                to Kenya and beyond. We believe that great footwear is more than just shoes – it's a statement, 
                a lifestyle, and a way to express your unique personality.
              </p>
              <p className="text-body">
                From the bustling streets of Nairobi to the global sneaker community, we curate the finest 
                selection of premium sneakers and streetwear that represent quality, style, and authenticity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <div className="bg-accent text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">🏆</span>
                </div>
                <h3 className="font-bold mb-2">Premium Quality</h3>
                <p className="text-sm text-secondary-600">
                  Only authentic products from trusted brands and authorized retailers.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="bg-accent text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">🚚</span>
                </div>
                <h3 className="font-bold mb-2">Fast Delivery</h3>
                <p className="text-sm text-secondary-600">
                  Quick and reliable delivery across Kenya with tracking support.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="bg-accent text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">💯</span>
                </div>
                <h3 className="font-bold mb-2">Customer First</h3>
                <p className="text-sm text-secondary-600">
                  Exceptional customer service and 30-day return policy.
                </p>
              </div>
            </div>

            <div className="card p-8 bg-secondary text-primary">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Visit Our Store</h3>
                  <p className="text-sm">
                    Westlands, Nairobi<br />
                    Kenya<br />
                    Open: Mon-Sat 9AM-7PM
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Get In Touch</h3>
                  <p className="text-sm">
                    📞 +254 700 000 000<br />
                    📧 support@shopjr.com<br />
                    🌐 www.Luxury Culture.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}