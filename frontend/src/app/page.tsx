export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-pink-500">Legacy Vogue</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our exquisite collection of premium fashion and lifestyle products, 
            crafted with love and attention to detail.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors duration-200">
              Shop Now
            </button>
            <button className="px-8 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200">
              View Collection
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose Legacy Vogue?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-300">Handpicked fabrics and materials for the finest quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-300">Quick and secure delivery to your doorstep</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Customer Care</h3>
              <p className="text-gray-300">24/7 support to help you with any queries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
