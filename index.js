const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// ✅ Your Unsplash API Key
const UNSPLASH_API_KEY = 'j6Ypb6iH57j5I9QXL-dVR_gEcobyh0Mmdym-bOZn9Oo';

// GET /unsplash?query=cats
app.get('/unsplash', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 5
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`
      }
    });

    const results = response.data.results.map(photo => ({
      title: photo.alt_description || 'Untitled',
      imageUrl: photo.urls.regular,
      thumbnail: photo.urls.thumb,
      photographer: photo.user.name,
      profile: photo.user.links.html
    }));

    res.json(results);

  } catch (error) {
    console.error("❌ Unsplash API error:", error.message);
    res.status(500).json({ error: 'Failed to fetch from Unsplash', detail: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Unsplash API running at http://localhost:${PORT}`);
});