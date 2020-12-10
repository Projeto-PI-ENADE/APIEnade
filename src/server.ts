
import express = require('express');
import routes from './routes';
import mongoose from './db';


const app = express();

app.use(express.json());
app.use(express.static('Files'));
app.use(routes);






app.listen(process.env.PORT || 3232, () => { console.log("Servidor Online") });
