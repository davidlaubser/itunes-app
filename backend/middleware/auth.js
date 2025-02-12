// Import jsonwebtoken for token verification
const jwt = require('jsonwebtoken');

// Middleware function to verify token
module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization; // Get authorization header
    if (!authHeader) return res.status(401).json({ message: 'No token provided' }); // Check if token is provided

    const token = authHeader.split(' ')[1]; // Get token from header
    if (!token) return res.status(401).json({ message: 'Invalid token format' }); // Check if token is in correct format

    // Verify token with JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' }); // Handle invalid token
        req.user = decoded; // Add decoded token data to request object
        next(); // Call next middleware or route handler
    });
};
