'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  GlobeAmericasIcon, 
  UsersIcon, 
  ShieldCheckIcon, 
  TruckIcon, 
  Cog6ToothIcon, 
  ChevronRightIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

// Enhanced custom hooks for professional scroll animations

// Hook for scroll velocity detection
function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime.current;
      
      if (timeDiff > 0) {
        const scrollDiff = currentScrollY - lastScrollY.current;
        const currentVelocity = Math.abs(scrollDiff / timeDiff);
        
        setVelocity(currentVelocity);
        setDirection(scrollDiff > 0 ? 'down' : 'up');
      }
      
      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { velocity, direction };
}

// Hook for scroll progress tracking
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setProgress(Math.min(Math.max(scrollPercent, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// Hook for parallax effects
function useParallax(strength = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const elementTop = rect.top + scrollTop;
        const scrollPosition = scrollTop + window.innerHeight;
        const parallaxOffset = (scrollPosition - elementTop) * strength;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength]);

  return { ref, offset };
}

// Hook for scroll-based animations with enhanced features
function useScrollAnimation(threshold = 0.3, triggerOnce = true) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && !hasAnimated) {
            setHasAnimated(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce, hasAnimated]);

  return { ref, isVisible, hasAnimated };
}

// Scroll-triggered motion component
function ScrollMotion({ 
  children, 
  variants, 
  className, 
  threshold = 0.3, 
  triggerOnce = true, 
  ...props 
}: {
  children: React.ReactNode;
  variants?: any;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  [key: string]: any;
}) {
  const { ref, isVisible, hasAnimated } = useScrollAnimation(threshold, triggerOnce);
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start('animate');
    } else {
      controls.start('exit');
    }
  }, [isVisible, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="initial"
      animate={controls}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Enhanced scroll hooks
  const { velocity, direction } = useScrollVelocity();
  const scrollProgress = useScrollProgress();

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock body scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Simple animation variants
  const fadeInUp = {
    initial: { 
      opacity: 0, 
      y: 50
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6
      } 
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  // Scroll-triggered animation variants
  const scrollFadeInUp = {
    initial: { 
      opacity: 0, 
      y: 50
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6
      } 
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const createSlideIn = (axis: 'x' | 'y', direction: 1 | -1) => ({
    initial: { 
      opacity: 0, 
      [axis]: direction * 100 
    },
    animate: { 
      opacity: 1, 
      [axis]: 0,
      transition: { 
        duration: 1
      } 
    }
  });

  const createScaleIn = (delay = 0) => ({
    initial: { 
      opacity: 0, 
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: delay
      } 
    }
  });
  
  const stagger = {
    animate: { 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    }
  };

  const heroStagger = {
    animate: { 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };

  // Parallax effects for hero background
  const { ref: heroRef, offset: heroOffset } = useParallax(0.3);
  const { ref: aboutRef, offset: aboutOffset } = useParallax(0.2);
  const { ref: servicesRef, offset: servicesOffset } = useParallax(0.15);

  // Enhanced scroll-triggered transformations
  const heroTransform = {
    transform: `translateY(${heroOffset * 0.5}px) scale(${1 + velocity * 0.001})`
  };

  const aboutTransform = {
    transform: `translateY(${aboutOffset * 0.3}px)`
  };

  const servicesTransform = {
    transform: `translateY(${servicesOffset * 0.2}px)`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-white via-primary-white to-primary-white overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-primary-silver/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Mobile Navigation - Hamburger Menu (Left Side) */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-md hover:bg-primary-navy/50 transition-colors touch-manipulation"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logo/Title (Centered) */}
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary-gold tracking-tight">AMERU</h1>
            </div>
            
            {/* Desktop Navigation - Full Text */}
            <div className="hidden lg:flex space-x-8">
              <a href="#about" className="flex items-center space-x-2 text-primary-gold hover:text-white transition-colors font-medium">
                <BuildingOffice2Icon className="w-5 h-5" />
                <span>About</span>
              </a>
              <a href="#services" className="flex items-center space-x-2 text-primary-gold hover:text-white transition-colors font-medium">
                <Cog6ToothIcon className="w-5 h-5" />
                <span>Services</span>
              </a>
              <a href="#quality" className="flex items-center space-x-2 text-primary-gold hover:text-white transition-colors font-medium">
                <ShieldCheckIcon className="w-5 h-5" />
                <span>Quality</span>
              </a>
              <a href="#contact" className="flex items-center space-x-2 text-primary-gold hover:text-white transition-colors font-medium">
                <EnvelopeIcon className="w-5 h-5" />
                <span>Contact</span>
              </a>
            </div>

            {/* Tablet Navigation - Icons + Text */}
            <div className="hidden md:flex lg:hidden space-x-6">
              <a href="#about" className="flex flex-col items-center space-y-1 text-primary-gold hover:text-white transition-colors group">
                <BuildingOffice2Icon className="w-5 h-5" />
                <span className="text-xs text-center group-hover:text-white">About</span>
              </a>
              <a href="#services" className="flex flex-col items-center space-y-1 text-primary-gold hover:text-white transition-colors group">
                <Cog6ToothIcon className="w-5 h-5" />
                <span className="text-xs text-center group-hover:text-white">Services</span>
              </a>
              <a href="#quality" className="flex flex-col items-center space-y-1 text-primary-gold hover:text-white transition-colors group">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="text-xs text-center group-hover:text-white">Quality</span>
              </a>
              <a href="#contact" className="flex flex-col items-center space-y-1 text-primary-gold hover:text-white transition-colors group">
                <EnvelopeIcon className="w-5 h-5" />
                <span className="text-xs text-center group-hover:text-white">Contact</span>
              </a>
            </div>

            {/* Mobile Phone Number (Right Side) */}
            <div className="md:hidden">
              <a href="tel:+919343864952" className="text-primary-gold font-semibold text-sm">
                +91 93438 64952
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Box - Small compact menu on left side */}
        {isMenuOpen && (
          <motion.div 
            className="fixed top-0 left-0 w-64 h-full bg-primary-navy/95 backdrop-blur-md z-[9999] shadow-xl border-r border-primary-silver/20"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-primary-navy/50 transition-colors touch-manipulation"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Header */}
            <div className="pt-16 pb-8 px-6">
              <h2 className="text-xl font-bold text-primary-gold mb-6">Menu</h2>
              
              {/* Menu Items */}
              <div className="space-y-2">
                <a 
                  href="#about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-primary-gold hover:text-white transition-colors py-3 px-4 rounded-md hover:bg-primary-navy/50"
                >
                  <BuildingOffice2Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">About</span>
                </a>
                <a 
                  href="#services" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-primary-gold hover:text-white transition-colors py-3 px-4 rounded-md hover:bg-primary-navy/50"
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Services</span>
                </a>
                <a 
                  href="#quality" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-primary-gold hover:text-white transition-colors py-3 px-4 rounded-md hover:bg-primary-navy/50"
                >
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Quality</span>
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-primary-gold hover:text-white transition-colors py-3 px-4 rounded-md hover:bg-primary-navy/50"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Contact</span>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="absolute bottom-8 left-6 right-6">
              <div className="border-t border-primary-silver/20 pt-6">
                <div className="text-primary-gold text-sm font-semibold mb-2">
                  +91 93438 64952
                </div>
                <div className="text-primary-silver text-xs">
                  contact@amerucoal.com
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-navy to-primary-charcoal opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-primary-navy mb-4 leading-tight">
                Ameru Coal
              </h1>
              <div className="w-24 h-1 bg-primary-gold mx-auto mb-6"></div>
              <p className="text-xl md:text-2xl text-primary-gray font-light leading-relaxed">
                Premium Coal Trading & Mining Solutions
              </p>
              <p className="text-xl md:text-2xl text-primary-gray font-light leading-relaxed">
                (This is a test page and only for demo purposes)
              </p>
            </motion.div>

            <ScrollMotion 
              variants={fadeInUp}
              threshold={0.3}
              triggerOnce={false}
              className="flex flex-col lg:flex-row gap-8 mt-16"
            >
              <div className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 text-primary-gold">
                  <BuildingOffice2Icon className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-primary-navy mb-2">Industrial Supply</h3>
                <p className="text-primary-gray text-sm leading-relaxed">
                  Premium coal with low impurities and high energy output for industrial applications
                </p>
              </div>
              
              <div className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 text-primary-gold">
                  <TruckIcon className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-primary-navy mb-2">Reliable Logistics</h3>
                <p className="text-primary-gray text-sm leading-relaxed">
                  Consistent delivery and dependable quality assurance across global markets
                </p>
              </div>
              
              <div className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 text-primary-gold">
                  <ShieldCheckIcon className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-primary-navy mb-2">Quality Assurance</h3>
                <p className="text-primary-gray text-sm leading-relaxed">
                  Modern mining practices with environmental responsibility and compliance
                </p>
              </div>
            </ScrollMotion>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-primary-white">
        <div className="container mx-auto px-6">
          <ScrollMotion 
            className="max-w-6xl mx-auto text-center mb-16"
            variants={scrollFadeInUp}
            threshold={0.3}
            triggerOnce={false}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Why Choose <span className="text-primary-gold">Ameru Coal</span>
            </h2>
            <p className="text-primary-gray text-lg max-w-3xl mx-auto leading-relaxed">
              With decades of experience in the coal industry, Ameru has established itself as a leader 
              in quality and reliability, serving industrial clients worldwide with premium coal products.
            </p>
          </ScrollMotion>

          <ScrollMotion 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            variants={stagger}
            threshold={0.3}
            triggerOnce={false}
          >
            <ScrollMotion 
              className="space-y-8"
              variants={stagger}
              threshold={0.3}
              triggerOnce={false}
            >
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-gold/10 p-3 rounded-full">
                    <BuildingOffice2Icon className="w-6 h-6 text-primary-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-navy mb-2">Superior Quality</h3>
                    <p className="text-primary-gray leading-relaxed">
                      Our coal undergoes rigorous quality control to ensure maximum energy output 
                      and minimal impurities, providing you with the most efficient fuel source available.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-gold/10 p-3 rounded-full">
                    <GlobeAmericasIcon className="w-6 h-6 text-primary-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-navy mb-2">Global Reach</h3>
                    <p className="text-primary-gray leading-relaxed">
                      Direct sourcing and efficient operations allow us to offer premium quality coal 
                      at market-competitive prices, maximizing your value across international markets.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-gold/10 p-3 rounded-full">
                    <UsersIcon className="w-6 h-6 text-primary-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-navy mb-2">Bulk Solutions</h3>
                    <p className="text-primary-gray leading-relaxed">
                      Whether you need small quantities or large-scale industrial supply, we provide 
                      flexible solutions tailored to your specific requirements and volume needs.
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollMotion>
            
            <motion.div 
              className="bg-gradient-to-br from-primary-navy to-primary-charcoal p-12 rounded-2xl shadow-2xl"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="text-center text-black">
                <h3 className="text-3xl font-bold mb-6">Mining Excellence</h3>
                <p className="text-primary-silver mb-10 leading-relaxed">
                  With decades of experience in the coal industry, Ameru has established itself 
                  as a leader in quality and reliability, serving clients across multiple continents.
                </p>
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-gold mb-2">50+</div>
                    <div className="text-primary-silver">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-gold mb-2">1000+</div>
                    <div className="text-primary-silver">Satisfied Clients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollMotion>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-primary-silver/5">
        <div className="container mx-auto px-6">
          <ScrollMotion 
            className="max-w-6xl mx-auto text-center mb-16"
            variants={scrollFadeInUp}
            threshold={0.3}
            triggerOnce={false}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Our <span className="text-primary-gold">Services</span>
            </h2>
            <p className="text-primary-gray text-lg max-w-3xl mx-auto leading-relaxed">
              Comprehensive coal trading and mining solutions designed to meet the diverse needs 
              of industrial clients worldwide with reliability and efficiency.
            </p>
          </ScrollMotion>

          <ScrollMotion 
            className="flex flex-col lg:flex-row gap-8"
            variants={fadeInUp}
            threshold={0.3}
            triggerOnce={false}
          >
            <motion.div 
              className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="text-4xl mb-4 text-primary-gold group-hover:text-primary-navy transition-colors">
                <TruckIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-4">Industrial Coal Supply</h3>
              <p className="text-primary-gray mb-6 leading-relaxed">
                Large-scale coal supply for power plants, steel mills, and industrial facilities 
                with consistent quality and reliable delivery schedules.
              </p>
              <div className="flex items-center text-primary-gold font-semibold group-hover:text-primary-navy transition-colors">
                <span>Learn More</span>
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="text-4xl mb-4 text-primary-gold group-hover:text-primary-navy transition-colors">
                <GlobeAmericasIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-4">Export Solutions</h3>
              <p className="text-primary-gray mb-6 leading-relaxed">
                International coal export services with global logistics support, quality certification, 
                and competitive pricing for overseas markets.
              </p>
              <div className="flex items-center text-primary-gold font-semibold group-hover:text-primary-navy transition-colors">
                <span>Learn More</span>
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="text-4xl mb-4 text-primary-gold group-hover:text-primary-navy transition-colors">
                <Cog6ToothIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-4">Custom Blending</h3>
              <p className="text-primary-gray mb-6 leading-relaxed">
                Specialized coal blending services to meet specific energy requirements, ash content, 
                and combustion characteristics for various applications.
              </p>
              <div className="flex items-center text-primary-gold font-semibold group-hover:text-primary-navy transition-colors">
                <span>Learn More</span>
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </ScrollMotion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary-white">
        <div className="container mx-auto px-6">
          <ScrollMotion 
            className="max-w-6xl mx-auto"
            variants={stagger}
            threshold={0.3}
            triggerOnce={false}
          >
            <div className="flex flex-col lg:flex-row gap-12">
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl font-bold text-primary-navy mb-6">Ready to Power Your Business?</h3>
                <p className="text-primary-gray mb-8 leading-relaxed">
                  Contact us today to discuss your coal requirements and get a personalized quote. 
                  Our team of experts is ready to assist you with all your coal trading needs.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center text-primary-gray">
                    <div className="bg-primary-gold/10 p-3 rounded-full mr-4">
                      <EnvelopeIcon className="w-5 h-5 text-primary-gold" />
                    </div>
                    <span>contact@amerucoal.com</span>
                  </div>
                  <div className="flex items-center text-primary-gray">
                    <div className="bg-primary-gold/10 p-3 rounded-full mr-4">
                      <PhoneIcon className="w-5 h-5 text-primary-gold" />
                    </div>
                    <span>+91 93438 64952</span>
                  </div>
                  <div className="flex items-center text-primary-gray">
                    <div className="bg-primary-gold/10 p-3 rounded-full mr-4">
                      <MapPinIcon className="w-5 h-5 text-primary-gold" />
                    </div>
                    <span>123 Mining Way, Coal City, CC 12345</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-primary-silver/20"
                variants={fadeInUp}
                animate="animate"
              >
                <h4 className="text-xl font-bold text-primary-navy mb-6">Get a Quote</h4>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full p-3 border border-primary-silver/30 rounded-lg text-primary-navy placeholder-primary-gray focus:outline-none focus:border-primary-gold transition-colors touch-manipulation"
                      autoComplete="name"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full p-3 border border-primary-silver/30 rounded-lg text-primary-navy placeholder-primary-gray focus:outline-none focus:border-primary-gold transition-colors touch-manipulation"
                      autoComplete="email"
                    />
                  </div>
                  <textarea 
                    placeholder="Your Requirements" 
                    rows={5}
                    className="w-full p-3 border border-primary-silver/30 rounded-lg text-primary-navy placeholder-primary-gray focus:outline-none focus:border-primary-gold transition-colors resize-none touch-manipulation"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-primary-gold text-primary-navy font-bold py-3 px-6 rounded-lg hover:bg-primary-gold/90 transition-all duration-300 transform hover:scale-105 touch-manipulation"
                    style={{ minHeight: '44px' }}
                  >
                    Request Quote
                  </button>
                </form>
              </motion.div>
            </div>
          </ScrollMotion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary-navy text-white">
        <div className="container mx-auto px-6">
          <div className="border-t border-primary-silver/20 pt-8 text-center">
            <p className="text-primary-silver">© 2024 Ameru Coal. Powering Industries with Quality and Reliability.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
