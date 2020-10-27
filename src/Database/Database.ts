import mongo from 'mongoose';

//importar esta classe configura uma instancia nova do banco de dados
// ja conectada ao banco de dados e com as configuracoes certinhas e brabas
class Database
{
    constructor()
    {
        mongo.Promise = global.Promise;
    }

    connect()
    {
        mongo.connect("string diferente por favor pra dar certo").
        then(() => {
            console.log("Conectado ao DB");
        }).catch((error) => {
            console.log("Erro ao conectar");
        })
    }
}

export default new Database;