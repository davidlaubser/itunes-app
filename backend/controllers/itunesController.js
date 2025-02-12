const axios = require('axios');

// Function to get iTunes search results
async function getItunesResults(term, media) {
  const baseURL = 'https://itunes.apple.com/search'; // iTunes API base URL
  const params = { term: term, limit: 25 }; // Search parameters limit to 25 results

  // Add media type to search parameters if provided (defaults to 'all')
  if (media && media !== 'all') {
    params.media = media;
  }

  // Make GET request to iTunes API with search parameters
  const response = await axios.get(baseURL, { params });

  // Map results to a simplified object/format
  const mappedResults = response.data.results.map(item => ({
    trackName: item.trackName || item.collectionName || 'Unknown', // Track or collection name
    artistName: item.artistName || 'Unknown Artist', // Artist name
    artworkUrl100: item.artworkUrl100 || '/placeholder.jpg', // Album artwork
    releaseDate: item.releaseDate || 'Unknown Date', // Release date
    kind: item.kind || item.wrapperType || 'Unknown', // Type of result (song, album, etc.)
  }));

  // Return mapped results
  return mappedResults;
}

// Export getItunesResults function
module.exports = {
  getItunesResults
};
