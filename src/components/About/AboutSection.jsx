import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            variants={itemVariants}
          >
            About <span className="text-red-600">Mendez Roofing</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-red-600 mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="text-lg text-white max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Delivering <span className="text-red-600 font-semibold">excellence in roofing services</span> with unmatched quality and customer satisfaction.
          </motion.p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-6 text-red-600"
              variants={itemVariants}
            >
              Your <span className="text-white">Trusted</span> Roofing Partner
            </motion.h3>
            
            <motion.p 
              className="text-white mb-6"
              variants={itemVariants}
            >
              Mendez Roofing was founded with a simple mission: to provide homeowners and businesses with exceptional roofing services that stand the test of time. What started as a small family business has grown into one of the most respected roofing companies in the region.
            </motion.p>
            
            <motion.p 
              className="text-white mb-8"
              variants={itemVariants}
            >
              Our team of certified professionals brings expertise to every project. We pride ourselves on using only premium materials and cutting-edge techniques to ensure your roof not only looks beautiful but provides lasting protection for your property.
            </motion.p>
            
            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="bg-red-600/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-red-600 font-medium mb-1">Licensed & Insured</h4>
                  <p className="text-white text-sm">Fully certified professionals</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="bg-red-600/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-red-600 font-medium mb-1">On-Time Service</h4>
                  <p className="text-white text-sm">Prompt and reliable</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="bg-red-600/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-red-600 font-medium mb-1">Fast Turnaround</h4>
                  <p className="text-white text-sm">Efficient project completion</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="bg-red-600/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-red-600 font-medium mb-1">Quality Materials</h4>
                  <p className="text-white text-sm">Premium products only</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
            >
              <a href="#contact" className="btn bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center group shadow-red-glow">
                Get to Know Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
