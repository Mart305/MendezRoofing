import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg py-3' : 'bg-black py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Mendez <span className="text-red-600">Roofing</span>
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-8"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            <motion.a 
              href="#home" 
              className="text-white hover:text-red-600 transition-colors duration-300 font-medium"
              variants={itemVariants}
            >
              Home
            </motion.a>
            <motion.a 
              href="#about" 
              className="text-white hover:text-red-600 transition-colors duration-300 font-medium"
              variants={itemVariants}
            >
              About
            </motion.a>
            <motion.a 
              href="#services" 
              className="text-white hover:text-red-600 transition-colors duration-300 font-medium"
              variants={itemVariants}
            >
              Services
            </motion.a>
            <motion.a 
              href="#projects" 
              className="text-white hover:text-red-600 transition-colors duration-300 font-medium"
              variants={itemVariants}
            >
              Projects
            </motion.a>
            <motion.a 
              href="#testimonials" 
              className="text-white hover:text-red-600 transition-colors duration-300 font-medium"
              variants={itemVariants}
            >
              Testimonials
            </motion.a>
            <motion.a 
              href="#contact" 
              className="text-white hover:text-red-600 transition-colors duration-300 font-medium"
              variants={itemVariants}
            >
              Contact
            </motion.a>
            <motion.div
              variants={itemVariants}
              className="hidden lg:block"
            >
              <a 
                href="#contact" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 shadow-red-glow"
              >
                Get a Quote
              </a>
            </motion.div>
          </motion.nav>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div ref={menuRef} className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4`}>
          <nav className="flex flex-col space-y-4 bg-black p-4 rounded-lg">
            <a href="#home" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#about" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#services" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Services
            </a>
            <a href="#projects" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Projects
            </a>
            <a href="#testimonials" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Testimonials
            </a>
            <a href="#contact" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Contact
            </a>
            <div className="py-6 px-4 border-t border-white/10">
              <a 
                href="#contact" 
                className="block bg-red-600 hover:bg-red-700 text-white text-center px-6 py-3 rounded-lg transition-colors duration-300 shadow-red-glow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Free Quote
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
