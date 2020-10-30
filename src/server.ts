import express = require('express');
import routes from './routes';
import {MongoClient} from 'mongodb';
const app = express();


const uri =  "mongodb+srv://enade:enade123@cluster0.5f6xz.mongodb.net/dbenade?retryWrites=true&w=majority";
const cliente = new MongoClient(uri,{ useNewUrlParser: true,useUnifiedTopology: true });

try
{
    cliente.connect(err => {
        cliente.db("test").collection("devices");
    });
    cliente.close();
    console.log("Conectou no Atlas");
}
catch(err)
{
    console.log(err);
}


app.use(express.json());
app.use(routes);






app.listen(3232, ()=> {console.log("Servidor Online em http://localhost:3232")});