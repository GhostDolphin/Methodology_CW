const PORT = 3000;

const API_KEY = require('./public/scripts/cmc.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/crypto', (req, res) => {
  const { symbol } = req.body;

  axios
    .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
      params: {
        symbol: symbol
      },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY
      }
    })
    .then(response => {
      const cryptocurrency = response.data.data[0];

      if (cryptocurrency) {
        const { id, symbol, rank } = cryptocurrency;

        res.json({ id, symbol, rank });
      } else {
        res.json({ error: 'Cryptocurrency not found.' });
      }
    })
    .catch(error => {
      console.error(error);
      res.json({ error: 'Error occurred.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});