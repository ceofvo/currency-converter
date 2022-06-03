const express = require('express');

const app = express()
const port = 3000;

//configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('public'))

const server = app.listen(port, ()=>{
    console.log(`Local Server running at port ${port}`)
})

let currencyData = [];

// GET route
app.get('/retrive', (request, response)=> {
    response.send(currencyData[0]);
});

// POST route
app.post('/add', (request, response)=> {
    currencyData.push(request.body)
    response.send(currencyData[0]);
});