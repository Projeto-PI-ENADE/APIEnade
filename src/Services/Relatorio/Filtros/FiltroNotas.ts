import INode from '../INode'
import overwriteArray from '../ArrayAux';
import IndexTable from './IndexTable';
import eFiltroOpcoes from './OpcoesFiltro'
import AlunoModel from '../../../Models/DocumentAluno'


class FiltroNotas extends INode {

    constructor() {
        super();
        this.title = 'FiltroNotas'

    }

    async Generate(data: Array<Array<string>>, parentProps: any) {

        const { ano, curso } = parentProps;
        var tmpData = []
        tmpData.push(['Notas']);
        tmpData.push(['0-20']);
        tmpData.push(['20-40']);
        tmpData.push(['40-60']);
        tmpData.push(['60-80']);
        tmpData.push(['80-100']);

        console.log("NOTAS:")
        console.log(tmpData)

        const vals = this.values.filter((v) => { v.checked === true })

        for await (const f of this.values) {
            if (f.type === eFiltroOpcoes.idade) {

                const prom = [
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 150] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 150] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 150] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 150] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 150] } }
                    ])
                ]

                const val = await Promise.all(prom);

                let r = new Array<Array<number>>()
                const index = { 0: 0, 16: 1, 25: 2, 34: 3, 43: 4, 52: 5, 61: 6, 70: 7, 79: 8, 87: 9 }

                for (let i = 0; i < val.length; i++) {
                    r[i] = new Array<number>(10).fill(0)
                    for (let j = 0; j < val[i].length; j++) {
                        r[i][index[val[i][j]._id]] = val[i][j].count;
                    }
                }

                console.log("RESULTADO IDADE")
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexIdade);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexIdade);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexIdade);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexIdade);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexIdade);

            }

            if (f.type == eFiltroOpcoes.quantidade) {

                const prom = [
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso })]

                const val = await Promise.all(prom);


                console.log("RESULTADO QUANTIDADE")
                console.log(val)

                tmpData[1] = overwriteArray<any>(tmpData[1], [val[0]], IndexTable.indexQuantidade);
                tmpData[2] = overwriteArray<any>(tmpData[2], [val[1]], IndexTable.indexQuantidade);
                tmpData[3] = overwriteArray<any>(tmpData[3], [val[2]], IndexTable.indexQuantidade);
                tmpData[4] = overwriteArray<any>(tmpData[4], [val[3]], IndexTable.indexQuantidade);
                tmpData[5] = overwriteArray<any>(tmpData[5], [val[4]], IndexTable.indexQuantidade);
            }

            if (f.type == eFiltroOpcoes.sexo) {
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

                console.log("RESULTADO SEXO")
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexSexo);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexSexo);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexSexo);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexSexo);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexSexo);
            }

            if (f.type == eFiltroOpcoes.renda) {

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

                console.log("RESULTADO RENDA")
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexRenda);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexRenda);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexRenda);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexRenda);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexRenda);
            }

            if (f.type == eFiltroOpcoes.modalidade) {


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

                console.log("RESULTADO MODALIDADE")
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexModalidade);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexModalidade);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexModalidade);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexModalidade);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexModalidade);
            }

            if (f.type == eFiltroOpcoes.etnia) {

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

                console.log("RESULTADO ETNIA")
                console.log(r)

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexEtnia);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexEtnia);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexEtnia);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexEtnia);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexEtnia);
            }
        }

        for (let i = 0; i < tmpData.length; i++)
            data.push(tmpData[i])


    }

}

export {
    eFiltroOpcoes,
    FiltroNotas
}