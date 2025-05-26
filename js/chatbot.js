/**
 * Mendez Roofing - AI Chatbot
 * Advanced AI-powered chatbot for customer support
 */

class RoofingChatbot {
  constructor() {
    this.chatContainer = null;
    this.chatMessages = null;
    this.chatInput = null;
    this.chatToggle = null;
    this.isOpen = false;
    this.isTyping = false;
    this.initMessages = [
      {
        role: 'bot',
        content: 'Hello! I\'m Mendez Roofing\'s virtual assistant. How can I help you today?',
        options: ['Get a quote', 'Services info', 'Emergency repair', 'Contact us']
      }
    ];
    this.messages = [...this.initMessages];
    this.responses = {
      'get a quote': 'I\'d be happy to help you get a quote! Our pricing is typically around $300-350 per square (100 sq ft). The final price will be settled after a professional inspection. To provide an accurate estimate, we\'ll need some information about your property. Could you tell me:\n\n1. What type of roof do you have? (e.g., asphalt shingles, metal, flat)\n2. Approximate square footage of your roof\n3. Are you looking for repair or replacement?',
      'services info': 'We offer a comprehensive range of roofing services including:\n\n• Roof replacement\n• Roof repairs\n• Assistance with insurance claims\n• Fencing\n• Drywall\n\nWhich service would you like to learn more about?',
      'emergency repair': 'I understand you need emergency assistance. Our team is available for urgent roofing problems. Please call us at (214) 489-2828 for assistance, or provide your contact information and a brief description of the issue, and we\'ll reach out right away.',
      'contact us': 'You can reach us through several channels:\n\n• Phone: (214) 489-2828\n• Email: mendezfabian880@gmail.com\n• Office: 9610 Marianna Way, Alvarado, TX 76009\n\nOur business hours are flexible as the company owner can receive calls anytime. Would you like us to contact you?'
    };
    this.init();
  }

  init() {
    this.createChatInterface();
    this.bindEvents();
    this.renderMessages();
    
    // Add typing animation
    setTimeout(() => {
      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMessage('bot', 'We offer free roof inspections! Would you like to schedule one today?');
      }, 2000);
    }, 1000);
  }

  createChatInterface() {
    // Create chat container
    this.chatContainer = document.createElement('div');
    this.chatContainer.className = 'chatbot-container';
    this.chatContainer.innerHTML = `
      <div class="chatbot-toggle">
        <div class="chatbot-toggle-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v7h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
        <span class="chatbot-toggle-badge">1</span>
      </div>
      <div class="chatbot-box">
        <div class="chatbot-header">
          <div class="chatbot-title">
            <div class="chatbot-title-icon">
              <i class="fas fa-hard-hat"></i>
            </div>
            <div>
              <h3>Mendez Roofing</h3>
              <p>Virtual Assistant</p>
            </div>
          </div>
          <button class="chatbot-close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="chatbot-messages"></div>
        <div class="chatbot-typing">
          <div class="chatbot-typing-dot"></div>
          <div class="chatbot-typing-dot"></div>
          <div class="chatbot-typing-dot"></div>
        </div>
        <div class="chatbot-input-container">
          <input type="text" class="chatbot-input" placeholder="Type your message...">
          <button class="chatbot-send-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(this.chatContainer);
    
    // Get elements
    this.chatToggle = document.querySelector('.chatbot-toggle');
    this.chatBox = document.querySelector('.chatbot-box');
    this.chatClose = document.querySelector('.chatbot-close');
    this.chatMessages = document.querySelector('.chatbot-messages');
    this.chatInput = document.querySelector('.chatbot-input');
    this.chatSend = document.querySelector('.chatbot-send-btn');
    this.typingIndicator = document.querySelector('.chatbot-typing');
    
    // Hide typing indicator initially
    this.hideTypingIndicator();
  }

  bindEvents() {
    // Toggle chat open/close
    this.chatToggle.addEventListener('click', () => this.toggleChat());
    this.chatClose.addEventListener('click', () => this.toggleChat());
    
    // Send message on button click
    this.chatSend.addEventListener('click', () => this.sendMessage());
    
    // Send message on Enter key
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // Handle option clicks
    this.chatMessages.addEventListener('click', (e) => {
      if (e.target.classList.contains('chatbot-quick-reply')) {
        const option = e.target.textContent.toLowerCase();
        this.addMessage('user', e.target.textContent);
        this.processUserInput(option);
      }
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatBox.classList.add('open');
      this.chatToggle.classList.add('hidden');
      // Remove notification badge when opened
      document.querySelector('.chatbot-toggle-badge').style.display = 'none';
    } else {
      this.chatBox.classList.remove('open');
      this.chatToggle.classList.remove('hidden');
    }
  }

  showTypingIndicator() {
    this.isTyping = true;
    this.typingIndicator.style.display = 'flex';
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    this.isTyping = false;
    this.typingIndicator.style.display = 'none';
  }

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (message) {
      this.addMessage('user', message);
      this.chatInput.value = '';
      this.processUserInput(message.toLowerCase());
    }
  }

  processUserInput(input) {
    // Show typing indicator
    this.showTypingIndicator();
    
    // Process after a delay to simulate thinking
    setTimeout(() => {
      this.hideTypingIndicator();
      
      // Check for predefined responses
      for (const [key, response] of Object.entries(this.responses)) {
        if (input.includes(key)) {
          this.addMessage('bot', response);
          return;
        }
      }
      
      // Default responses based on keywords
      if (input.includes('price') || input.includes('cost') || input.includes('quote')) {
        this.addMessage('bot', this.responses['get a quote']);
      } else if (input.includes('service') || input.includes('offer')) {
        this.addMessage('bot', this.responses['services info']);
      } else if (input.includes('emergency') || input.includes('urgent') || input.includes('leak')) {
        this.addMessage('bot', this.responses['emergency repair']);
      } else if (input.includes('contact') || input.includes('call') || input.includes('phone')) {
        this.addMessage('bot', this.responses['contact us']);
      } else if (input.includes('insurance') || input.includes('claim')) {
        this.addMessage('bot', 'We provide expert assistance with insurance claims for roof damage. Our team will help you navigate the entire process, from initial assessment to final settlement. Would you like to schedule a free inspection?', ['Schedule Inspection', 'Learn More', 'Contact Us']);
      } else if (input.includes('fence') || input.includes('fencing')) {
        this.addMessage('bot', 'Our fencing services include installation, repair, and replacement of various fence types. We offer competitive pricing and quality craftsmanship. Would you like a free estimate for your fencing project?', ['Get Estimate', 'Fence Types', 'Contact Us']);
      } else if (input.includes('drywall')) {
        this.addMessage('bot', 'We provide professional drywall installation and repair services. Whether you need patching, texturing, or complete installation, our team delivers quality results. Would you like to discuss your drywall project?', ['Get Quote', 'Learn More', 'Contact Us']);
      } else {
        // Generic response
        this.addMessage('bot', 'Thank you for your message. One of our roofing experts will review your inquiry and get back to you shortly. Is there anything specific about our services you\'d like to know?', ['Services', 'Pricing', 'Contact Us']);
      }
    }, 1500);
  }

  addMessage(role, content, options = []) {
    this.messages.push({ role, content, options });
    
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message ${role}`;
    
    // Format message content with line breaks
    const formattedContent = content.replace(/\n/g, '<br>');
    
    messageElement.innerHTML = `
      ${formattedContent}
      ${options.length > 0 ? `
        <div class="chatbot-quick-replies">
          ${options.map(option => `<button class="chatbot-quick-reply">${option}</button>`).join('')}
        </div>
      ` : ''}
      <div class="chatbot-message-time">${this.getCurrentTime()}</div>
    `;
    
    this.chatMessages.appendChild(messageElement);
    this.scrollToBottom();
    
    // Add event listeners to quick reply buttons
    if (options.length > 0) {
      const quickReplyButtons = messageElement.querySelectorAll('.chatbot-quick-reply');
      quickReplyButtons.forEach(button => {
        button.addEventListener('click', () => {
          const replyText = button.textContent;
          this.handleUserInput(replyText);
        });
      });
    }
  }

  renderMessages() {
    this.chatMessages.innerHTML = '';
    this.messages.forEach(message => {
      this.renderMessage(message);
    });
    this.scrollToBottom();
  }

  renderMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message ${message.role}`;
    
    let messageContent = `<div class="message-content">${this.formatMessage(message.content)}</div>`;
    
    // Add options if available
    if (message.options && message.options.length > 0 && message.role === 'bot') {
      let optionsHTML = '<div class="chatbot-options">';
      message.options.forEach(option => {
        optionsHTML += `<button class="chatbot-option">${option}</button>`;
      });
      optionsHTML += '</div>';
      messageContent += optionsHTML;
    }
    
    messageElement.innerHTML = messageContent;
    this.chatMessages.appendChild(messageElement);
  }

  formatMessage(content) {
    // Convert line breaks to <br>
    return content.replace(/\n/g, '<br>');
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  reset() {
    this.messages = [...this.initMessages];
    this.renderMessages();
  }

  getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  handleUserInput(replyText) {
    this.addMessage('user', replyText);
    this.processUserInput(replyText.toLowerCase());
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize after a short delay to ensure elements are ready
  setTimeout(() => {
    window.roofingChatbot = new RoofingChatbot();
  }, 1000);
});
