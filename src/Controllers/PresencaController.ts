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

        try
        {
            const index = await PresencaModel.find({}).skip(page * pageSize).limit(pageSize);

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
        try
        {
            Presentes = await PresencaModel.countDocuments({tipo_presenca:555});
            Ausentes = await PresencaModel.countDocuments({tipo_presenca:222});
            total = Presentes + Ausentes;
        }catch(error)
        {
            console.log(error);
        }finally
        {
            let pcPresente = (Presentes/total) * 100;
            let pcAusente = (Ausentes/total) * 100;
            return res.status(200).json({Total:total, PercentualPresente:pcPresente, PercentualAusente:pcAusente});
        }


    }


}