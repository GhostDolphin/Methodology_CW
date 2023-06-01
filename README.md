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

![App Visuals](https://i.imgur.com/ZsxghK7.png)

As you can see there are lots of buttons all over the page. Let's discuss each one of them:

`1. Add (+) Button`: This is the first button you'll be able to use right upon loading the page. There is a text field (SYMBOL) right next to it, where you have to input whatever coin's symbol (e.g. BTC) you'd like to add. After it's done, just press the plus button and a new asset will appear on top.

`2. Remove (Trash) Button`: This button is used if you for some reason want to delete the corresponding asset from the list.

`3. Calculator Button`: This one is meant to calculate your custom assets allocation by percentages. As you can see there are text fields at every single asset and they contain the percentage for a certain asset.

`4. Smart Mode (Chipset) Button`: This button switches smart mode on and off. The mode itself helps users who don't really want to give it too much thought and just keep up with the safest option for their portfolio. It calculates the best allocation of assets, depending on the rank of a cryptocurrency. It also blocks any use of the Calculator Button and input of custom values to assets' percentages.

`5. Download Button`: This one allows you to download your portfolio in a .json file, which can then be used to restore progress on the page.

`6. Upload Button`: This button is meant for uploading your pre saved `.json` file.
