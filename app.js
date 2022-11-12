const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//ROUTES

const personaRoute = require('./api/routes/persona');
app.use('/', personaRoute);

const empresaRoute = require('./api/routes/empresa');
app.use('/', empresaRoute);

const usuarioRoute = require('./api/routes/usuario');
app.use('/', usuarioRoute);

module.exports = app;