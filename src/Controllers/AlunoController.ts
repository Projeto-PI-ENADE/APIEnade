import { Request, Response } from 'express';
import AlunoModel, { IAluno } from '../Models/Aluno'


interface IPage {
    page: number
}

export default {
    async Index(req: Request, res: Response) {
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;

        try {
            let response = await AlunoModel.find((error: any, aluno: any) => {
                if (error) {
                    res.status(404).send('Not Found')
                }
                else {

                    res.status(200).json(aluno);
                }
            }).skip(pageSize * page).limit(pageSize);



        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async TotalPorSexo(req: Request, res: Response) {
        const value = {
            "feminino": 244334,
            "masculino": 153594
        };
        return await res.status(200).json(value);

        try {
            const m = await AlunoModel.countDocuments({ sexo: 'M' });
            const f = await AlunoModel.countDocuments({ sexo: 'F' });
            const response = {
                "feminino": f,
                "masculino": m
            };

            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async TotalPorIdade(req: Request, res: Response) {
        const value = [165698, 145312, 0, 21670, 7464, 1400, 131, 9]
        return await res.status(200).json(value)

        try {
            let response: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

            response[0] = await AlunoModel.countDocuments({ idade: { $gte: 16, $lte: 24 } })
            response[1] = await AlunoModel.countDocuments({ idade: { $gte: 25, $lte: 33 } })
            response[2] = await AlunoModel.countDocuments({ idade: { $gte: 34, $lte: 32 } })
            response[3] = await AlunoModel.countDocuments({ idade: { $gte: 43, $lte: 51 } })
            response[4] = await AlunoModel.countDocuments({ idade: { $gte: 52, $lte: 60 } })
            response[5] = await AlunoModel.countDocuments({ idade: { $gte: 61, $lte: 69 } })
            response[6] = await AlunoModel.countDocuments({ idade: { $gte: 70, $lte: 78 } })
            response[7] = await AlunoModel.countDocuments({ idade: { $gte: 79, $lte: 87 } })


            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async PercentualModalidadeEM(req: Request, res: Response) {
        const value = [
            {
                "tip_ens_medio": "A",
                "prc": 66.42030719125067
            },
            {
                "tip_ens_medio": "B",
                "prc": 24.501668643573712
            },
            {
                "tip_ens_medio": "C",
                "prc": 0.10253111115578697
            },
            {
                "tip_ens_medio": "D",
                "prc": 4.7279909933455295
            },
            {
                "tip_ens_medio": "E",
                "prc": 3.9499607969280874
            },
            {
                "tip_ens_medio": "F",
                "prc": 0.2975412637462053
            }
        ]
        return await res.status(200).json(value)

        try {
            const tmp = await AlunoModel.distinct('tip_ens_medio')
            const total = await AlunoModel.countDocuments();
            let response = []
            for await (const i of tmp) {
                const c = await AlunoModel.countDocuments({ tip_ens_medio: i })
                response.push({ tip_ens_medio: i, prc: (100 * c) / total })
            }
            return res.status(200).json(response);
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    }


}
