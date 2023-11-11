import crypto from 'crypto';

export function generateSecureUserId() {
    // Generate a random string using Node.js crypto module
    const randomString = crypto.randomBytes(16).toString('hex');
    
    // Add a timestamp for uniqueness
    const timestamp = Date.now().toString();
  
    // Combine random string and timestamp to create a more secure userId
    const secureUserId = `${randomString}-${timestamp}`;
    
    return randomString;  // for now not adding timestamp to the userId
  }