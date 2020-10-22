import {Request, Response} from 'express';
//importar o banco de dados com os dados da mineracao

export default {

    async show(req:Request, res:Response)
    {
           return res.json({message: "Alunos que fazem o ENADE sao brabos"}); 
    }

    //async alunos1
    //async alunos2
    //async alunos3

}