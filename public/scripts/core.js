'use strict';

const API_KEY = require('./cmc.js');

const axios = require('axios');

const genAssetHTML = (iconUrl, symbol, marketCap) => {
  const code = `<div class="tableEffect"> <table class="assetBlock"> <tbody> <tr> <td class="cryptoIcon"> <img src="${iconUrl}" /> </td> <td class="cryptoName"> ${symbol} </td> <td class="assetSize"> <input type="text" inputmode="numeric" pattern="[0-9]*" name="assetSize" placeholder="Allocation %" /> </td> <td class="delBtn"> <div class="iconBtn"> <i class="fa-solid fa-trash"></i> </div> </td> </tr> </tbody> </table> </div>`;

  return { code: code, marketCap: marketCap };
};

axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
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
}).then(response => {
  const cryptocurrencies = response.data.data;
  cryptocurrencies.forEach(crypto => {
    const { name, symbol, id, quote } = crypto;
    const marketCap = quote.USD.market_cap;

    const imageUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;

    const toInsert = genAssetHTML(imageUrl, symbol, marketCap);

    document.getElementById('assets').innerHTML += toInsert.code;

    console.log(`Coin: ${name} (${symbol})`);
    console.log(`Market Cap: $${marketCap}`);
    console.log(`Icon URL: ${imageUrl}`);
    console.log('------------------------');
  });
}).catch(error => {
  console.error(error);
});