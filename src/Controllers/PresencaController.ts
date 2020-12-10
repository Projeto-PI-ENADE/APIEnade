import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import PresencaModel from '../Models/AnalisePresenca';

interface IPage {
    page: number
}

export default {

    async Index(req:Request, res:Response)
    {   
        const pageSize: number = 50;
        const page: number = (req.query as unknown as IPage).page;

        const ano = Number(req.query.ano);

        try
        {
            const index = await PresencaModel.find({ano_prova:ano}).skip(page * pageSize).limit(pageSize);

            return res.status(200).json(index);
        }catch(error)
        {
            console.log(error);
        }
    },

    async ProporcaoPresenteAusente(req:Request, res:Response)
    {
        let Presentes:number;
        let Ausentes:number;
        let total;
        const ano = Number(req.query.ano);
        console.log(ano);
        try
        {
            Presentes = await PresencaModel.countDocuments({tipo_presenca:555, ano_prova:ano});
            Ausentes = await PresencaModel.countDocuments({tipo_presenca:222, ano_prova:ano});
            total = await PresencaModel.countDocuments({ano_prova:ano});
        }catch(error)
        {
            console.log(error);
        }finally
        {
            let pcPresente = (Presentes/total) * 100;
            let pcAusente = (Ausentes/total) * 100;
            return res.status(200).json({Total:total, 
                NumeroALunosPresentes:Presentes,
                PercentualPresente:pcPresente,
                NumeroAlunosAusentes:Ausentes,
                PercentualAusente:pcAusente});
        }


    },

}