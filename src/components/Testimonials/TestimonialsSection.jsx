import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === testimonialData.length - 1 ? 0 : prev + 1));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Testimonial data
  const testimonialData = [
    {
      id: 1,
      name: "James Wilson",
      role: "Homeowner",
      rating: 5,
      text: "Mendez Roofing provided exceptional service. Their team was professional, efficient, and the quality of work exceeded our expectations. They completed our roof replacement on time and within budget. I highly recommend them to anyone looking for reliable roofing services.",
      location: "Austin, TX"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Business Owner",
      rating: 5,
      text: "After a severe storm damaged the roof of our commercial building, Mendez Roofing came to the rescue. They responded quickly, assessed the damage thoroughly, and provided a detailed estimate. The repair work was completed with minimal disruption to our business operations. Their expertise and customer service are unmatched.",
      location: "Dallas, TX"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Property Manager",
      rating: 5,
      text: "Managing multiple properties requires reliable contractors, and Mendez Roofing has become our go-to roofing company. Their consistent quality, fair pricing, and excellent communication make them stand out in the industry. They've handled everything from minor repairs to complete replacements with the same level of professionalism.",
      location: "Houston, TX"
    },
    {
      id: 4,
      name: "Emily Thompson",
      role: "Homeowner",
      rating: 5,
      text: "I was impressed by the attention to detail that Mendez Roofing provided during our roof installation. From the initial consultation to the final inspection, every step was handled with care and expertise. The crew was respectful of our property and left the site spotless. Our new roof looks beautiful and has already withstood several heavy storms without issue.",
      location: "San Antonio, TX"
    },
    {
      id: 5,
      name: "David Martinez",
      role: "Contractor",
      rating: 5,
      text: "As a general contractor, I've worked with many roofing companies over the years, and Mendez Roofing stands out for their reliability and craftsmanship. They're my first choice for subcontracting roofing work because I know they'll deliver quality results that meet or exceed my clients' expectations. Their team is knowledgeable, skilled, and always professional.",
      location: "Fort Worth, TX"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
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
            className="text-4xl md:text-5xl font-bold mb-6 text-black"
            variants={itemVariants}
          >
            Our <span className="text-red-600">Testimonials</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-red-600 mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="text-lg text-black/80 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Don't just take our word for it. Here's what our satisfied clients have to say about our roofing services.
          </motion.p>
        </motion.div>
        
        {/* Testimonials slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialData[activeIndex].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonialData[activeIndex].rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-black mb-6 italic">"{testimonialData[activeIndex].text}"</p>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4">
                      {testimonialData[activeIndex].name.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-red-600 font-bold">{testimonialData[activeIndex].name}</h4>
                      <p className="text-black text-sm">{testimonialData[activeIndex].role}, {testimonialData[activeIndex].location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-red-600 w-4' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
