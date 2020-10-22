import express = require('express');
import routes from './routes';


const app = express();



app.use(express.json());
app.use(routes);






app.listen(3232, ()=> {console.log("Servidor Online")});