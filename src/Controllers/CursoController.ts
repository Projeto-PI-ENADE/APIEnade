import { Request, Response } from 'express';
import CursoModel from '../Models/Curso'

interface IPage {
    page: number
}

export default {
    async Index(req: Request, res: Response) {
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;

        try {
            await CursoModel.find((error: any, curso: any) => {
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

    async CursosAvaliados(req: Request, res: Response) {
        const value = [1, 2, 13, 18, 22, 26, 29, 38, 67, 81, 83, 84, 85, 86, 87, 88, 93, 94, 100, 101, 102, 103, 104, 105, 106, 803, 804];
        return await res.status(200).json(value);

        try {
            const response = await CursoModel.distinct('area_curso');
            if (response) {
                res.status(200).json(response)
            } else {
                res.status(404).send('Not Found');
            }
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async TotalPorCurso(req: Request, res: Response) {

        const value = [
            {
                "curso_id": 1,
                "count": 84976
            },
            {
                "curso_id": 2,
                "count": 114313
            },
            {
                "curso_id": 13,
                "count": 6634
            },
            {
                "curso_id": 18,
                "count": 33886
            },
            {
                "curso_id": 22,
                "count": 37936
            },
            {
                "curso_id": 26,
                "count": 5183
            },
            {
                "curso_id": 29,
                "count": 2470
            },
            {
                "curso_id": 38,
                "count": 18284
            },
            {
                "curso_id": 67,
                "count": 961
            },
            {
                "curso_id": 81,
                "count": 4528
            },
            {
                "curso_id": 83,
                "count": 1226
            },
            {
                "curso_id": 84,
                "count": 4753
            },
            {
                "curso_id": 85,
                "count": 7560
            },
            {
                "curso_id": 86,
                "count": 16503
            },
            {
                "curso_id": 87,
                "count": 3941
            },
            {
                "curso_id": 88,
                "count": 4032
            },
            {
                "curso_id": 93,
                "count": 4158
            },
            {
                "curso_id": 94,
                "count": 8232
            },
            {
                "curso_id": 100,
                "count": 3056
            },
            {
                "curso_id": 101,
                "count": 3364
            },
            {
                "curso_id": 102,
                "count": 1622
            },
            {
                "curso_id": 103,
                "count": 1872
            },
            {
                "curso_id": 104,
                "count": 2345
            },
            {
                "curso_id": 105,
                "count": 1144
            },
            {
                "curso_id": 106,
                "count": 3075
            },
            {
                "curso_id": 803,
                "count": 9036
            },
            {
                "curso_id": 804,
                "count": 12838
            }
        ];

        return await res.status(200).json(value);

        try {
            const tmp = await CursoModel.distinct('area_curso')

            if (tmp) {
                let resp = []
                for await (const i of tmp) {
                    const c = await CursoModel.countDocuments({ area_curso: i })
                    resp.push({ curso_id: i, count: c });
                }

                return res.status(200).json(resp);
            }
            else {
                return res.status(404).send('Not Found')
            }


        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async PercentualTipoInstituição(req: Request, res: Response) {
        const value = [
            {
                "tipo_org": 10019,
                "prc": 0.03518224402404455
            },
            {
                "tipo_org": 10020,
                "prc": 24.055608049697433
            },
            {
                "tipo_org": 10022,
                "prc": 27.1338031000583
            },
            {
                "tipo_org": 10026,
                "prc": 0.7428479523933978
            },
            {
                "tipo_org": 10028,
                "prc": 48.032558653826825
            }
        ]
        return res.status(200).json(value);

        try {
            const tmp = await CursoModel.distinct('tipo_org_acad')
            const total = await CursoModel.countDocuments();
            let response = []
            for await (const i of tmp) {
                const c = await CursoModel.countDocuments({ tipo_org_acad: i })
                response.push({ tipo_org: i, prc: (100 * c) / total })
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).send('Not Found')
        }
    },

    async ProporcaoPresencialEAD(req: Request, res: Response) {
        const value = {
            "presencial": 83.87019762369071,
            "ead": 16.129802376309282
        }
        return res.status(200).json(value);
        try {
            const p = await CursoModel.countDocuments({ modalidade_ensino: 1 })
            const e = await CursoModel.countDocuments({ modalidade_ensino: 2 })
            const total = p + e
            const response = { presencial: (100 * p) / total, ead: (100 * e) / total }

            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).send('Not Found')
        }
    }



}
