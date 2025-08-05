const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.post(
      'https://www.youtube.com/youtubei/v1/search?key=YOUR_API_KEY',
      {
        context: {
          client: {
            clientName: "WEB_REMIX",
            clientVersion: "1.20210912.07.00"
          }
        },
        query
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const items = response.data.contents?.sectionListRenderer?.contents || [];
    const results = items.map(i => {
      const title = i.musicShelfRenderer?.title?.runs?.[0]?.text || "Unknown";
      return { title };
    });
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
