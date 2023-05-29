let portfolio = [],
smartMode = false;

const searchBtn = document.querySelector('#searchBtn'),
resultDiv = document.querySelector('#assets'),
countBtn = document.querySelector('#countBtn'),
downloadBtn = document.querySelector('#downloadBtn'),
uploadBtn = document.querySelector('#uploadBtn'),
fileInput = document.querySelector('#fileInput');

const countAlloc = (arr, smart) => {
  let result = [];

  if (smart) {
    // To be done
    console.log('');
  } else {
    const noChange = arr.filter(obj => obj.changed);

    let reserve = 0;
    if (noChange.length > 0) {
      for (const obj of noChange)
        reserve += obj.percent;
    }

    const len = arr.length - noChange.length,
    part = Math.floor((100 - reserve) / len);

    result = arr;
    for (const obj of result) {
      if (!obj.changed)
        obj.percent = part;
    }

    if ((100 - reserve) % len !== 0)
      result[0].percent += (100 - reserve) - (len * part);
  }

  return result;
};

searchBtn.addEventListener('click', () => {
  const cryptoSymbolInput = document.querySelector('#cryptoSymbol');
  const cryptoSymbol = cryptoSymbolInput.value.trim().toUpperCase();

  if (cryptoSymbol) {
    fetchCryptoData(cryptoSymbol);
    cryptoSymbolInput.value = '';
  }
});

function fetchCryptoData(symbol) {
  fetch('/crypto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ symbol })
  })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        if (!portfolio.some(obj => obj.id === data.id)) {
          resultDiv.innerHTML += `
            <div id="asset${data.id}" class="tableEffect">
              <table class="assetBlock">
                <tbody>
                  <tr>
                    <td class="cryptoIcon">
                      <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${data.id}.png" />
                    </td>
                    <td class="cryptoName">
                      ${data.symbol}
                    </td>
                    <td class="assetSize">
                      <input id="alloc${data.id}" class="assetInput" type="text" inputmode="numeric" pattern="[0-9]*" name="assetSize" placeholder="Allocation %" />
                    </td>
                    <td class="delBtn">
                      <div id="del${data.id}" class="iconBtn" onclick="removeParent(event, ${data.id})">
                        <i class="fa-solid fa-trash"></i>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;

          portfolio.push(data);
          if (portfolio.length > 1)
            portfolio = countAlloc(portfolio, smartMode);
          else {
            portfolio[0].percent = 100;
            portfolio[0].changed = false;
          }

          for (const obj of portfolio) {
            const allocDiv = document.querySelector(`#alloc${obj.id}`);
            allocDiv.value = obj.percent;
          }
        }
      }
    })
    .catch(error => {
      console.error(error);
    });
}

countBtn.addEventListener('click', () => {
  if (portfolio.length > 1) {
    const allInputs = document.querySelectorAll('.assetInput');
    
    for (const input of allInputs) {
      const inputId = parseInt(input.id.replace('alloc', ''));
      const asset = portfolio.find(obj => obj.id === inputId);

      if (parseInt(input.value) !== asset.percent) {
        let allPercents = 0;
        for (const obj of portfolio)
          allPercents += obj.percent;

        allPercents = allPercents - asset.percent + parseInt(input.value);
        if (allPercents <= 100) {
          asset.changed = true;
          asset.percent = parseInt(input.value);
        }
      }
    }

    portfolio = countAlloc(portfolio, smartMode);

    for (const obj of portfolio) {
      const allocDiv = document.querySelector(`#alloc${obj.id}`);
      allocDiv.value = obj.percent;
    }
  }
});

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', e => {
  const file = e.target.files[0],
  reader = new FileReader();

  reader.onload = event => {
    portfolio = JSON.parse(event.target.result);

    resultDiv.innerHTML = '';
    for (const asset of portfolio)
      resultDiv.innerHTML += `
        <div id="asset${asset.id}" class="tableEffect">
          <table class="assetBlock">
            <tbody>
              <tr>
                <td class="cryptoIcon">
                  <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.id}.png" />
                </td>
                <td class="cryptoName">
                  ${asset.symbol}
                </td>
                <td class="assetSize">
                  <input id="alloc${asset.id}" class="assetInput" type="text" inputmode="numeric" pattern="[0-9]*" name="assetSize" placeholder="Allocation %" value="${asset.hasOwnProperty('percent') ? asset.percent : ''}" />
                </td>
                <td class="delBtn">
                  <div id="del${asset.id}" class="iconBtn" onclick="removeParent(event, ${asset.id})">
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;


  };

  reader.readAsText(file);
});

downloadBtn.addEventListener('click', () => {
  const jsonString = JSON.stringify(portfolio, null, 2),
  blob = new Blob([jsonString], { type: 'application/json' }),
  url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(a);
});

function removeParent(event, id) {
  const parent = event.target.closest(`#asset${id}`);
  if (parent) {
    parent.remove();
    portfolio = portfolio.filter(obj => obj.id !== id);
  }
}