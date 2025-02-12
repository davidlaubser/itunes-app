// Import jsonwebtoken for token generation
const jwt = require('jsonwebtoken');

// Function to generate a token
function generateToken() {
    const payload = {
        app: 'itunes-search' // Payload data for token
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Sign token with payload and secret key with 1 hour expiration
}

// Export generateToken function
module.exports = generateToken;
