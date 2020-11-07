import { Request, Response } from 'express';
import CursoModel from '../Models/Curso'


export default {
    async Index(req: Request, res: Response) {
        const pageSize: number = 5;
        const page: number = req.query.page;

        try {
            let response = await CursoModel.find((error: any, curso: any) => {
                if (error) {
                    return res.status(404).send('Not Found')
                }
                else {
                    return res.status(200).json(curso);
                }
            }).skip(pageSize * page).limit(pageSize);

        } catch (error) {
            console.log('[ERROR]: ', error)
        }

    },

    //passar o ano como parametro e retornar o json com os cursos
    async Ano(req:Request, res: Response)
    {
        //paginacao
        const pageSize: number = 5;
        const page: number = req.query.page;

        return res.json({message:"Espere, ainda estou fazendo ajustes"});

    }
}
