const key = '8CY8MF780mqGPh3Y6gwnG3pWVqPzrpxI';
const url = 'https://api.apilayer.com/exchangerates_data/convert?'

const submit = document.querySelector('#submit');
const fromCur = document.querySelector('#from-cur');
const amount = document.querySelector('#amount');
const toCur = document.querySelector('#to-cur');

const showResult = async () => {
  const request = await fetch('/retrive');
  try{
    const allData = await request.json();
    const getDiv = document.querySelector('.result');
    getDiv.innerHTML = `
    <h1> The Requested Conversion </h4>
    <h4> The result of converting ${allData.amount} from ${allData.from} to ${allData.to} is ${allData.result}</h4>
    `
  }catch(error){
    console.log("error", error);
  }
}

const processForm = (evt)=>{
  evt.preventDefault();
  getCurrency(url, key)
  .then((data)=>{
    return toServer('/add', {date:data.date, to: data.query.to, from:data.query.from, amount:data.query.amount, result:data.result} );
  })
  .then(()=>{showResult()})
}

const getCurrency = async (theUrl, theKey) => {
  let requestOptions = {
    method: 'GET',
    headers: {
      'apikey': theKey
    }
  };
  const response = await fetch(`${theUrl}to=${toCur.value}&from=${fromCur.value}&amount=${amount.value}`, requestOptions);
  try{
    const data = await response.json();
    return data;  
  } catch(error){
    console.log("Error", error);
  }
}

const toServer = async (serverUrl, currData)=>{
  const response = await fetch(serverUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(currData)
  });
  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

submit.addEventListener('click', processForm)
