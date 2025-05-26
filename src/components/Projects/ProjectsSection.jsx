import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = () => {
  const videoRef = useRef(null);
  
  // Project images from user's downloads folder (now copied to the project)
  const projects = [
    {
      id: 1,
      title: 'Residential Roof Replacement',
      image: 'images/projects/image0.jpeg',
      description: 'Complete roof replacement with high-quality materials'
    },
    {
      id: 2,
      title: 'Commercial Roofing Project',
      image: 'images/projects/image1.jpeg',
      description: 'Large scale commercial roofing installation'
    },
    {
      id: 3,
      title: 'Roof Repair After Storm',
      image: 'images/projects/image2.jpeg',
      description: 'Emergency repairs following severe weather damage'
    },
    {
      id: 4,
      title: 'Shingle Roof Installation',
      image: 'images/projects/image3.jpeg',
      description: 'Premium shingle installation for residential property'
    },
    {
      id: 5,
      title: 'Roof Inspection',
      image: 'images/projects/image4.jpeg',
      description: 'Thorough roof inspection and maintenance service'
    },
    {
      id: 6,
      title: 'Insurance Claim Project',
      image: 'images/projects/image5.jpeg',
      description: 'Successful insurance claim assistance and roof replacement'
    },
    {
      id: 7,
      title: 'Modern Roof Installation',
      image: 'images/projects/image6.jpeg',
      description: 'Contemporary roofing design for new construction'
    },
    {
      id: 8,
      title: 'Extensive Roof Repair',
      image: 'images/projects/image7.jpeg',
      description: 'Major roof repair with structural improvements'
    },
    {
      id: 9,
      title: 'Residential Roofing',
      image: 'images/projects/image8.jpeg',
      description: 'High-quality residential roof installation'
    },
    {
      id: 10,
      title: 'Complete Roof Overhaul',
      image: 'images/projects/image9.jpeg',
      description: 'Full roof replacement with extended warranty'
    }
  ];
  
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
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-black">Our <span className="text-red-600">Projects</span></h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-black/80 max-w-3xl mx-auto">
            Browse through our portfolio of completed projects showcasing our expertise and quality workmanship
          </p>
        </div>
        
        {/* Featured Video */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold mb-6 text-center text-black">Featured Project Video</h3>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <video 
              ref={videoRef}
              className="w-full h-auto" 
              poster="images/projects/image0.jpeg"
              controls
              preload="metadata"
              playsInline
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            >
              <source src="images/projects/Video.mov" type="video/quicktime" />
              <source src="images/projects/Video.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-6 bg-white border border-gray-200">
              <h4 className="text-xl font-bold text-black mb-2">Complete Roof Replacement Process</h4>
              <p className="text-black/80">Watch our team in action as we complete a full residential roof replacement from start to finish.</p>
              <button 
                onClick={handlePlayVideo}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Play Video
              </button>
            </div>
          </div>
        </div>
        
        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map(project => (
            <motion.div 
              key={project.id}
              className="group rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'images/projects/fallback.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/90">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                <p className="text-black/80 mb-4">{project.description}</p>
                <div className="flex justify-end">
                  <a href="#contact" className="text-red-600 font-medium hover:text-red-700 transition-colors">
                    Request Similar
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          <a href="#contact" className="inline-block px-8 py-4 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:shadow-lg">
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
