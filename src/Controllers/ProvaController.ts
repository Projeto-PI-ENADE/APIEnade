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





    async NotasPorIdade(req: Request, res: Response) {

        const result = [
            {
                "qnt": 15103,
                "prc": 3.7954102249653205
            },
            {
                "qnt": 156231,
                "prc": 39.26112261514646
            },
            {
                "qnt": 173801,
                "prc": 43.67649424016405
            },
            {
                "qnt": 51258,
                "prc": 12.881224744174826
            },
            {
                "qnt": 1535,
                "prc": 0.3857481755493456
            }
        ]

        class rnk { qnt: number; prc: number };
        let ranking: Array<rnk> = new Array<rnk>();
        const total = await ProvaModel.countDocuments()

        const a = await ProvaModel.countDocuments({ nota_bruta: { $gte: 0, $lt: 20 } }, (error: any, notas: any) => {
            return notas
        });
        const b = await ProvaModel.countDocuments({ nota_bruta: { $gte: 20, $lt: 40 } }, (error: any, notas: any) => {
            return notas
        });
        const c = await ProvaModel.countDocuments({ nota_bruta: { $gte: 40, $lt: 60 } }, (error: any, notas: any) => {
            return notas
        });
        const d = await ProvaModel.countDocuments({ nota_bruta: { $gte: 60, $lt: 80 } }, (error: any, notas: any) => {
            return notas
        });
        const e = await ProvaModel.countDocuments({ nota_bruta: { $gte: 80, $lt: 100 } }, (error: any, notas: any) => {
            return notas
        });
        ranking.push({ qnt: a, prc: (100 * a) / total });
        ranking.push({ qnt: b, prc: (100 * b) / total });
        ranking.push({ qnt: c, prc: (100 * c) / total });
        ranking.push({ qnt: d, prc: (100 * d) / total });
        ranking.push({ qnt: e, prc: (100 * e) / total });

        return res.status(200).json(ranking)
    },

    async NotasProModalidadeEnsino(req: Request, res: Response) {

    }


}
