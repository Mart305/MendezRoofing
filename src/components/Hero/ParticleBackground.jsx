import React, { useRef, useEffect, useState } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });
  const animationFrameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      // Setup canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d', { alpha: true });
      contextRef.current = ctx;
      
      // Initialize particles
      initParticles();
      
      // Start animation
      animate();
      
      // Event listeners
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      
      // Show canvas with fade-in effect
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameRef.current);
      };
    } catch (error) {
      console.error("Error initializing particle background:", error);
    }
  }, []);
  
  const initParticles = () => {
    particlesRef.current = [];
    
    // Adjust number of particles based on screen size and device performance
    const isHighPerformanceDevice = window.devicePixelRatio > 1 && window.innerWidth > 1024;
    const particleDensity = isHighPerformanceDevice ? 7000 : 9000;
    
    const numberOfParticles = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / particleDensity),
      isHighPerformanceDevice ? 200 : 150
    );
    
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 5 + 1;
      const x = Math.random() * (window.innerWidth - size * 2);
      const y = Math.random() * (window.innerHeight - size * 2);
      const directionX = Math.random() * 1 - 0.5;
      const directionY = Math.random() * 1 - 0.5;
      const color = getRandomColor();
      const opacity = Math.random() * 0.5 + 0.3;
      const blurFactor = Math.random() > 0.8 ? Math.random() * 2 : 0;
      
      particlesRef.current.push({
        x,
        y,
        directionX,
        directionY,
        size,
        color,
        baseSize: size,
        density: Math.random() * 30 + 1,
        opacity,
        baseOpacity: opacity,
        blurFactor,
        pulse: Math.random() > 0.9, // Some particles will pulse
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        trail: Math.random() > 0.95, // Some particles will have trails
        trailPositions: []
      });
    }
  };
  
  const getRandomColor = () => {
    // Enhanced palette with more vibrant colors and variations
    const colors = [
      // Reds (primary brand color)
      'rgba(225, 6, 0, 1)',     // Vibrant red
      'rgba(190, 0, 0, 1)',     // Dark red
      'rgba(255, 50, 50, 1)',   // Light red
      
      // Golds (secondary brand color)
      'rgba(255, 215, 0, 1)',   // Gold
      'rgba(212, 175, 55, 1)',  // Darker gold
      'rgba(255, 223, 0, 1)',   // Bright gold
      
      // Whites and light colors for contrast
      'rgba(255, 255, 255, 1)', // Pure white
      'rgba(240, 240, 240, 1)', // Off-white
      
      // Accent colors (used sparingly)
      'rgba(50, 50, 50, 1)',    // Dark gray
      'rgba(30, 30, 30, 1)'     // Near black
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Re-initialize particles on resize
    initParticles();
  };
  
  const handleMouseMove = (e) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches && e.touches[0]) {
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    }
  };
  
  const animate = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Get current time for animations
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];
      
      // Update particle size if it pulses
      if (particle.pulse) {
        const pulseFactor = Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.5 + 0.5;
        particle.size = particle.baseSize * (1 + pulseFactor * 0.5);
        particle.opacity = particle.baseOpacity * (0.7 + pulseFactor * 0.3);
      }
      
      // Store position for trail effect
      if (particle.trail) {
        particle.trailPositions.unshift({ x: particle.x, y: particle.y });
        if (particle.trailPositions.length > 5) {
          particle.trailPositions.pop();
        }
        
        // Draw trail
        if (particle.trailPositions.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.trailPositions[0].x, particle.trailPositions[0].y);
          
          for (let j = 1; j < particle.trailPositions.length; j++) {
            ctx.lineTo(particle.trailPositions[j].x, particle.trailPositions[j].y);
          }
          
          ctx.strokeStyle = particle.color.replace('1)', `${0.3 - j * 0.05})`);
          ctx.lineWidth = particle.size / 2;
          ctx.stroke();
        }
      }
      
      // Apply blur effect to some particles
      if (particle.blurFactor > 0) {
        ctx.shadowBlur = particle.blurFactor * 5;
        ctx.shadowColor = particle.color;
      } else {
        ctx.shadowBlur = 0;
      }
      
      // Draw particle
      const colorWithOpacity = particle.color.replace('1)', `${particle.opacity})`);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = colorWithOpacity;
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
      
      // Update position with slight acceleration/deceleration for more natural movement
      const speedFactor = Math.sin(time * 0.5 + i) * 0.1 + 0.95;
      particle.x += particle.directionX * speedFactor;
      particle.y += particle.directionY * speedFactor;
      
      // Boundary collision detection with smoother bounce
      if (particle.x > window.innerWidth - particle.size || particle.x < particle.size) {
        particle.directionX *= -0.9; // Reduce speed slightly on bounce
        
        // Keep particle within bounds
        if (particle.x > window.innerWidth - particle.size) {
          particle.x = window.innerWidth - particle.size;
        } else if (particle.x < particle.size) {
          particle.x = particle.size;
        }
      }
      
      if (particle.y > window.innerHeight - particle.size || particle.y < particle.size) {
        particle.directionY *= -0.9; // Reduce speed slightly on bounce
        
        // Keep particle within bounds
        if (particle.y > window.innerHeight - particle.size) {
          particle.y = window.innerHeight - particle.size;
        } else if (particle.y < particle.size) {
          particle.y = particle.size;
        }
      }
      
      // Mouse interaction with improved effects
      if (mouseRef.current.x != null && mouseRef.current.y != null) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = mouseRef.current.radius;
        
        if (distance < maxDistance) {
          // Calculate repulsion force based on distance
          const force = (maxDistance - distance) / maxDistance;
          const repulsionSpeed = 3 * force;
          
          // Apply repulsion force
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * repulsionSpeed;
          particle.y -= Math.sin(angle) * repulsionSpeed;
          
          // Increase size and opacity when near mouse
          const sizeFactor = 1 + force;
          particle.size = Math.min(particle.baseSize * sizeFactor, particle.baseSize * 2.5);
          particle.opacity = Math.min(particle.baseOpacity * sizeFactor, 1);
        } else {
          // Gradually return to base size and opacity
          if (particle.size > particle.baseSize) {
            particle.size -= (particle.size - particle.baseSize) * 0.1;
          }
          
          if (particle.opacity > particle.baseOpacity) {
            particle.opacity -= (particle.opacity - particle.baseOpacity) * 0.1;
          }
        }
      }
      
      // Connect particles with lines
      connectParticles(particle, i, time);
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  const connectParticles = (particle, index, time) => {
    const ctx = contextRef.current;
    if (!ctx) return;
    
    // Dynamic connection distance based on screen size
    const connectionDistance = Math.min(window.innerWidth, window.innerHeight) * 0.07;
    
    for (let j = index + 1; j < particlesRef.current.length; j++) {
      const particle2 = particlesRef.current[j];
      const dx = particle.x - particle2.x;
      const dy = particle.y - particle2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only connect particles within the connection distance
      if (distance < connectionDistance) {
        // Line opacity based on distance and time
        const baseOpacity = 1 - distance / connectionDistance;
        const timeEffect = Math.sin(time * 0.5) * 0.1 + 0.9; // Subtle pulsing effect
        const opacity = baseOpacity * timeEffect * 0.5; // Max opacity of 0.5
        
        // Determine line color based on particle colors
        // Extract color components from rgba strings
        const color1 = particle.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        const color2 = particle2.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        
        if (color1 && color2) {
          // Blend the colors
          const r = Math.floor((parseInt(color1[1]) + parseInt(color2[1])) / 2);
          const g = Math.floor((parseInt(color1[2]) + parseInt(color2[2])) / 2);
          const b = Math.floor((parseInt(color1[3]) + parseInt(color2[3])) / 2);
          
          // Draw line with gradient
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y, 
            particle2.x, particle2.y
          );
          
          gradient.addColorStop(0, `rgba(${color1[1]}, ${color1[2]}, ${color1[3]}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${color2[1]}, ${color2[2]}, ${color2[3]}, ${opacity})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = Math.min(particle.size, particle2.size) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle2.x, particle2.y);
          ctx.stroke();
        }
      }
    }
  };
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default ParticleBackground;
