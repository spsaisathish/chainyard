const express = require('express');
const request = require('request');
const baseURL = 'https://blockchain.info';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/latestblock', (req, res) => {  
  request(
    { url: baseURL+ '/latestblock' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: 'Error' });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.get('/rawblock', (req, res) => {  
  request(
    { url: baseURL+ '/rawblock/'+ req.query.hash },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: 'Error' });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.get('/rawtx', (req, res) => {  
  request(
    { url: baseURL+ '/rawtx/'+ req.query.hash },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: 'Error' });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));