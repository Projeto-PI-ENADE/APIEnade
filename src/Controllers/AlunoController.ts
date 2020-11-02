import { Request, Response } from 'express';
import AlunoModel from '../Models/Aluno'


export default {
    async Index(req: Request, res: Response) {
        const pageSize: number = 5;
        const page: number = req.query.page;

        try {
            let response = await AlunoModel.find((error: any, aluno: any) => {
                if (error) {
                    return res.status(404).send('Not Found')
                }
                else {
                    return res.status(200).json(aluno);
                }
            }).skip(pageSize * page).limit(pageSize);

        } catch (error) {
            console.log('[ERROR]: ', error)
        }

    }
}
