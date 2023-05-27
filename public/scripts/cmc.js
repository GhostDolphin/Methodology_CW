const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';

axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
  params: {
    start: 1,
    limit: 10,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': API_KEY
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
