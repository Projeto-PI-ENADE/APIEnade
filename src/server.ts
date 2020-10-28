import express = require('express');
import routes from './routes';
import db from './Database/Database'
const app = express();




db.connect();
app.use(express.json());
app.use(routes);






app.listen(3232, ()=> {console.log("Servidor Online em http://localhost:3232")});