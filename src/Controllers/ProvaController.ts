import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import ProvaModel from '../Models/Prova'


export default {
    async Index(req: Request, res: Response) {
        const pageSize: number = 5;
        const page: number = req.query.page;

        var parametro = req.params
        try {
            let response = await ProvaModel.find(parametro,(error: any, prova: any) => {
                if (error) {
                    return res.status(404).send('Not Found')
                }
                else {
                    return res.status(200).json(prova);
                }
            }).populate('alunos').skip(pageSize * page).limit(pageSize);

        } catch (error) {
            console.log('[ERROR]: ', error)
        }

    },


    async NotasPorSexo(req:Request, res:Response)
    {
        //paginacao
        const pageSize: number = 5;
        const page: number = req.query.page;
        //Query na tabela de alunos procurando a nota
        //var {parametro} = req.params;
        var parametro = req.params
        console.log(parametro);
        try
        {
            await ProvaModel.find({_id:"5fa160e2fb962b9d670ddac0"},(error:any, provas:any) =>{
                if(error)
                {
                    console.log(error);
                }else
                {
                    console.log(provas.id_aluno);
                    return res.status(200).json(provas);
                }
            }).populate('alunos','sexo').skip(pageSize * page).limit(pageSize);
        }
        catch(err)
        {
            console.log('[ERROR]: ', err)
        }

    }



}
