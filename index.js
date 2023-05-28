const PORT = 3000;

const API_KEY = require('./public/scripts/cmc.js');

const express = require('express');
const app = express();

const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  axios
    .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start: 1,
        limit: 10,
        convert: 'USD',
        sort: 'market_cap',
        sort_dir: 'desc'
      },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY
      }
    })
    .then(response => {
      const crypto = response.data.data;
      res.render('index', { crypto });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});