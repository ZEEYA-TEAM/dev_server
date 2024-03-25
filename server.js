//server.js
const express = require('express'); // Express.js biblioteket för att skapa servern
const axios = require('axios'); // Axios biblioteket för att göra HTTP-anrop
const cors = require('cors'); // CORS biblioteket för att tillåta cross-origin requests
const app = express(); // Skapa en ny Express applikation

// Middleware
app.use(cors()); // Aktivera CORS för alla domäner
app.use(express.json()); // Parsa JSON-baserade inkommande förfrågningar

// Konstanter för Notion API
const NOTION_API_BASE_URL = 'https://api.notion.com/v1'; // Bas URL för Notion API
const NOTION_API_KEY = process.env.NOTION_API_KEY; // Din Notion API-nyckel (bör hanteras säkrare i praktiken)

app.post('/api/notion/projects', async (req, res) => {
  const ID = '0cb39c6042c547a988326a168176d6fe';
  
  try {
    const response = await axios.post(`${NOTION_API_BASE_URL}/databases/${ID}/query`, req.body, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      }
    });

    res.json(response.data);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/notion/people', async (req, res) => {
  const ID = 'b86de2e54b4c4e7789b07dc308489e4d';
  
  try {
    const response = await axios.post(`${NOTION_API_BASE_URL}/databases/${ID}/query`, req.body, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      }
    });

    res.json(response.data);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/notion/timereports', async (req, res) => {
  const ID = 'fba06eb24c9241e585ab41aaae362e31';
  
  try {
    const response = await axios.post(`${NOTION_API_BASE_URL}/databases/${ID}/query`, req.body, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      }
    });

    res.json(response.data);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/notion/logs', async (req, res) => {
  const ID = 'ecf2a1f577244a539f6bda8cefbc8c5f';
  
  try {
    const response = await axios.post(`${NOTION_API_BASE_URL}/databases/${ID}/query`, req.body, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      }
    });

    res.json(response.data);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/notion/send', async (req, res) => {
  try {
    const response = await axios.post(`${NOTION_API_BASE_URL}/pages`, req.body, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      }
    });

    res.status(200).json({ message: 'OK' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/notion/update', async (req, res) => {
  const ID = req.body.pageId;
  
  try {
    const response = await axios.patch(`${NOTION_API_BASE_URL}/pages/${ID}`, req.body.page, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      }
    });

    res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Definiera serverporten (från miljövariabler eller standardport 3001)
const PORT = process.env.PORT || 3001;
// Starta servern och lyssna på angiven port
app.listen(PORT, () => {
  console.log('Servern är igång på http://localhost:' + PORT);
});
