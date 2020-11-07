import { json, Request, Response } from 'express';
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
        console.log(req.query.page)
        try
        {
            let resultado  = await ProvaModel.find({_id: new ObjectID("5fa160e2fb962b9d670ddb8c")}).populate('alunos');

            return res.status(200).json(resultado);
        }catch(err)
        {
            console.log('[ERROR]: ', err)
        }

    },







}
