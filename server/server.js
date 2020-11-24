// const express = require('express');
const app = require('./routes/user');
const mongoose = require('mongoose');
const port = process.env.PORT; //DOESN'T WORK!!!
require('./config/config');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('DB Online');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${ process.env.PORT }`);
})