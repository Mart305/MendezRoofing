import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendEmail } from '../../services/emailService';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value); // Debug log
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [name]: value
      };
      console.log('New form data:', newData); // Debug log
      return newData;
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill out all required fields.'
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    // Send email
    const result = await sendEmail(formData);
    
    if (result.success) {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you shortly. Your message has been sent to mendezfabian880@gmail.com'
      });
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } else {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
    // Example: Send to email service or backend API
    // fetch('https://api.example.com/submit-form', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
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
  
  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-red-600/5 rounded-full blur-3xl"></div>
      
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
            Contact <span className="text-red-600">Us</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-red-600 mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="text-lg text-black/80 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ready to start your <span className="text-red-600 font-semibold">roofing project</span>? Get in touch with our team for a free consultation and quote.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg"
          >
            <motion.h3 
              className="text-2xl font-bold text-black mb-6"
              variants={itemVariants}
            >
              Send Us a <span className="text-red-600">Message</span>
            </motion.h3>
            
            <motion.p 
              className="text-black/80 mb-6"
              variants={itemVariants}
            >
              All messages are sent directly to Fabian Mendez at mendezfabian880@gmail.com and will receive a response within 24 hours.
            </motion.p>
            
            {formStatus.submitted && (
              <div className={`mb-6 p-4 rounded-lg ${formStatus.success ? 'bg-red-600/10 text-red-600' : 'bg-red-500/20 text-red-700'}`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="relative z-20">
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="name" className="block text-black/80 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    console.log('Name input changed:', e.target.value);
                    handleChange(e);
                  }}
                  onFocus={(e) => console.log('Name input focused')}
                  onClick={(e) => console.log('Name input clicked')}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-black pointer-events-auto select-auto"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                  style={{ pointerEvents: 'auto' }}
                />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-black/80 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
                    placeholder="john@example.com"
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block text-black/80 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
                    placeholder="(123) 456-7890"
                  />
                </motion.div>
              </div>
              
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="service" className="block text-black/80 mb-2">Service Needed</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Roof Replacement">Roof Replacement</option>
                  <option value="Roof Repair">Roof Repair</option>
                  <option value="Roof Inspection">Roof Inspection</option>
                  <option value="Gutter Installation">Gutter Installation</option>
                  <option value="Emergency Services">Emergency Services</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="message" className="block text-black/80 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-black mb-6">Contact <span className="text-red-600">Information</span></h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-600/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Phone</h4>
                    <p className="text-black/80">(214) 489-2828</p>
                    <p className="text-black/80">Available 24/7 for emergency services</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-600/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Email</h4>
                    <p className="text-black/80">mendezfabian880@gmail.com</p>
                    <p className="text-black/80">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-600/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Location</h4>
                    <p className="text-black/80">9610 Marianna Way, Alvarado, TX 76009</p>
                    <p className="text-black/80">Serving all of Dallas-Fort Worth and surrounding areas</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-black mb-6">Business <span className="text-red-600">Hours</span></h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-black/80">Monday - Friday</span>
                  <span className="text-black font-medium">7:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/80">Saturday</span>
                  <span className="text-black font-medium">8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/80">Sunday</span>
                  <span className="text-black font-medium">Closed</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-red-600 font-medium">24/7 Emergency Services Available</p>
                </div>
              </div>
            </motion.div>
            
            {/* Map */}
            <motion.div 
              className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg h-[300px]"
              variants={itemVariants}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.5768042371814!2d-97.2152808!3d32.5384935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e5e3f8e3b3b9f%3A0x4f0e3f7c3f0e3f7c!2s9610%20Marianna%20Way%2C%20Alvarado%2C%20TX%2076009!5e0!3m2!1sen!2sus!4v1621351234567!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mendez Roofing Location"
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
