'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchButtonRef = useRef<HTMLButtonElement>(null);
  const desktopSearchButtonRef = useRef<HTMLButtonElement>(null);
  const isTogglingRef = useRef(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sarees', href: '/sarees' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Set active link based on current path
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentLink = navLinks.find(link => link.href === currentPath);
    if (currentLink) {
      setActiveLink(currentLink.name);
    } else if (currentPath === '/') {
      setActiveLink('Home');
    } else {
      setActiveLink('');
    }
  }, []);

  // Handle search expansion
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isTogglingRef.current) return;
    isTogglingRef.current = true;
    
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
    
    // Reset the toggling flag after a short delay
    setTimeout(() => {
      isTogglingRef.current = false;
    }, 150);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Here you can implement search logic
      console.log('Searching for:', searchQuery);
      // For now, just close the search
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Add a small delay to prevent conflicts with button clicks
      setTimeout(() => {
        if (isSearchExpanded && !isTogglingRef.current) {
          const target = event.target as Node;
          const isClickOnSearchInput = searchInputRef.current?.contains(target);
          const isClickOnMobileButton = mobileSearchButtonRef.current?.contains(target);
          const isClickOnDesktopButton = desktopSearchButtonRef.current?.contains(target);
          
          if (!isClickOnSearchInput && !isClickOnMobileButton && !isClickOnDesktopButton) {
            setIsSearchExpanded(false);
            setSearchQuery('');
          }
        }
      }, 50);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false);
        setSearchQuery('');
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSearchExpanded]);

  const mobileNavItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" fill={isActive ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'Sarees', 
      href: '/sarees', 
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    { 
      name: 'Wishlist', 
      href: '/wishlist', 
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      name: 'Cart', 
      href: '/cart', 
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    { 
      name: 'Profile', 
      href: '/profile', 
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 bg-[#1A0A1A] text-white px-4 py-4 border-b border-gray-800 z-40">
        <div className="flex items-center justify-between">
          {/* Company Name */}
          <Link 
            href="/" 
            onClick={() => setActiveLink('Home')}
            className={`text-lg font-semibold transition-all duration-300 ease-out cursor-pointer ${
              isSearchExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}
          >
            <span className="font-bold">Legacy</span> <span className="font-bold">Vogue</span>
          </Link>
          
          {/* Search Container */}
          <div className="flex items-center">
             {/* Search Input Container */}
             <div className={`relative overflow-hidden transition-all duration-300 ease-out ${
               isSearchExpanded ? 'w-full mr-2' : 'w-0 mr-0'
             }`}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className={`w-full px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ease-out ${
                    isSearchExpanded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </form>
            </div>
            
            {/* Search Icon Button */}
            <button 
              ref={mobileSearchButtonRef}
              onClick={handleSearchClick}
              className={`text-white hover:text-pink-400 transition-all duration-300 cursor-pointer ${
                isSearchExpanded ? 'transform rotate-90' : 'transform rotate-0'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-[#1A0A1A] text-white px-6 py-4 rounded-t-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section - Brand */}
          <div className="flex items-center">
            {/* Brand Name */}
            <Link 
              href="/" 
              onClick={() => setActiveLink('Home')}
              className="text-xl font-semibold cursor-pointer"
            >
              <span className="font-bold">Legacy</span> <span className="font-normal">Vogue</span>
            </Link>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-pink-400 cursor-pointer ${
                  activeLink === link.name
                    ? 'text-pink-500'
                    : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section - Icons and Buttons */}
          <div className="flex items-center space-x-4">
            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon and Input */}
              <div className="flex items-center">
                {/* Search Input Container */}
                <div className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
                  isSearchExpanded ? 'w-64 mr-2' : 'w-0 mr-0'
                }`}>
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search products..."
                      className={`w-full px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ${
                        isSearchExpanded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </form>
                </div>
                
                {/* Search Icon Button */}
                <button 
                  ref={desktopSearchButtonRef}
                  onClick={handleSearchClick}
                  className={`text-white hover:text-pink-400 transition-all duration-300 cursor-pointer ${
                    isSearchExpanded ? 'transform rotate-90' : 'transform rotate-0'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              
              {/* Heart Icon */}
              <button className="text-white hover:text-pink-400 transition-colors duration-200 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              {/* Shopping Bag Icon */}
              <button className="text-white hover:text-pink-400 transition-colors duration-200 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-3">
              {/* Login Button */}
              <button className="px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                Login
              </button>
              
              {/* Sign Up Button */}
              <button className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors duration-200 cursor-pointer">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Border */}
        <div className="mt-4 border-b border-gray-800"></div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A0A1A] border-t border-gray-800 z-50 transform-none will-change-auto">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const isActive = activeLink === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveLink(item.name)}
                className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 cursor-pointer"
              >
                <div className={`${isActive ? 'text-pink-500' : 'text-white'} transition-colors duration-200`}>
                  {item.icon(isActive)}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-pink-500' : 'text-white'} transition-colors duration-200`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
