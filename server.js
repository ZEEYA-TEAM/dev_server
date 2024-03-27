//server.js
const { Client } = require("@notionhq/client");
const express = require('express'); // Express.js biblioteket för att skapa servern
const axios = require('axios'); // Axios biblioteket för att göra HTTP-anrop
const cors = require('cors'); // CORS biblioteket för att tillåta cross-origin requests
const app = express(); // Skapa en ny Express applikation
require("dotenv").config();

// Middleware
app.use(cors()); // Aktivera CORS för alla domäner
app.use(express.json()); // Parsa JSON-baserade inkommande förfrågningar

// Konstanter för Notion API
const NOTION_API_BASE_URL = 'https://api.notion.com/v1'; // Bas URL för Notion API
const NOTION_API_KEY = process.env.NOTION_API_KEY; // Din Notion API-nyckel (bör hanteras säkrare i praktiken)
////Secret Key///
const notion = new Client({
  auth: "secret_dWSxoT2WwSZwkyYfkfV4QdklJjEp0dyOJzL0ngR4iY6",
});

//////////////////////// Login//////////////////////////////
app.post("/login", async (req, res) => {
  const { notionname, password } = req.body;
  try {
    const response = await notion.databases.query({
      database_id: "b86de2e54b4c4e7789b07dc308489e4d",
    });
 
    const user = response.results.find((user) => {
      // Safely access properties with optional chaining and provide default values
      const userNotionName = user.properties.Name?.title[0]?.plain_text ?? "";
      const userPassword = user.properties.Password?.rich_text[0]?.plain_text ?? "";
      return userNotionName === notionname && userPassword === password; // Adjusted comparison logic
    });
    if (user) {
      res.json({
        message: "Success",
        user: user.properties.Name?.title[0]?.plain_text, // Safely access with optional chaining
        userid: user.properties.PrivateId?.rich_text[0]?.plain_text, // Safely access with optional chaining
      });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//////////////////////////////////////////////////////////////////////////////

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

    res.status(200).json({ message: 'OK'});
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
