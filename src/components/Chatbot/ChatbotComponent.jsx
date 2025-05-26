import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '../../services/emailService';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContact, setUserContact] = useState({
    name: '',
    phone: '',
    email: '',
    askingFor: ''
  });
  const [collectingContact, setCollectingContact] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Initial bot message
  useEffect(() => {
    const initialMessage = {
      role: 'bot',
      content: 'Hello! I\'m Mendez Roofing\'s virtual assistant. To help you better, could you please provide your name?',
      options: [],
      collectingContact: true
    };
    setCollectingContact(true);
    
    setMessages([initialMessage]);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Process user input and generate response
    setTimeout(async () => {
      setIsTyping(false);
      const botResponse = processUserInput(inputValue);
      setMessages(prev => [...prev, botResponse]);
      
      // Only send email if we're not collecting contact info or if we just finished collecting it
      if (!collectingContact && !botResponse.collectingContact) {
        await sendChatMessage(`User: ${inputValue}\n\nBot: ${botResponse.content}`, null);
      } else if (botResponse.emailData) {
        // Send email with complete contact information
        await sendChatMessage(botResponse.emailData.message, botResponse.emailData.contact);
      }
    }, 1500);
  };
  
  const handleOptionClick = async (option) => {
    // Add user message
    const userMessage = {
      role: 'user',
      content: option
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Process user input and generate response
    setTimeout(async () => {
      setIsTyping(false);
      const botResponse = processUserInput(option.toLowerCase());
      setMessages(prev => [...prev, botResponse]);

      // Handle email sending if needed
      if (botResponse.emailData) {
        await sendChatMessage(botResponse.emailData.message, botResponse.emailData.contact);
      }
    }, 1500);
  };
  
  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Check for square footage in the input
    const squareFootageMatch = lowerInput.match(/(\d+)\s*(?:sq\s*ft|square\s*feet|sqft|sf|square)/i);
    if (squareFootageMatch) {
      const sqft = parseInt(squareFootageMatch[1]);
      const squares = Math.ceil(sqft / 100);
      const pricePerSquare = 325; // Average price per square
      const totalPrice = squares * pricePerSquare;
      
      setCollectingContact(true);
      setUserContact(prev => ({ ...prev, askingFor: 'quote' }));
      return {
        role: 'bot',
        collectingContact: true,
        content: `Based on ${sqft} square feet (${squares} squares), your estimated price would be $${totalPrice}. This is a rough estimate and the final price may vary based on:

• Roof complexity
• Material choices
• Current roof condition

To get back to you with a detailed quote, I'll need your contact information. What's your name?`,
        options: []
      };
    }
    
    // Predefined responses
    const responses = {
      'get a quote': {
        content: 'I can help you calculate a rough estimate. Please tell me the approximate square footage of your roof (e.g., "1500 sq ft"). Remember, this will be a basic estimate, and the final price may vary after inspection.',
        options: ['Example: 1500 sq ft', 'Not sure', 'Schedule inspection']
      },
      'services info': {
        content: 'We offer a comprehensive range of roofing services including:\n\n• Roof Replacement\n• Roof Repairs\n• Insurance Claims Assistance\n• Fencing\n• Drywall Services\n• Emergency Services\n\nWhich service would you like to learn more about?',
        options: ['Roof Replacement', 'Roof Repairs', 'Insurance Claims', 'Fencing', 'Drywall', 'Emergency']
      },
      'emergency repair': {
        content: 'I understand you need emergency assistance. Our team is available for urgent roofing problems. Please call us at (214) 489-2828 for assistance, or provide your contact information and a brief description of the issue, and we\'ll reach out right away.',
        options: ['Call now', 'Leave contact info']
      },
      'contact us': {
        content: 'You can reach us through several channels:\n\n• Phone: (214) 489-2828\n• Email: mendezfabian880@gmail.com\n• Office: 9610 Marianna Way, Alvarado, TX 76009\n\nOur business hours are flexible as the company owner can receive calls anytime. Would you like us to contact you?',
        options: ['Yes, contact me', 'No, thanks']
      },
      'free inspection': {
        content: 'We\'d be happy to provide a free roof inspection! This includes a comprehensive assessment of your roof\'s condition and a detailed report of any issues found. When would be a good time for our team to visit your property?',
        options: ['Schedule now', 'Call me', 'More info']
      }
    };
    
    // Check for predefined responses
    for (const [key, response] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return {
          role: 'bot',
          content: response.content,
          options: response.options
        };
      }
    }
    
    // Handle contact information collection
    if (collectingContact) {
      if (!userContact.name) {
        setUserContact(prev => ({ ...prev, name: input }));
        return {
          role: 'bot',
          content: 'Thanks! What\'s your phone number?',
          options: [],
          collectingContact: true
        };
      } else if (!userContact.phone) {
        setUserContact(prev => ({ ...prev, phone: input }));
        return {
          role: 'bot',
          content: 'Great! Finally, what\'s your email address?',
          options: [],
          collectingContact: true
        };
      } else if (!userContact.email) {
        const updatedContact = { ...userContact, email: input };
        setUserContact(updatedContact);
        setCollectingContact(false);

        // Send the complete conversation with contact info
        const conversationHistory = messages.map(msg => 
          `${msg.role === 'user' ? 'User' : 'Bot'}: ${msg.content}`
        ).join('\n\n');
        
        // Return an object that includes the email data to be sent
        return {
          role: 'bot',
          content: `Perfect! How can I help you today? We offer free roof inspections!`,
          options: ['Get a quote', 'Services info', 'Emergency repair', 'Free inspection'],
          emailData: {
            message: `${conversationHistory}\n\nUser: ${input}\n\nBot: Contact information collected.`,
            contact: updatedContact
          }
        };
      }
    }

    // Default responses based on keywords
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('quote')) {
      return {
        role: 'bot',
        content: responses['get a quote'].content,
        options: responses['get a quote'].options
      };
    } else if (lowerInput.includes('service') || lowerInput.includes('offer')) {
      return {
        role: 'bot',
        content: responses['services info'].content,
        options: responses['services info'].options
      };
    } else if (lowerInput.includes('emergency') || lowerInput.includes('urgent') || lowerInput.includes('leak')) {
      return {
        role: 'bot',
        content: responses['emergency repair'].content,
        options: responses['emergency repair'].options
      };
    } else if (lowerInput.includes('contact') || lowerInput.includes('call') || lowerInput.includes('phone')) {
      return {
        role: 'bot',
        content: responses['contact us'].content,
        options: responses['contact us'].options
      };
    } else if (lowerInput.includes('inspection') || lowerInput.includes('free') || lowerInput.includes('check')) {
      return {
        role: 'bot',
        content: responses['free inspection'].content,
        options: responses['free inspection'].options
      };
    } else {
      // For any unhandled message, collect contact info first
      setCollectingContact(true);
      setUserContact(prev => ({ ...prev, askingFor: 'general inquiry' }));
      return {
        role: 'bot',
        collectingContact: true,
        content: 'I\'d be happy to help you with that. First, could you please provide your name so we can get back to you?',
        options: []
      };
    }
  };
  
  // Force the component to always be visible
  useEffect(() => {
    // Add a style tag to ensure the chatbot button is always visible
    const style = document.createElement('style');
    style.innerHTML = `
      .chatbot-button {
        position: fixed !important;
        bottom: 24px !important;
        right: 24px !important;
        width: 80px !important;
        height: 80px !important;
        border-radius: 50% !important;
        background-color: #dc2626 !important;
        color: white !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
        z-index: 99999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border: 3px solid white !important;
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={toggleChat}
          style={{ 
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            color: 'white',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid white',
            cursor: 'pointer'
          }}
        >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">1</span>
            </div>
        </button>
      )}
      
      {/* Chat box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-full max-w-md z-50"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200 flex flex-col h-[500px]">
              {/* Chat header */}
              <div className="bg-black p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Mendez Roofing Assistant</h3>
                    <p className="text-white/70 text-sm">Ask us anything about roofing</p>
                  </div>
                </div>
                <button 
                  onClick={toggleChat}
                  className="text-white hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((message, index) => (
                  <div key={index} className="mb-4">
                    {message.role === 'user' ? (
                      <div className="flex justify-end">
                        <div className="bg-red-600 text-white rounded-lg py-2 px-4 max-w-[80%]">
                          <p>{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-lg py-2 px-4 max-w-[80%] shadow-sm">
                          <p className="text-black whitespace-pre-line">{message.content}</p>
                          
                          {message.options && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.options.map((option, optIndex) => (
                                <button
                                  key={optIndex}
                                  onClick={() => handleOptionClick(option)}
                                  className="bg-gray-100 hover:bg-gray-200 text-black text-sm rounded-full px-3 py-1 transition-colors"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white border border-gray-200 rounded-lg py-2 px-4 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-red-600 text-white rounded-r-lg px-4 py-2 hover:bg-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Messages are sent to mendezfabian880@gmail.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotComponent;
