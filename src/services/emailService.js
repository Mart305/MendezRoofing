import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('u8W7Y5gMGX1ha3dpA'); // Public Key

export const sendEmail = async (formData) => {
  try {
    const templateParams = {
      to_email: 'mendezfabian880@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      service_type: formData.service,
      message: `A message by ${formData.name} has been received:

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}
- Service Type: ${formData.service}

Message:
${formData.message}`
    };

    const response = await emailjs.send(
      'service_cqita18', // Service ID
      'template_e189z6y', // Template ID
      templateParams
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

export const sendChatMessage = async (message, contactInfo = null) => {
  try {
    const templateParams = {
      to_email: 'mendezfabian880@gmail.com',
      from_name: 'Website Chat',
      from_email: 'chat@mendezroofing.com',
      phone: 'N/A',
      service_type: 'Chat Conversation',
      message: `A new chat conversation has been recorded:

${message}

${contactInfo ? `Contact Information:
- Name: ${contactInfo.name || 'Not provided'}
- Phone: ${contactInfo.phone || 'Not provided'}
- Email: ${contactInfo.email || 'Not provided'}
- Inquiring About: ${contactInfo.askingFor || 'General inquiry'}

` : ''}Timestamp: ${new Date().toLocaleString()}`
    };

    const response = await emailjs.send(
      'service_cqita18', // Service ID
      'template_e189z6y', // Template ID
      templateParams
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Chat message sending failed:', error);
    return { success: false, error: error.message };
  }
};
