import INode from '../INode'
import overwriteArray from '../ArrayAux';
import IndexTable from './IndexTable';
import eFiltroOpcoes from './OpcoesFiltro'
import AlunoModel from '../../../Models/DocumentAluno'

enum pres_cod {
    ausente = 222,
    eliminado = 334,
    ausente_dg = 444,
    presente_val = 555,
    presente_desc = 556
}

class FiltroPresenca extends INode {


    async Generate(data: Array<Array<string>>, parentProps: any) {
        console.log("FILTRO PRESENCA")
        let tmpData = [
            ['Presenca'],
            ['Total'],
            ['Ausente'],
            ['Eliminado'],
            ['Ausente devido a dupla graduação'],
            ['Presente'],
            ['Resultado Desconsiderado']
        ]
        const { ano, curso } = parentProps;

        for await (const f of this.values) {

            if (f.id === eFiltroOpcoes.idade) {

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

                console.log("PRESENCA: IDADE", ano, curso)
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexIdade);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexIdade);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexIdade);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexIdade);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexIdade);
                tmpData[6] = overwriteArray<any>(tmpData[6], r[5], IndexTable.indexIdade);
            }

            if (f.id == eFiltroOpcoes.quantidade) {

                const prom = [
                    AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso })]

                const val = await Promise.all(prom);
                let r = [val.length + 1].fill(0)
                r = overwriteArray<any>(r, val, 1);
                r[0] = val.reduce((total, num) => { return total + num; })

                console.log("PRESENCA: QUANTIDADE", ano, curso)
                console.log(r)


                tmpData[1] = overwriteArray<any>(tmpData[1], [r[0]], IndexTable.indexQuantidade);
                tmpData[2] = overwriteArray<any>(tmpData[2], [r[1]], IndexTable.indexQuantidade);
                tmpData[3] = overwriteArray<any>(tmpData[3], [r[2]], IndexTable.indexQuantidade);
                tmpData[4] = overwriteArray<any>(tmpData[4], [r[3]], IndexTable.indexQuantidade);
                tmpData[5] = overwriteArray<any>(tmpData[5], [r[4]], IndexTable.indexQuantidade);
                tmpData[6] = overwriteArray<any>(tmpData[6], [r[5]], IndexTable.indexQuantidade);
            }

            if (f.id == eFiltroOpcoes.sexo) {

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

                console.log("PRESENCA: SEXO", ano, curso)
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexSexo);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexSexo);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexSexo);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexSexo);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexSexo);
                tmpData[6] = overwriteArray<any>(tmpData[6], r[5], IndexTable.indexSexo);
            }

            if (f.id == eFiltroOpcoes.renda) {

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

                console.log("PRESENCA: RENDA", ano, curso)
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexRenda);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexRenda);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexRenda);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexRenda);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexRenda);
                tmpData[6] = overwriteArray<any>(tmpData[6], r[5], IndexTable.indexRenda);
            }

            if (f.id == eFiltroOpcoes.modalidade) {

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

                console.log("PRESENCA: MODALIDADE", ano, curso)
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexModalidade);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexModalidade);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexModalidade);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexModalidade);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexModalidade);
                tmpData[6] = overwriteArray<any>(tmpData[6], r[5], IndexTable.indexModalidade);
            }

            if (f.id == eFiltroOpcoes.etnia) {

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

                console.log("PRESENCA: ETNIA", ano, curso)
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexEtnia);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexEtnia);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexEtnia);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexEtnia);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexEtnia);
                tmpData[6] = overwriteArray<any>(tmpData[6], r[5], IndexTable.indexEtnia);
            }
        }

        for (let i = 0; i < tmpData.length; i++)
            data.push(tmpData[i])
    }

}

export {
    eFiltroOpcoes,
    FiltroPresenca
}