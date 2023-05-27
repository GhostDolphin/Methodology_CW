const axios = require('axios');

const API_KEY = 'b4b30ea9-8d57-4ebc-8b73-630b9a8b95f2';

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
s