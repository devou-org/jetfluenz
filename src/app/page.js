'use client'

import { useEffect, useState } from 'react'
import WaitlistModal from '../components/WaitlistModal'

export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Navbar scroll hide/show functionality
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsNavbarVisible(false)
      } else {
        // Scrolling up
        setIsNavbarVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Scroll trigger for For Whom and Our Solution sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target
          element.classList.remove('scroll-hidden')
          element.classList.add('animate-scroll-blur')
        }
      })
    }, observerOptions)

    // Observe For Whom section elements
    const forWhomElements = document.querySelectorAll('.for-whom-animate')
    forWhomElements.forEach(el => observer.observe(el))

    // Observe Our Solution section elements
    const solutionElements = document.querySelectorAll('.solution-animate')
    solutionElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
  return (
    <div className="min-h-screen">
      {/* Glass Navigation Bar */}
      <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 md:px-8 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Jetfluenz Logo" 
                className="h-8 w-auto"
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 ml-6">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white/90 hover:text-white transition-colors font-medium">
                Home
              </button>
              <button 
                onClick={() => scrollToSection('for-whom')}
                className="text-white/70 hover:text-white/90 transition-colors">
                For Whom
              </button>
              <button 
                onClick={() => scrollToSection('solution')}
                className="text-white/70 hover:text-white/90 transition-colors">
                Solution
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white/70 hover:text-white/90 transition-colors">
                Contact
              </button>
              <button 
                onClick={() => setIsWaitlistModalOpen(true)}
                className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm">
                Join Waitlist
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[250px]">
            <div className="space-y-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('home');
                }}
                className="block text-white text-lg hover:text-blue-300 transition-colors py-2 w-full text-left">
                Home
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('for-whom');
                }}
                className="block text-white/80 text-lg hover:text-blue-300 transition-colors py-2 w-full text-left">
                For Whom
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('solution');
                }}
                className="block text-white/80 text-lg hover:text-blue-300 transition-colors py-2 w-full text-left">
                Solution
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('contact');
                }}
                className="block text-white/80 text-lg hover:text-blue-300 transition-colors py-2 w-full text-left">
                Contact
              </button>
              <div className="border-t border-white/20 pt-4 mt-4">
                <button 
                  className="w-full bg-white/20 text-white px-4 py-3 rounded-full hover:bg-white/30 transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWaitlistModalOpen(true);
                  }}
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Gradient Wrapper for first three sections (Hero, For Whom, Our Solution) */}
      <div style={{background: 'linear-gradient(180deg, #1F07BA 0%, #0E0354 41%, #0E0354 84%)'}}>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-6 min-h-screen flex items-center overflow-hidden">
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Top line - full width */}
          <div className="absolute top-20 left-0 w-full h-[1px] bg-white/20"></div>
          {/* Right line - full height */}
          <div className="absolute top-0 right-20 w-[1px] h-full bg-white/20"></div>
          {/* Bottom line - full width */}
          <div className="absolute bottom-20 left-0 w-full h-[1px] bg-white/20"></div>
          {/* Left line - full height */}
          <div className="absolute top-0 left-20 w-[1px] h-full bg-white/20"></div>
          {/* Center vertical line - full height */}
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 transform -translate-x-1/2"></div>
          {/* Center horizontal line - full width */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 transform -translate-y-1/2"></div>
              </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in-left">
                Jetfluenz
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed animate-fade-in-left" style={{animationDelay: '0.2s', opacity: 0}}>
                connects <span className="text-yellow-300 font-semibold">micro-influencers</span> with <span className="text-blue-300 font-semibold">businesses</span> to create <span className="text-green-300 font-semibold">authentic campaigns</span> that <span className="text-pink-300 font-semibold">convert</span>.
              </p>
              <button 
                onClick={() => setIsWaitlistModalOpen(true)}
                className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg animate-fade-in-up relative overflow-hidden group border-2 border-transparent hover:border-white/30" style={{animationDelay: '0.4s', opacity: 0}}>
                <span className="relative z-10">Join waitlist</span>
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400 transition-all duration-500 animate-border-travel"></div>
              </button>
            </div>
            
            <div className="relative h-96 flex items-center justify-center">
              {/* 2x2 Grid Layout */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full max-w-lg">
                {/* First image - spans 2 rows (left column) */}
                <div className="row-span-2">
                  <img
                    src="/card1-hero.png"
                    alt="Hero card 1"
                    className="w-full h-full object-cover rounded-2xl shadow-lg animate-blur-to-clear"
                  />
                </div>

                {/* Second image - top right */}
                <div className="row-span-1">
                  <img
                    src="/card2-hero.png"
                    alt="Hero card 2"
                    className="w-full h-full object-cover rounded-2xl shadow-lg animate-blur-to-clear"
                  />
                </div>

                {/* Third image - bottom right */}
                <div className="row-span-1">
                  <img
                    src="/card3-hero.png"
                    alt="Hero card 3"
                    className="w-full h-full object-cover rounded-2xl shadow-lg animate-blur-to-clear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section id="for-whom" className="relative min-h-screen flex items-center py-12 md:py-20 px-4 md:px-6">
        {/* Full-width top border */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
        {/* Full-width bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"></div>
        
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 md:mb-20 for-whom-animate for-whom-title scroll-hidden text-center md:text-left">For Whom?</h2>
          
          {/* Card container with connected borders */}
          <div className="relative border-t border-b border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              
              {/* Business Card */}
              <div className="relative for-whom-animate for-whom-card-1 scroll-hidden border-b md:border-b-0 border-white/20 md:border-r md:border-r-white/20">
                <div className="p-3 md:p-4">
                  <div className="relative h-64 md:h-80">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop" 
                      alt="Business professional working" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                    <div className="absolute top-4 md:top-6 left-4 md:left-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">Business</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6 text-left">
                  <div className="space-y-2">
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-blue-300 font-semibold">Scale brand reach</span> with authentic partnerships</p>
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-green-300 font-semibold">Cost-effective campaigns</span> with measurable ROI</p>
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-yellow-300 font-semibold">Real engagement</span> that converts</p>
                  </div>
                </div>
              </div>

              {/* Startups Card */}
              <div className="relative for-whom-animate for-whom-card-2 scroll-hidden border-b md:border-b-0 border-white/20 md:border-r md:border-r-white/20">
                <div className="p-3 md:p-4">
                  <div className="relative h-64 md:h-80">
                    <img 
                      src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=400&fit=crop" 
                      alt="Startup workspace with laptops" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                    <div className="absolute top-4 md:top-6 left-4 md:left-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">Startups</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6 text-left">
                  <div className="space-y-2">
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-purple-300 font-semibold">Launch products</span> with targeted buzz</p>
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-pink-300 font-semibold">Limited budgets</span> maximum impact</p>
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-orange-300 font-semibold">Quick awareness</span> building</p>
                  </div>
                </div>
              </div>
              
              {/* Micro-Influencers Card */}
              <div className="relative for-whom-animate for-whom-card-3 scroll-hidden">
                <div className="p-3 md:p-4">
                  <div className="relative h-64 md:h-80">
                    <img 
                      src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&h=400&fit=crop" 
                      alt="Influencer creating content" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                    <div className="absolute top-4 md:top-6 left-4 md:left-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">Micro-Influencers</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6 text-left">
                  <div className="space-y-2">
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-teal-300 font-semibold">Monetize content</span> on Instagram, TikTok, YouTube</p>
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-cyan-300 font-semibold">Brand partnerships</span> that align with values</p>
                    <p className="text-white text-xs md:text-sm font-medium">• <span className="text-emerald-300 font-semibold">Grow following</span> while earning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section id="solution" className="min-h-screen flex flex-col py-8 md:py-12 px-4 md:px-6 pb-16 md:pb-20">
        <div className="container mx-auto min-h-screen flex flex-col px-4 md:px-8">
          
          {/* Header Section - Left aligned */}
          <div className="h-auto md:h-1/4 flex items-center justify-center md:justify-start mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-black text-white solution-animate scroll-hidden text-center md:text-left">Our Solution</h2>
          </div>
          
          {/* Content Section - Mobile: auto height, Desktop: 4/5 */}
          <div className="flex-1 md:h-3/4 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* What We Do Card - Mobile: full width, Desktop: left column */}
            <div className="bg-white p-6 md:p-8 h-auto md:h-full flex flex-col justify-center min-h-[250px] md:min-h-[300px] solution-animate scroll-hidden">
              <div className="mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-black mb-4 md:mb-8">What We Do?</h3>
              </div>
              <p className="text-black text-base md:text-lg leading-relaxed">
                We offer <span className="text-blue-600 font-bold">expert solutions</span> in <span className="text-purple-600 font-bold">four key areas</span>, designed to help you achieve your <span className="text-green-600 font-bold">business goals</span>.
              </p>
            </div>

            {/* Solution Cards Grid - Mobile: 2 cols, Desktop: 2x2 grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-8 h-auto md:h-full">
              
              {/* Top Left Card - Connect */}
              <div className="bg-white p-4 md:p-6 flex flex-col justify-center h-auto md:h-full min-h-[120px] md:min-h-[150px] solution-animate scroll-hidden">
                <div className="mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 md:mb-4">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                </div>
                <h4 className="text-black font-bold text-xs md:text-base mb-1 md:mb-2"><span className="text-purple-600">Connect</span> Businesses</h4>
                <h4 className="text-black font-bold text-xs md:text-base mb-1 md:mb-2">& <span className="text-blue-600">Startups</span> with</h4>
                <h4 className="text-black font-bold text-xs md:text-base"><span className="text-green-600">Micro-Influencers</span></h4>
              </div>
              
              {/* Top Right Card - Smart Matching */}
              <div className="bg-white p-4 md:p-6 flex flex-col justify-center h-auto md:h-full min-h-[120px] md:min-h-[150px] solution-animate scroll-hidden">
                <div className="mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 md:mb-4">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
                <h4 className="text-black font-bold text-xs md:text-base mb-1 md:mb-2"><span className="text-green-600">Smart</span> Campaign</h4>
                <h4 className="text-black font-bold text-xs md:text-base"><span className="text-orange-600">Matching</span></h4>
              </div>
              
              {/* Bottom Left Card - Launch Campaigns */}
              <div className="bg-white p-4 md:p-6 flex flex-col justify-center h-auto md:h-full min-h-[120px] md:min-h-[150px] solution-animate scroll-hidden">
                <div className="mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2 md:mb-4">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                    </svg>
                  </div>
                </div>
                <h4 className="text-black font-bold text-xs md:text-base mb-1 md:mb-2"><span className="text-orange-600">Launch</span> Impactful</h4>
                <h4 className="text-black font-bold text-xs md:text-base"><span className="text-red-600">Campaigns</span></h4>
              </div>
              
              {/* Bottom Right Card - Track & Grow */}
              <div className="bg-white p-4 md:p-6 flex flex-col justify-center h-auto md:h-full min-h-[120px] md:min-h-[150px] solution-animate scroll-hidden">
                <div className="mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 md:mb-4">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                    </svg>
                  </div>
                </div>
                <h4 className="text-black font-bold text-xs md:text-base mb-1 md:mb-2"><span className="text-blue-600">Track</span></h4>
                <h4 className="text-black font-bold text-xs md:text-base">& <span className="text-teal-600">Grow</span></h4>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* End Gradient Wrapper */}
      </div>

      {/* Dashboard/Reports Section */}
      <section className="min-h-screen flex items-center py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            
            {/* Left: Simple Dashboard */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your Dashboard</h2>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>

              {/* Campaign Stats - Simple Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">3</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
              </div>

              {/* Simple Influencer List */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Influencers</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-300 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">Sarah J.</div>
                        <div className="text-sm text-gray-600">Fashion</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">150K</div>
                      <div className="text-sm text-green-600">5% rate</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-300 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">Mike R.</div>
                        <div className="text-sm text-gray-600">Tech</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">80K</div>
                      <div className="text-sm text-green-600">7% rate</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-300 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">Alex M.</div>
                        <div className="text-sm text-gray-600">Fitness</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">120K</div>
                      <div className="text-sm text-green-600">6% rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple Results */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">+15%</div>
                  <div className="text-xs text-gray-600">Views</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">+8%</div>
                  <div className="text-xs text-gray-600">Likes</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">+12%</div>
                  <div className="text-xs text-gray-600">Sales</div>
                </div>
              </div>
            </div>
            
            {/* Right: Detailed Process Flow */}
            <div className="relative">
              <div className="absolute left-4 md:left-5 top-0 bottom-0 border-l-2 border-dashed border-gray-300"></div>
              
              <div className="space-y-8">
                {/* Business Onboards */}
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-6 md:ml-8">
                    <div className="text-gray-800 text-base md:text-lg lg:text-xl font-bold">Business Onboards</div>
                    <div className="text-gray-600 text-xs md:text-sm">Companies register and define campaign goals</div>
                  </div>
                </div>
                
                {/* Influencers Onboards */}
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-6 md:ml-8">
                    <div className="text-gray-800 text-base md:text-lg lg:text-xl font-bold">Influencers Onboards</div>
                    <div className="text-gray-600 text-xs md:text-sm">Micro-influencers create profiles and showcase content</div>
                  </div>
                </div>
                
                {/* Smart Matching */}
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-6 md:ml-8">
                    <div className="text-gray-800 text-base md:text-lg lg:text-xl font-bold">Smart Matching</div>
                    <div className="text-gray-600 text-xs md:text-sm">AI pairs brands with perfect influencer matches</div>
                  </div>
                </div>
                
                {/* Campaign Launch */}
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-6 md:ml-8">
                    <div className="text-gray-800 text-base md:text-lg lg:text-xl font-bold">Campaign Launch</div>
                    <div className="text-gray-600 text-xs md:text-sm">Authentic content creation and publishing begins</div>
                  </div>
                </div>
                
                {/* Results & Insights */}
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-6 md:ml-8">
                    <div className="text-gray-800 text-base md:text-lg lg:text-xl font-bold">Results & Insights</div>
                    <div className="text-gray-600 text-xs md:text-sm">Track performance and optimize future campaigns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 text-center mb-16">FAQ</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const content = document.getElementById('faq-1');
                  const icon = document.getElementById('icon-1');
                  if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                  } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                  }
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800">What is Jetfluence?</h3>
                <svg id="icon-1" className="w-6 h-6 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="faq-1" className="px-6 pb-6" style={{display: 'none'}}>
                <p className="text-gray-600">Jetfluence is a platform that connects micro-influencers (under 10K followers) with businesses and startups to run authentic and affordable marketing campaigns.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const content = document.getElementById('faq-2');
                  const icon = document.getElementById('icon-2');
                  if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                  } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                  }
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800">Who can join Jetfluence?</h3>
                <svg id="icon-2" className="w-6 h-6 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="faq-2" className="px-6 pb-6" style={{display: 'none'}}>
                <p className="text-gray-600 mb-3"><strong>Influencers:</strong> Anyone with under 10K followers who creates content in niches like fashion, food, fitness, lifestyle, travel, etc.</p>
                <p className="text-gray-600"><strong>Businesses/Startups:</strong> Small businesses, local shops, e-commerce brands, and startups looking for affordable influencer marketing.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const content = document.getElementById('faq-3');
                  const icon = document.getElementById('icon-3');
                  if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                  } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                  }
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800">Why micro-influencers?</h3>
                <svg id="icon-3" className="w-6 h-6 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="faq-3" className="px-6 pb-6" style={{display: 'none'}}>
                <p className="text-gray-600">Micro-influencers often have highly engaged, loyal audiences. Their followers trust them, which means campaigns feel more authentic and deliver better results at lower costs.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const content = document.getElementById('faq-4');
                  const icon = document.getElementById('icon-4');
                  if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                  } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                  }
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800">How does the matching work?</h3>
                <svg id="icon-4" className="w-6 h-6 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="faq-4" className="px-6 pb-6" style={{display: 'none'}}>
                <p className="text-gray-600">Our smart algorithm matches businesses and influencers based on niche, audience demographics, engagement rate, location, and budget to ensure the best fit for every campaign.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const content = document.getElementById('faq-5');
                  const icon = document.getElementById('icon-5');
                  if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                  } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                  }
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800">Is Jetfluence free to use?</h3>
                <svg id="icon-5" className="w-6 h-6 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="faq-5" className="px-6 pb-6" style={{display: 'none'}}>
                <p className="text-gray-600 mb-3"><strong>For influencers:</strong> Free to join and start receiving campaign offers.</p>
                <p className="text-gray-600"><strong>For businesses:</strong> Creating an account is free; payment depends on campaign budget and chosen influencers.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{backgroundColor: '#0E0354'}} className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Jetfluenz</h3>
              <p className="text-white/70">Connecting micro-influencers with businesses</p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-white/70 text-sm">
                <p>Coming Soon - Join the Waitlist</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/60">
            <p>&copy; 2024 Jetfluenz. All rights reserved.</p>
            <p className="text-sm mt-2">
              Developed by{' '}
              <a 
                href="https://devou.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors underline underline-offset-2"
              >
                devou
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </div>
  )
}