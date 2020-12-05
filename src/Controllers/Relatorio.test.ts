import { Request, Response } from 'express';
import AlunoModel from '../Models/DocumentAluno';

enum pres_cod {
    ausente = 222,
    eliminado = 334,
    ausente_dg = 444,
    presente_val = 555,
    presente_desc = 556
}
export default {

    async notasPodIdade(req: Request, res: Response) {
        const { ano, curso } = req.query;
        console.log(ano, curso)
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
        ]

        const val = await Promise.all(prom);
        console.log(val)

        let r = new Array<Array<number>>()
        const index = { 0: 0, 16: 1, 25: 2, 34: 3, 43: 4, 52: 5, 61: 6, 70: 7, 79: 8, 87: 9 }

        for (let i = 0; i < val.length; i++) {
            r[i] = new Array<number>(10).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i][index[val[i][j]._id]] = val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async notasPorQuantidade(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso })]

        const val = await Promise.all(prom);
        console.log(val)
        res.status(200).json(val)
    },

    async notasPorSexo(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "F": 0, "M": 1, "N": 2 }

        for (let i = 0; i < val.length; i++) {
            r[i] = new Array<number>(3).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i][index[val[i][j]._id]] = val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async notasPorRenda(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6 }

        for (let i = 0; i < val.length; i++) {
            r[i] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i][index[val[i][j]._id]] = val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async notasPorModalidade(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 }

        for (let i = 0; i < val.length; i++) {
            r[i] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i][index[val[i][j]._id]] = val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async notasPorEtnia(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 }

        for (let i = 0; i < val.length; i++) {
            r[i] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i][index[val[i][j]._id]] = val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async presencaPorIdade(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { 0: 0, 16: 1, 25: 2, 34: 3, 43: 4, 52: 5, 61: 6, 70: 7, 79: 8, 87: 9 }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < val.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i + 1][index[val[i][j]._id]] = val[i][j].count;
                r[0][index[val[i][j]._id]] += val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async presencaPorQuantidade(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso }),
            AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso })]

        const val = await Promise.all(prom);
        let r = [val.length + 1].fill(0)
        r[0] = val.reduce((total, num) => { return total + num; })
        r.push(val)
        res.status(200).json(r)
    },

    async presencaPorSexo(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < val.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i + 1][index[val[i][j]._id]] = val[i][j].count;
                r[0][index[val[i][j]._id]] += val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async presencaPorRenda(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < val.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i + 1][index[val[i][j]._id]] = val[i][j].count;
                r[0][index[val[i][j]._id]] += val[i][j].count;
            }
        }
        res.status(200).json(r)
    },

    async presencaPorModalidade(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < val.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i + 1][index[val[i][j]._id]] = val[i][j].count;
                r[0][index[val[i][j]._id]] += val[i][j].count;
            }
        }

        res.status(200).json(r)
    },

    async presencaPorEtnia(req: Request, res: Response) {
        const { ano, curso } = req.query;
        const prom = [
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: { "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso } },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ])
        ]

        const val = await Promise.all(prom);
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < val.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < val[i].length; j++) {
                r[i + 1][index[val[i][j]._id]] = val[i][j].count;
                r[0][index[val[i][j]._id]] += val[i][j].count;
            }
        }
        res.status(200).json(r)
    },
}