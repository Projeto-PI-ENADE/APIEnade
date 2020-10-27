import {Request, Response} from 'express';
import db from '../Database/Database';
//importar o banco de dados com os dados da mineracao

export default {

    async showAlunos(req:Request, res:Response)
    {
        db.connect();        
        return res.json({message: "Alunos que fazem o ENADE sao brabos"}); 
    },

    //dados sobre as provas     
    async showDadosProvas(req:Request, res:Response)
    {
        db.connect();
        return res.json({message:"Provas aqui"});
    }
    //async alunos1
    //async alunos2
    //async alunos3

}