# Methodology_CW

## CryptoCalc by GhostDolphin

>Description

This is a web application, which allows user to automatically calculate and arrange their crypto portfolio by choosing what exact assets they want to focus on.

>Instructions

Follow these steps to compile and launch project:

`1.` Install Node.js

`2.` Install npm

`3.` Clone repo to your local machine

`4.` Install dependencies:
```
$ npm i
$ npm install express
$ npm install body-parser
$ npm install axios
$ npm install ejs
```

`5.` Create account on CoinMarketCapAPI and retrieve your personal API key

`6.` Create `cmc.js` in the following directory: `/public/scripts/`

`7.` Insert following content in `cmc.js`:
```
const API_KEY = 'YOUR_API_KEY';

module.exports = API_KEY;
```

`8.` Run project:
```
$ npm test
```

>How to use app

