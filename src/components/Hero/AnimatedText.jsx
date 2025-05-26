import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// Main AnimatedText component with typewriter effect
const AnimatedText = ({ 
  text, 
  className = "", 
  charDelay = 0.04, 
  typeDelay = 0, 
  cursorDuration = 0.6,
  color = "text-white",
  highlightColor = "text-primary",
  highlightWords = [],
  glowEffect = false,
  glowColor = "text-red-600",
  onComplete = () => {}
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const controls = useAnimation();
  const containerRef = useRef(null);
  
  // Split text into words and characters for animation
  const words = text.split(' ');
  
  useEffect(() => {
    let timeout;
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        
        // Add variable typing speed for more natural effect
        const variableDelay = charDelay * (0.8 + Math.random() * 0.4);
        timeout = setTimeout(typeNextChar, variableDelay * 1000);
      } else {
        setIsTyping(false);
        onComplete();
        
        // Keep cursor blinking for a while after typing is complete
        setTimeout(() => {
          setCursorVisible(false);
        }, 2000);
      }
    };
    
    // Start typing after delay
    timeout = setTimeout(typeNextChar, typeDelay * 1000);
    
    return () => clearTimeout(timeout);
  }, [text, charDelay, typeDelay, onComplete]);
  
  // Create word spans with highlighting for specific words
  const renderWords = () => {
    return words.map((word, index) => {
      const isHighlighted = highlightWords.includes(word);
      const isLastWord = index === words.length - 1;
      
      return (
        <span 
          key={index} 
          className={`inline-block ${isHighlighted ? highlightColor : color} ${
            isHighlighted && glowEffect ? `relative ${glowColor}` : ''
          }`}
          style={
            isHighlighted && glowEffect 
              ? { 
                  textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
                  transition: 'text-shadow 0.3s ease-in-out'
                } 
              : {}
          }
        >
          {word}{!isLastWord && ' '}
        </span>
      );
    });
  };
  
  // Cursor animation
  useEffect(() => {
    controls.start({
      opacity: [1, 0],
      transition: {
        duration: cursorDuration,
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [controls, cursorDuration]);
  
  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <div className="relative">
        {renderWords()}
        
        {cursorVisible && (
          <motion.span
            animate={controls}
            className={`absolute -right-[2px] top-0 h-full w-[2px] ${highlightColor} bg-current`}
          />
        )}
      </div>
    </div>
  );
};

// Advanced version with character-by-character animation
export const AnimatedCharacters = ({ 
  text, 
  className = "", 
  charDelay = 0.03,
  staggerChildren = 0.01,
  color = "text-white",
  highlightColor = "text-primary",
  highlightWords = [],
  animation = "fadeUp", // Options: fadeUp, fadeIn, bounce, wave, flip, glitch
  onComplete = () => {}
}) => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  
  // Split text into words and characters for animation
  const words = text.split(' ');
  
  // Character animation variants based on selected animation style
  const getCharVariants = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: (i) => ({
            opacity: 1,
            transition: {
              delay: i * staggerChildren,
              duration: 0.3,
              ease: "easeOut"
            }
          })
        };
      
      case 'bounce':
        return {
          hidden: { 
            opacity: 0,
            y: 20,
            scale: 0.8
          },
          visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              delay: i * staggerChildren,
              duration: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 10
            }
          })
        };
      
      case 'wave':
        return {
          hidden: { 
            opacity: 0,
            y: 0
          },
          visible: (i) => ({
            opacity: 1,
            y: [0, -15, 0],
            transition: {
              delay: i * staggerChildren,
              duration: 0.5,
              times: [0, 0.6, 1],
              ease: "easeInOut"
            }
          })
        };
      
      case 'flip':
        return {
          hidden: { 
            opacity: 0,
            rotateX: 90,
            y: 20
          },
          visible: (i) => ({
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: {
              delay: i * staggerChildren,
              duration: 0.4,
              ease: [0.2, 0.65, 0.3, 0.9]
            }
          })
        };
      
      case 'glitch':
        return {
          hidden: { 
            opacity: 0,
            x: -5,
            skewX: 10
          },
          visible: (i) => ({
            opacity: 1,
            x: [5, -3, 0],
            skewX: [-5, 3, 0],
            transition: {
              delay: i * staggerChildren,
              duration: 0.4,
              times: [0, 0.6, 1],
              ease: "easeOut"
            }
          })
        };
      
      case 'fadeUp':
      default:
        return {
          hidden: { 
            opacity: 0,
            y: 20,
            rotateX: 90
          },
          visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              delay: i * staggerChildren,
              duration: 0.3,
              ease: [0.2, 0.65, 0.3, 0.9]
            }
          })
        };
    }
  };
  
  const charVariants = getCharVariants();
  
  useEffect(() => {
    controls.start("visible")
      .then(() => {
        onComplete();
      });
  }, [controls, onComplete]);
  
  // Render each character with animation
  const renderCharacters = () => {
    let charIndex = 0;
    
    return words.map((word, wordIndex) => {
      const isHighlighted = highlightWords.includes(word);
      const isLastWord = wordIndex === words.length - 1;
      const characters = word.split('');
      
      return (
        <span key={wordIndex} className={`inline-block ${isHighlighted ? highlightColor : color}`}>
          {characters.map((char, charIdx) => {
            const currentIndex = charIndex++;
            
            return (
              <motion.span
                key={`${wordIndex}-${charIdx}`}
                custom={currentIndex}
                variants={charVariants}
                initial="hidden"
                animate={controls}
                className="inline-block"
                style={{ 
                  transformOrigin: "bottom center",
                  display: "inline-block",
                  ...(isHighlighted ? { 
                    textShadow: animation === 'glitch' ? '0 0 5px currentColor, 2px 2px 0px rgba(255,0,0,0.5), -2px -2px 0px rgba(0,0,255,0.5)' : '0 0 10px currentColor'
                  } : {})
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {!isLastWord && (
            <motion.span
              custom={charIndex++}
              variants={charVariants}
              initial="hidden"
              animate={controls}
              className="inline-block"
            >
              &nbsp;
            </motion.span>
          )}
        </span>
      );
    });
  };
  
  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {renderCharacters()}
    </div>
  );
};

// Animated gradient text component
export const GradientText = ({ 
  text,
  className = "",
  gradientColors = ["#e10600", "#ffd700"],
  duration = 3,
  angle = 45,
  size = "text-4xl",
  fontWeight = "font-bold",
  interactive = false,
  textShadow = false,
  textStroke = false,
  strokeWidth = "1px",
  strokeColor = "rgba(255,255,255,0.2)"
}) => {
  const [gradientAngle, setGradientAngle] = useState(angle);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);
  
  // Animate gradient angle
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle mouse interaction if enabled
  useEffect(() => {
    if (interactive && textRef.current) {
      const handleMouseMove = (e) => {
        const rect = textRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      };
      
      textRef.current.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        if (textRef.current) {
          textRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, [interactive]);
  
  // Calculate gradient based on mouse position or animated angle
  const getGradient = () => {
    if (interactive && textRef.current) {
      const width = textRef.current.offsetWidth;
      const height = textRef.current.offsetHeight;
      const x = (mousePosition.x / width) * 100;
      const y = (mousePosition.y / height) * 100;
      
      return `linear-gradient(${gradientAngle}deg, ${gradientColors[0]} ${x}%, ${gradientColors[1]} ${y}%)`;
    }
    
    return `linear-gradient(${gradientAngle}deg, ${gradientColors.join(', ')})`;
  };
  
  // Text shadow effect
  const getShadowStyle = () => {
    if (!textShadow) return {};
    
    return {
      textShadow: `0 0 10px ${gradientColors[0]}80, 0 0 20px ${gradientColors[1]}40`
    };
  };
  
  // Text stroke effect
  const getStrokeStyle = () => {
    if (!textStroke) return {};
    
    return {
      WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
      textStroke: `${strokeWidth} ${strokeColor}`
    };
  };
  
  return (
    <motion.div
      ref={textRef}
      className={`${size} ${fontWeight} ${className}`}
      style={{
        backgroundImage: getGradient(),
        backgroundSize: '100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        transition: 'text-shadow 0.3s ease',
        cursor: interactive ? 'default' : 'auto',
        ...getShadowStyle(),
        ...getStrokeStyle()
      }}
      whileHover={interactive ? { scale: 1.02 } : {}}
    >
      {text}
    </motion.div>
  );
};

// Animated text reveal with mask effect
export const RevealText = ({
  text,
  className = "",
  color = "text-white",
  revealDuration = 1.2,
  delay = 0,
  direction = "leftToRight", // leftToRight, rightToLeft, topToBottom, bottomToTop
  onComplete = () => {}
}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible")
      .then(() => {
        onComplete();
      });
  }, [controls, onComplete]);
  
  // Get animation variants based on direction
  const getVariants = () => {
    switch (direction) {
      case 'rightToLeft':
        return {
          hidden: { width: "0%" },
          visible: {
            width: "100%",
            transition: {
              delay,
              duration: revealDuration,
              ease: [0.25, 1, 0.5, 1]
            }
          }
        };
      case 'topToBottom':
        return {
          hidden: { height: "0%" },
          visible: {
            height: "100%",
            transition: {
              delay,
              duration: revealDuration,
              ease: [0.25, 1, 0.5, 1]
            }
          }
        };
      case 'bottomToTop':
        return {
          hidden: { height: "0%", top: "100%" },
          visible: {
            height: "100%",
            top: "0%",
            transition: {
              delay,
              duration: revealDuration,
              ease: [0.25, 1, 0.5, 1]
            }
          }
        };
      case 'leftToRight':
      default:
        return {
          hidden: { width: "0%" },
          visible: {
            width: "100%",
            transition: {
              delay,
              duration: revealDuration,
              ease: [0.25, 1, 0.5, 1]
            }
          }
        };
    }
  };
  
  const isHorizontal = direction === 'leftToRight' || direction === 'rightToLeft';
  const variants = getVariants();
  
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <div className={`invisible ${color}`}>{text}</div>
      <motion.div
        className={`absolute top-0 left-0 ${isHorizontal ? 'h-full' : 'w-full'} overflow-hidden`}
        variants={variants}
        initial="hidden"
        animate={controls}
        style={{
          originX: direction === 'rightToLeft' ? 1 : 0,
          originY: direction === 'bottomToTop' ? 1 : 0
        }}
      >
        <div className={color}>{text}</div>
      </motion.div>
    </div>
  );
};

export default AnimatedText;
