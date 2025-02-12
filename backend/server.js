require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
