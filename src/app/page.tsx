'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Falling coal particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-600 rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        {/* Glowing ember effects */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-orange-500 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent">
                  AMERU
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 mx-auto mb-6"></div>
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                Premium Coal Trading & Mining Solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-black bg-opacity-30 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-orange-400 text-lg font-semibold mb-2">High Quality</h3>
                <p className="text-gray-300 text-sm">Premium coal with low impurities and high energy output</p>
              </div>
              
              <div className="bg-black bg-opacity-30 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-orange-400 text-lg font-semibold mb-2">Reliable Supply</h3>
                <p className="text-gray-300 text-sm">Consistent delivery and dependable quality assurance</p>
              </div>
              
              <div className="bg-black bg-opacity-30 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-orange-400 text-lg font-semibold mb-2">Sustainable</h3>
                <p className="text-gray-300 text-sm">Modern mining practices with environmental responsibility</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 animate-slide-in">
              Why Choose <span className="text-orange-400">Ameru Coal</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="bg-black bg-opacity-30 p-6 rounded-lg border-l-4 border-orange-500 hover:bg-opacity-40 transition-all duration-300">
                    <h3 className="text-orange-400 font-semibold mb-2 hover:text-yellow-300 transition-colors">Superior Quality</h3>
                    <p className="text-gray-300 text-sm">Our coal undergoes rigorous quality control to ensure maximum energy output and minimal impurities, providing you with the most efficient fuel source available.</p>
                  </div>
                  
                  <div className="bg-black bg-opacity-30 p-6 rounded-lg border-l-4 border-yellow-500 hover:bg-opacity-40 transition-all duration-300">
                    <h3 className="text-yellow-400 font-semibold mb-2 hover:text-orange-300 transition-colors">Competitive Pricing</h3>
                    <p className="text-gray-300 text-sm">Direct sourcing and efficient operations allow us to offer premium quality coal at market-competitive prices, maximizing your value.</p>
                  </div>
                  
                  <div className="bg-black bg-opacity-30 p-6 rounded-lg border-l-4 border-red-500 hover:bg-opacity-40 transition-all duration-300">
                    <h3 className="text-red-400 font-semibold mb-2 hover:text-pink-300 transition-colors">Bulk Solutions</h3>
                    <p className="text-gray-300 text-sm">Whether you need small quantities or large-scale industrial supply, we provide flexible solutions tailored to your specific requirements.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative mining-drill">
                <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl shadow-2xl border border-gray-700">
                  <div className="text-center">
                    <div className="text-6xl mb-4 hover:animate-shake cursor-pointer">⛏️</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Mining Excellence</h3>
                    <p className="text-gray-300 mb-6">With decades of experience in the coal industry, Ameru has established itself as a leader in quality and reliability.</p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-black bg-opacity-30 p-4 rounded-lg hover:bg-opacity-40 transition-all">
                        <div className="text-2xl font-bold text-orange-400">50+</div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                      </div>
                      <div className="bg-black bg-opacity-30 p-4 rounded-lg hover:bg-opacity-40 transition-all">
                        <div className="text-2xl font-bold text-yellow-400">1000+</div>
                        <div className="text-sm text-gray-400">Satisfied Clients</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 animate-slide-in">
              Our <span className="text-orange-400">Services</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏭</div>
                <h3 className="text-xl font-bold text-white mb-4">Industrial Coal Supply</h3>
                <p className="text-gray-300 mb-6">Large-scale coal supply for power plants, steel mills, and industrial facilities with consistent quality and reliable delivery schedules.</p>
                <div className="flex items-center text-orange-400 font-semibold">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚢</div>
                <h3 className="text-xl font-bold text-white mb-4">Export Solutions</h3>
                <p className="text-gray-300 mb-6">International coal export services with global logistics support, quality certification, and competitive pricing for overseas markets.</p>
                <div className="flex items-center text-yellow-400 font-semibold">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔄</div>
                <h3 className="text-xl font-bold text-white mb-4">Custom Blending</h3>
                <p className="text-gray-300 mb-6">Specialized coal blending services to meet specific energy requirements, ash content, and combustion characteristics for various applications.</p>
                <div className="flex items-center text-red-400 font-semibold">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Power Your Business?</h3>
                <p className="text-gray-400 mb-6">Contact us today to discuss your coal requirements and get a personalized quote.</p>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <span className="text-orange-400 mr-3">📧</span>
                    <span>contact@amerucoal.com</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">📞</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-red-400 mr-3">📍</span>
                    <span>123 Mining Way, Coal City, CC 12345</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4">Get a Quote</h4>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <textarea 
                    placeholder="Your Requirements" 
                    rows={4}
                    className="w-full p-3 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
                  >
                    Request Quote
                  </button>
                </form>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400">© 2024 Ameru Coal. Powering Industries with Quality and Reliability.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(-1deg); }
          50% { transform: translateX(2px) rotate(1deg); }
          75% { transform: translateX(-2px) rotate(1deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-pulse {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        
        .hover\:animate-shake:hover {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.8s ease-out;
        }
        
        /* Mining equipment animation */
        @keyframes miningDrill {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        .mining-drill {
          animation: miningDrill 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
