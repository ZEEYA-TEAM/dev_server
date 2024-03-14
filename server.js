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
const NOTION_API_KEY = 'secret_8ESoOICHaglvbEsc0AI4LYanbfQdVEsNdEXWdHN7pp4'; // Din Notion API-nyckel (bör hanteras säkrare i praktiken)
const NOTION_DATABASE_IDS = ['0cb39c6042c547a988326a168176d6fe', 'b86de2e54b4c4e7789b07dc308489e4d', 'fba06eb24c9241e585ab41aaae362e31'];

// Definiera en POST endpoint för att interagera med Notion API
app.post('/api/notion', async (req, res) => {
  try {
    const promises = NOTION_DATABASE_IDS.map(Id =>
      axios.post(`${NOTION_API_BASE_URL}/databases/${Id}/query`, req.body, {
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        }
      })
    );

    const responses = await Promise.all(promises); 

    const aggregatedData = responses.map(response => response.data);

    res.json(aggregatedData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Definiera en POST endpoint för att interagera med Notion API
app.post('/api/notion/send', async (req, res) => {
  try {
    axios.post(`${NOTION_API_BASE_URL}/pages`, req.body, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      }
    });

    const responses = await Promise.all(promises); 

    const aggregatedData = responses.map(response => response.data);

    res.json(aggregatedData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Definiera serverporten (från miljövariabler eller standardport 3001)
const PORT = process.env.PORT || 3001;
// Starta servern och lyssna på angiven port
app.listen(PORT, () => {
  console.log('Servern är igång på http://localhost:' + PORT);
});
