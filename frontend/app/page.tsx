'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carouselImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBcc6ermsNopuVOYYGK438GRcfA5MttZQtKagXKpaMbMzaB3hR-hjHfBHhX6VaauzioZZ8N8i_OvPa8EZB_YrxJeYmFCVY52_iX6sWKtdKaxe-A-zrQCa6uPZLIgznzcUJ_hHO-o5P_5jaEGfvHLaRZOE63d-sRwxQrUZvKzbSCv1A_D6AbWkPMfp6T6QJGSn1MM8hcNO9_NgVB1wyFx1wXQVkH_c-d4k0jo4A2nVvg-A15GXT-kbnzJ9gTZF9LskArRbK3lRkjbSU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDq59jQeT7bPN7yhWuirfggdwW27KHnoobViAz9wImUjeFb7J-XfzlzHUkBBlvu7s6M3a06a71jE4K5ZxIMsuhRzBe98a8VAMbb_RR37TZ_T1denbacMiEUNcTAYEwl2AIG2zxgNy38NwL8a_ndgSe86pcLpopiGr7L9aqu-QqC6yb2f-BK2oIN9pNDGw7GxNevfsjW3UPpjRr4r9hIQPa4-NtSXCWbVxc3er5oWGyFyI8Ex0uC81yq2cdedZM4V-SdtOTee4WoaOU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgjERiSf1IQ_-if8Zn8AZcbrrPGenphaIlqIj0N8BL_M1OHXF2I2CWjbI9WPd2JompIYkAmdUCA4z3oVkf8ykUIyCifQd8W3tHOlwEzCJrrQ5Cn1Lsc4iUJVrlO5tihZi1h6GCKQwo_x1tlUzBVELshPPfYn57N-jUg_Q4y9B9EAoy6sI0TwjmD2V0SzdQ262alwK-6TKqOSBiZjqaVINMcDNkZGM22VQ8zf6AopHFcz0Nh3RYXVIJ5H-7emvhkyyusthIDB2W8RM"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .carousel-item {
          transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
        }
      `}</style>
      
      <div className="relative flex min-h-screen w-full flex-col bg-[#FFF8F0] font-body text-[#1A020D] dark:bg-[#1A020D] dark:text-[#FFF8F0]">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-[#8A0F4F]/20 bg-[#FFF8F0]/80 px-10 py-4 backdrop-blur-sm dark:bg-[#1A020D]/80">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2 text-[#8A0F4F]">
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                <h2 className="font-display text-3xl font-bold" style={{fontFamily: 'Playfair Display, serif'}}>Legacy Vogue</h2>
              </div>
              <nav className="hidden items-center gap-8 md:flex">
                <a href="#" className="text-sm font-medium transition-colors hover:text-[#8A0F4F]">Home</a>
                <a href="#" className="text-sm font-medium transition-colors hover:text-[#8A0F4F]">Collections</a>
                <a href="#" className="text-sm font-medium transition-colors hover:text-[#8A0F4F]">About Us</a>
                <a href="#" className="text-sm font-medium transition-colors hover:text-[#8A0F4F]">Contact</a>
              </nav>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="relative hidden lg:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8A0F4F]/60">search</span>
                <input 
                  className="w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full border border-[#8A0F4F]/30 bg-transparent px-10 py-2 text-sm placeholder:text-[#8A0F4F]/60 focus:border-[#8A0F4F] focus:ring-[#8A0F4F]/50" 
                  placeholder="Search for sarees..." 
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#8A0F4F]/10 lg:hidden">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#8A0F4F]/10">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8A0F4F] text-xs font-bold text-white">3</span>
                </button>
              </div>
              <button className="group relative">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 transition-transform duration-300 group-hover:scale-110" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQT2c5zEeEOW6ypr1pLIqN8POWMa3ny0CQ-XpxjlYVkxHH21WRlQryfARNj7ZFydIEFOSbUGT12fLxoBMk8arIgHV0lhOGnmPi9BCyPEFaY_Syqw4Ix6hX2JGBGnnk3xvooNHLC0Uoz-DLASz1iaq0qCfbtGMChfATsGHa9D9xFJpLTBJAE9Ci4R4rebYkw1I9trpIYpijZMJZGj-zbbsWzvnqqlJX_iVKZdkOJHKIVzoEURJeFnVSgPPXvucrh22ApKPlM5-q46s")'}}
                ></div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] ring-2 ring-[#FFF8F0] dark:ring-[#1A020D]">
                  <span className="material-symbols-outlined text-xs text-white">star</span>
                </span>
              </button>
            </div>
          </header>

          <main className="flex-1">
            {/* Hero Section */}
            <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
              <div className="absolute inset-0 carousel-container">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item absolute inset-0 bg-cover bg-center ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{backgroundImage: `url("${image}")`}}
                  ></div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A020D]/70 via-[#1A020D]/30 to-transparent"></div>
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 text-center text-white">
                <h1 className="fade-in text-5xl font-black tracking-tight md:text-8xl" style={{fontFamily: 'Playfair Display, serif', animationDelay: '200ms'}}>
                  Where Tradition Meets Trend
                </h1>
                <p className="fade-in max-w-2xl text-lg text-white/80" style={{animationDelay: '400ms'}}>
                  Experience the exquisite artistry of handcrafted sarees that tell a story of heritage and grace.
                </p>
                <button className="fade-in group flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#8A0F4F] px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#8A0F4F]/90 hover:shadow-2xl hover:scale-105" style={{animationDelay: '600ms'}}>
                  <span>Explore Our Collection</span>
                  <span className="material-symbols-outlined ml-2 transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                </button>
              </div>
            </section>

            {/* Featured Collections */}
            <section className="px-4 py-24 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-[#8A0F4F] md:text-5xl" style={{fontFamily: 'Playfair Display, serif'}}>Featured Collections</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A020D]/80 dark:text-[#FFF8F0]/80">Curated with passion, our collections embody elegance and sophistication.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
                  <div className="group relative flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="h-96 w-full overflow-hidden">
                      <div 
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110" 
                        style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgjERiSf1IQ_-if8Zn8AZcbrrPGenphaIlqIj0N8BL_M1OHXF2I2CWjbI9WPd2JompIYkAmdUCA4z3oVkf8ykUIyCifQd8W3tHOlwEzCJrrQ5Cn1Lsc4iUJVrlO5tihZi1h6GCKQwo_x1tlUzBVELshPPfYn57N-jUg_Q4y9B9EAoy6sI0TwjmD2V0SzdQ262alwK-6TKqOSBiZjqaVINMcDNkZGM22VQ8zf6AopHFcz0Nh3RYXVIJ5H-7emvhkyyusthIDB2W8RM")'}}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-bold" style={{fontFamily: 'Playfair Display, serif'}}>The Royal Weave</h3>
                      <p className="mt-2 text-white/90">Masterpieces of silk and gold.</p>
                      <a className="mt-4 inline-block font-semibold text-[#D4AF37] transition-transform group-hover:translate-x-1" href="#">
                        View Collection <span className="font-sans ml-1">→</span>
                      </a>
                    </div>
                  </div>
                  <div className="group relative flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 md:mt-12">
                    <div className="h-96 w-full overflow-hidden">
                      <div 
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110" 
                        style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDq59jQeT7bPN7yhWuirfggdwW27KHnoobViAz9wImUjeFb7J-XfzlzHUkBBlvu7s6M3a06a71jE4K5ZxIMsuhRzBe98a8VAMbb_RR37TZ_T1denbacMiEUNcTAYEwl2AIG2zxgNy38NwL8a_ndgSe86pcLpopiGr7L9aqu-QqC6yb2f-BK2oIN9pNDGw7GxNevfsjW3UPpjRr4r9hIQPa4-NtSXCWbVxc3er5oWGyFyI8Ex0uC81yq2cdedZM4V-SdtOTee4WoaOU")'}}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-bold" style={{fontFamily: 'Playfair Display, serif'}}>Pastel Dreams</h3>
                      <p className="mt-2 text-white/90">Subtle hues for modern elegance.</p>
                      <a className="mt-4 inline-block font-semibold text-[#D4AF37] transition-transform group-hover:translate-x-1" href="#">
                        View Collection <span className="font-sans ml-1">→</span>
                      </a>
                    </div>
                  </div>
                  <div className="group relative flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="h-96 w-full overflow-hidden">
                      <div 
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110" 
                        style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJDmT9WDURAjsNkIiTwfr6BrgAKIhYlgFecTQnTnSeqIaUUlCiPDhI0pcZZI4QiSGBTZSuKFgzqZeo6ZeyPQtcuQoNKmzhT8UFOwe1rOTj7Ai417oNP9G06QL8vNiV7Zlucv91cWkBHANtwIwxp09DdyR0RsVIajtBgX30Fuh9euEs2fjAMBDK54aHOBR3fWcnmC_02s5sVC0LPBV982_fhILV_pM9XbJPo7PkdItX5FlnXJB0X70cNNR_Mr4WmYM9c3fNeM36w5c")'}}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-bold" style={{fontFamily: 'Playfair Display, serif'}}>Floral Fantasy</h3>
                      <p className="mt-2 text-white/90">Nature's beauty woven in thread.</p>
                      <a className="mt-4 inline-block font-semibold text-[#D4AF37] transition-transform group-hover:translate-x-1" href="#">
                        View Collection <span className="font-sans ml-1">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shop by Occasion */}
            <section className="bg-[#8A0F4F]/5 px-4 py-24 dark:bg-[#8A0F4F]/10 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-[#8A0F4F] md:text-5xl" style={{fontFamily: 'Playfair Display, serif'}}>Shop by Occasion</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A020D]/80 dark:text-[#FFF8F0]/80">Find the perfect saree for every moment.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg">
                    <div 
                      className="h-80 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                      style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArzfR1jAXodmnUuwVbBaDDNbrSK6TllKVLR2yHQCWMNolGEaatUiY7gbOhzW9JOrt0L6gh0N-OpaMU2OMizqq-Oo6UOP08u8SedwLcJmorgo8D6CE5uEJ-21PASj2D-V08Zs0y7TLyFQ_V1NWwGU8h3C-PYmfCsh25rTSBkW1YpwUrE4YCWsz5sqfMw3vM5092bAafiVWc3gS1PYNkz-NsvDPERnM3UkXDO4dAm8absUDnYWIihcAfe8U5xcFGF0bT8qjU4vik0T0")'}}
                    ></div>
                    <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/50"></div>
                    <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-2" style={{fontFamily: 'Playfair Display, serif'}}>Weddings</h3>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg">
                    <div 
                      className="h-80 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                      style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpILIa0zMo5Teczd_9-llHFH4Nv2fFEV4xu-0fSH7iyTk2uj-OjrfekOG-A3A2rZqjoQ2ZI9dHse2qceVAjWUGAoAtechM0XKe0k4PZvT3dDu1g7utGaALPJsn166OKxtmiu32qwMH0YRkgCFiOpmWtH6yYkhie4eerYJsccerwv2CqNdzRml8v10lGrkAclgLwPJIFxbTGzt92KUAXq8IKu7tE6AWahcFtuKcWVbkQY5_Jx5nfQ9X0avD29VS9ZwSV6G0wJH8Z2Q")'}}
                    ></div>
                    <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/50"></div>
                    <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-2" style={{fontFamily: 'Playfair Display, serif'}}>Festivals</h3>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg">
                    <div 
                      className="h-80 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                      style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSrvL17LN8UTInA93DScq4FIPecbEqACeGULXW2msolkoW0nAklcqQxfBgX_Wb4bAjFJC-hT0vsZ9yqi6-aIOY_tj9rWRV9NoZZ3rR53n4rXSqE97dZChyqoRJ-mhhyhkwNDsddAHWKV4XE8NL_OR7yjzwOWcuMRgDigiosL4q7wp0-emhJayNEO-rhuk3lYJii30fuwQagwwTT-uBVr0GFBPzNHRaGVTzRnUbHPqSZSEq_EZ43coYBmOgLkkmXRmIhRri8mtuda0")'}}
                    ></div>
                    <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/50"></div>
                    <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-2" style={{fontFamily: 'Playfair Display, serif'}}>Parties</h3>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-t border-[#8A0F4F]/20 bg-[#FFF8F0] dark:bg-[#1A020D]">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-2 text-[#8A0F4F]">
                    <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                    <h2 className="text-2xl font-bold" style={{fontFamily: 'Playfair Display, serif'}}>Legacy Vogue</h2>
                  </div>
                  <p className="text-sm text-[#1A020D]/70 dark:text-[#FFF8F0]/70">© 2024 Legacy Vogue. All rights reserved.</p>
                  <div className="mt-4 flex gap-4">
                    <a className="text-[#1A020D]/70 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/70" href="#">
                      <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                    <a className="text-[#1A020D]/70 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/70" href="#">
                      <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-[#1A020D]/70 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/70" href="#">
                      <svg className="h-6 w-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-2.7-1.1-5.4-1.1-8.1 0-2.7 1.1-5.4 1.1-8.1 0C4.2 8.6 5.4 6.8 7 5.4c-1.3-1.3-2-3.4-2-3.4s4.6 2.9 8 2.9c3.4 0 7-2.9 7-2.9z"></path>
                        <path d="M12 12c-3.6 0-6.7 1.8-8.5 4.2C5.1 19.3 8.3 21 12 21s6.9-1.7 8.5-4.8C18.7 13.8 15.6 12 12 12z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[#8A0F4F]" style={{fontFamily: 'Playfair Display, serif'}}>Shop</h3>
                      <ul className="mt-4 space-y-3 text-sm">
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">New Arrivals</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Best Sellers</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Silk Sarees</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Cotton Sarees</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#8A0F4F]" style={{fontFamily: 'Playfair Display, serif'}}>About</h3>
                      <ul className="mt-4 space-y-3 text-sm">
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Our Story</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Artisans</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Blog</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Careers</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#8A0F4F]" style={{fontFamily: 'Playfair Display, serif'}}>Support</h3>
                      <ul className="mt-4 space-y-3 text-sm">
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Contact Us</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">FAQs</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Shipping & Returns</a></li>
                        <li><a className="text-[#1A020D]/80 transition-colors hover:text-[#8A0F4F] dark:text-[#FFF8F0]/80" href="#">Privacy Policy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
