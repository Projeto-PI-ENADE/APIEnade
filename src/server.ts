
import express = require('express');
import routes from './routes';
import mongoose from './db';


const app = express();

app.use(express.json());
app.use(express.static('Files'));
app.use(routes);


app.listen(3232, () => { console.log("Servidor Online em http://localhost:3232") });