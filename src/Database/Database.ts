import { MongoClient } from 'mongodb';


//importar esta classe configura uma instancia nova do banco de dados

const uri = "mongodb+srv://enade:enade123@cluster0.5f6xz.mongodb.net/dbenade?retryWrites=true&w=majority";

class Database {
    client: MongoClient;
    constructor() {
        this.client = new MongoClient(uri, { useUnifiedTopology: true });
    }
    connect() {
        try {
            this.client.connect(err => {
                const collection = this.client.db("test").collection("devices");
                this.client.close();
            });
            console.log("Conectado ao banco");
        }
        catch (error) {
            console.log("Erro ao conectar: ");
        }
    }
}

export default new Database;