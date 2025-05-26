import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Service card component
const ServiceCard = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: delay * 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="group"
    >
      <div className="bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-200">
        <div className="h-2 bg-red-600"></div>
        <div className="p-8">
          <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mb-6 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
            <i className={`${icon} text-2xl`}></i>
          </div>
          <h3 className="text-xl font-bold mb-4 text-red-600 transition-colors duration-300">{title}</h3>
          <p className="text-black/80 mb-6">{description}</p>
          <a href="#contact" className="inline-flex items-center text-red-600 font-medium hover:text-red-800 transition-colors">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Service data
  const services = [
    {
      icon: 'fas fa-home',
      title: 'Roof Replacement',
      description: 'Complete roof replacement services using premium materials and expert craftsmanship to ensure long-lasting protection for your home.'
    },
    {
      icon: 'fas fa-tools',
      title: 'Roof Repairs',
      description: 'Fast and reliable repair services for leaks, storm damage, and other roofing issues to protect your property from further damage.'
    },
    {
      icon: 'fas fa-file-invoice-dollar',
      title: 'Insurance Claims Assistance',
      description: 'Expert guidance through the entire insurance claim process, from inspection and documentation to settlement negotiation.'
    },
    {
      icon: 'fas fa-fence',
      title: 'Fencing',
      description: 'Professional installation and repair of various fence types to enhance security, privacy, and curb appeal for your property.'
    },
    {
      icon: 'fas fa-hammer',
      title: 'Drywall Services',
      description: 'Quality drywall installation, repair, and finishing services for interior walls and ceilings, ensuring a flawless result.'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Emergency Services',
      description: 'Rapid response for urgent roofing problems, including storm damage and leaks, to minimize damage to your property.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-red-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={titleVariants} className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Our <span className="text-red-600">Services</span>
          </motion.h2>
          <motion.div variants={titleVariants} className="w-24 h-1 bg-red-600 mx-auto mb-6"></motion.div>
          <motion.p variants={titleVariants} className="text-lg text-black/80">
            We provide <span className="text-red-600 font-semibold">comprehensive roofing solutions</span> tailored to your specific needs
          </motion.p>
        </motion.div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg shadow-lg hover:bg-red-700 transform transition-all duration-300 hover:scale-105 hover:shadow-red-glow">
            Get a Free Quote
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
