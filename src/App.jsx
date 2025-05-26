import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import ServicesSection from './components/Services/ServicesSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import TestimonialsSection from './components/Testimonials/TestimonialsSection';
import ContactSection from './components/Contact/ContactSection';
import ChatbotComponent from './components/Chatbot/ChatbotComponent';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    console.log("App component mounted");
    
    // Force loading to false after a maximum time to prevent infinite loading
    const forceLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Add scroll event listener for back to top button
    const handleBackToTopVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleBackToTopVisibility);

    // Initialize smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      });
    });
    

    


    return () => {
      clearTimeout(timer);
      clearTimeout(forceLoadingTimeout);
      window.removeEventListener('scroll', handleBackToTopVisibility);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <div className="preloader fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="loader-content text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 mb-4 border-4 border-white border-t-primary rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white font-display font-bold text-2xl"
            >
              MENDEZ ROOFING
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {/* Chatbot - Always visible regardless of loading state */}
      <ChatbotComponent />
      
      <div className={`app ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Services Section */}
          <ServicesSection />
          
          {/* Projects Section */}
          <ProjectsSection />
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Contact Section */}
          <ContactSection />
        </main>
        
        {/* Footer */}
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <span className="text-2xl font-bold">
                  Mendez <span className="text-red-600">Roofing</span>
                </span>
                <p className="text-white mb-4">Professional roofing services delivering excellence and reliability.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-red-600 transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="text-white hover:text-red-600 transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-white hover:text-red-600 transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-white hover:text-red-600 transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-white hover:text-red-600 transition-colors">Home</a></li>
                  <li><a href="#services" className="text-white hover:text-red-600 transition-colors">Services</a></li>
                  <li><a href="#about" className="text-white hover:text-red-600 transition-colors">About Us</a></li>
                  <li><a href="#projects" className="text-white hover:text-red-600 transition-colors">Projects</a></li>
                  <li><a href="#testimonials" className="text-white hover:text-red-600 transition-colors">Testimonials</a></li>
                  <li><a href="#contact" className="text-white hover:text-red-600 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white hover:text-red-600 transition-colors">Roof Replacement</a></li>
                  <li><a href="#" className="text-white hover:text-red-600 transition-colors">Roof Repairs</a></li>
                  <li><a href="#" className="text-white hover:text-red-600 transition-colors">Insurance Claims Assistance</a></li>
                  <li><a href="#" className="text-white hover:text-red-600 transition-colors">Fencing</a></li>
                  <li><a href="#" className="text-white hover:text-red-600 transition-colors">Drywall Services</a></li>
                  <li><a href="#" className="text-white hover:text-red-600 transition-colors">Emergency Services</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt mt-1 mr-3 text-red-600"></i>
                    <span className="text-white">9610 Marianna Way, Alvarado, TX 76009</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-phone-alt mt-1 mr-3 text-red-600"></i>
                    <span className="text-white">(214) 489-2828</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-envelope mt-1 mr-3 text-red-600"></i>
                    <span className="text-white">mendezfabian880@gmail.com</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock mt-1 mr-3 text-red-600"></i>
                    <span className="text-white">Available for calls anytime</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-white">&copy; {new Date().getFullYear()} Mendez Roofing. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        {/* Back to Top Button */}
        <a href="#" className="back-to-top fixed bottom-8 right-8 z-40 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-red-glow transform hover:scale-110 transition-all duration-300 opacity-0" aria-label="Back to Top">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
      </div>
    </>
  );
};

export default App;
