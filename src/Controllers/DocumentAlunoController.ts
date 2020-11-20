import { Request, Response } from 'express';
import AlunoModel from '../Models/DocumentAluno';

interface IPage {
    page: number
}


export default {

    async teste(req:Request, res:Response)
    {
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;

        try
        {
          var resposta = await AlunoModel.find({sexo:'M'}).skip(pageSize * page).limit(pageSize);
          //console.log(resposta);
        }catch(error)
        {
            console.log(error);
        }
        var result = [1,2,4,56];
        return res.status(200).json(resposta);

    },

    async RankingNotas(req:Request, res:Response)
    {

    },

    async NotasPorSexo(req:Request, res:Response)
    {

    },
    
    async NotasPorEtnia(req:Request, res:Response)
    {

    },
    async NotasPorModalidade(req:Request, res:Response)
    {

    },
    async NotasPorRenda(req:Request, res:Response)
    {

    },

    async NotasPorBolsa(req:Request, res:Response)
    {

    },



}