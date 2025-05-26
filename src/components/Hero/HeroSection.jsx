import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import AnimatedText from './AnimatedText';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-white"
    >
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Main content */}
          <div>
            {/* Loading animation */}
            {!isLoaded ? (
              <div className="flex items-center space-x-4 mb-8">
                <motion.div 
                  className="w-6 h-6 rounded-full bg-red-600"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <p className="text-black text-lg">Loading experience...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badge */}
                <motion.div 
                  className="mt-12 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-red-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-black font-medium">Trusted by 500+ Homeowners</p>
                </motion.div>
                
                {/* Main title */}
                <motion.div 
                  className="mb-6"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                  >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                      Elevate <span className="text-red-600">Your</span> <br/>
                      <span className="text-red-600">Roofing Experience</span>
                    </h1>
                  </motion.div>
                </motion.div>
                
                {/* Description */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="mb-8"
                >
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-8"
                    variants={itemVariants}
                  >
                    Premium roofing solutions crafted with precision. Transform your property with unmatched quality and reliability.
                  </motion.p>
                  
                  {/* Features section */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <motion.div 
                      className="bg-white rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-md"
                      variants={itemVariants}
                      whileHover={{ 
                        boxShadow: "0 0 20px rgba(225, 6, 0, 0.2)"
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-red-600">Quality Guaranteed</h3>
                      <p className="text-gray-700 text-base">Our commitment to excellence ensures your roof will stand the test of time.</p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-md"
                      variants={itemVariants}
                      whileHover={{ 
                        boxShadow: "0 0 20px rgba(225, 6, 0, 0.2)"
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-red-600">Expert Craftsmanship</h3>
                      <p className="text-gray-700 text-base">Our skilled team delivers precision and attention to detail on every project.</p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-md"
                      variants={itemVariants}
                      whileHover={{ 
                        boxShadow: "0 0 20px rgba(225, 6, 0, 0.2)"
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-red-600">Customer Satisfaction</h3>
                      <p className="text-gray-700 text-base">We prioritize your needs and ensure complete satisfaction with every service.</p>
                    </motion.div>
                  </motion.div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
                    <div className="text-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-red-600">500+</h3>
                      <p className="text-gray-700 mt-2 font-medium">Projects Completed</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-red-600">100%</h3>
                      <p className="text-gray-700 mt-2 font-medium">Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-red-600">24/7</h3>
                      <p className="text-gray-700 mt-2 font-medium">Support</p>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <motion.div 
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <a 
                      href="#contact" 
                      className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:shadow-lg"
                    >
                      Get a Free Quote
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>
          
          {/* Right column - Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-xl overflow-hidden shadow-custom"
            >
              <video 
                src="images/projects/Video.mov" 
                alt="Professional Roofing Services" 
                className="w-full h-auto rounded-xl"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-black/70 text-sm mb-2">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center pt-2"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-1 h-1 rounded-full bg-red-600"
            animate={{ 
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
