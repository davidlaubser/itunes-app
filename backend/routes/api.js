const express = require('express');
const { query, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { getItunesResults } = require('../controllers/itunesController');
const generateToken = require('../utils/generateToken');
const auth = require('../middleware/auth');

const router = express.Router();

// Rate limiter for token route to prevent abuse
const tokenLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    message: { message: 'Too many requests, please try again later' },
});

// Public route to get a token
router.get('/token', tokenLimiter, (req, res) => {
    const token = generateToken();
    res.json({ token });
});

// Secure route to search iTunes
router.get(
    '/search',
    [
        query('term').notEmpty().withMessage('Search term is required'),
        query('media')
            .optional()
            .isIn(['all', 'music', 'movie', 'podcast', 'ebook', 'audiobook', 'software', 'tvShow'])
            .withMessage('Invalid media type'),
    ],
    // Authenticate request
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { term, media } = req.query;

        try {
            const results = await getItunesResults(term, media);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred fetching iTunes data.' });
        }
    }
);

module.exports = router;
