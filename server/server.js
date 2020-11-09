require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.json('Hola Mundo');
});

app.post('/user', urlencodedParser, (req, res) => {
    let body = req.body;
    res.json({
        user: body
    });
});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})