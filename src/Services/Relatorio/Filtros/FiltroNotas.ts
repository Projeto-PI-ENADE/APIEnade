import INode from '../INode'
import overwriteArray from '../ArrayAux';
import IndexTable from './IndexTable';
import eFiltroOpcoes from './OpcoesFiltro'
import AlunoModel from '../../../Models/DocumentAluno'


class FiltroNotas extends INode {

    constructor() {
        super();
        this.title = 'FiltroNotas'
        this.AddValue({ title: 'Por quantidade de alunos', type: eFiltroOpcoes.quantidade, checked: false })
        this.AddValue({ title: 'Por idade', type: eFiltroOpcoes.idade, checked: false })
        this.AddValue({ title: 'Por sexo', type: eFiltroOpcoes.sexo, checked: false })
        this.AddValue({ title: 'Por renda familiar', type: eFiltroOpcoes.renda, checked: false })
        this.AddValue({ title: 'Por modalidade de ensino', type: eFiltroOpcoes.modalidade, checked: false })
        this.AddValue({ title: 'Por etnia', type: eFiltroOpcoes.etnia, checked: false })
    }

    async Generate(data: Array<Array<string>>, parentProps: any) {
        const { ano, curso } = parentProps;
        let tmpData = [
            ['Notas']
            ['0-20'],
            ['20-40'],
            ['40-60'],
            ['60-80'],
            ['80-100']
        ];

        //FEÃO 
        this.values.filter((v) => { v.checked === true }).map(async (f) => {
            if (f.type === eFiltroOpcoes.idade) {

                const prom = [
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 } } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 } } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 } } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 } } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 } } },
                        { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
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

                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexIdade);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexIdade);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexIdade);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexIdade);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexIdade);
            }

            if (f.type == eFiltroOpcoes.quantidade) {

                const prom = [
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 0, "$lt": 20 } }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 20, "$lt": 40 } }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 40, "$lt": 60 } }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 60, "$lt": 80 } }),
                    AlunoModel.countDocuments({ "prova.nota_bruta": { "$gte": 80, "$lt": 101 } })]

                const val = await Promise.all(prom);

                tmpData[1] = overwriteArray<any>(tmpData[1], [val[0]], IndexTable.indexQuantidade);
                tmpData[2] = overwriteArray<any>(tmpData[2], [val[1]], IndexTable.indexQuantidade);
                tmpData[3] = overwriteArray<any>(tmpData[3], [val[2]], IndexTable.indexQuantidade);
                tmpData[4] = overwriteArray<any>(tmpData[4], [val[3]], IndexTable.indexQuantidade);
                tmpData[5] = overwriteArray<any>(tmpData[5], [val[4]], IndexTable.indexQuantidade);
            }

            if (f.type == eFiltroOpcoes.sexo) {
                const prom = [
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 } } },
                        { $group: { _id: "$sexo", count: { $sum: 1 } } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 } } },
                        { $group: { _id: "$sexo", count: { $sum: 1 } } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 } } },
                        { $group: { _id: "$sexo", count: { $sum: 1 } } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 } } },
                        { $group: { _id: "$sexo", count: { $sum: 1 } } }
                    ]),
                    AlunoModel.aggregate([
                        { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 } } },
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
                tmpData[1] = overwriteArray<any>(tmpData[1], r[0], IndexTable.indexSexo);
                tmpData[2] = overwriteArray<any>(tmpData[2], r[1], IndexTable.indexSexo);
                tmpData[3] = overwriteArray<any>(tmpData[3], r[2], IndexTable.indexSexo);
                tmpData[4] = overwriteArray<any>(tmpData[4], r[3], IndexTable.indexSexo);
                tmpData[5] = overwriteArray<any>(tmpData[5], r[4], IndexTable.indexSexo);
            }

            if (f.type == eFiltroOpcoes.renda) {
                tmpData[1] = overwriteArray<string>(tmpData[1], ["valor 1", "valor 2", "valor 3", "valor 4", "valor 5", "valor 6", "valor 7", "valor 8", "valor 9", "valor 10", "valor 11"], IndexTable.indexRenda);
                tmpData[2] = overwriteArray<string>(tmpData[2], ["valor 1", "valor 2", "valor 3", "valor 4", "valor 5", "valor 6", "valor 7", "valor 8", "valor 9", "valor 10", "valor 11"], IndexTable.indexRenda);
                tmpData[3] = overwriteArray<string>(tmpData[3], ["valor 1", "valor 2", "valor 3", "valor 4", "valor 5", "valor 6", "valor 7", "valor 8", "valor 9", "valor 10", "valor 11"], IndexTable.indexRenda);
                tmpData[4] = overwriteArray<string>(tmpData[4], ["valor 1", "valor 2", "valor 3", "valor 4", "valor 5", "valor 6", "valor 7", "valor 8", "valor 9", "valor 10", "valor 11"], IndexTable.indexRenda);
                tmpData[5] = overwriteArray<string>(tmpData[5], ["valor 1", "valor 2", "valor 3", "valor 4", "valor 5", "valor 6", "valor 7", "valor 8", "valor 9", "valor 10", "valor 11"], IndexTable.indexRenda);
            }

            if (f.type == eFiltroOpcoes.modalidade) {
                tmpData[1] = overwriteArray<string>(tmpData[1], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexModalidade);
                tmpData[2] = overwriteArray<string>(tmpData[2], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexModalidade);
                tmpData[3] = overwriteArray<string>(tmpData[3], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexModalidade);
                tmpData[4] = overwriteArray<string>(tmpData[4], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexModalidade);
                tmpData[5] = overwriteArray<string>(tmpData[5], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexModalidade);
            }

            if (f.type == eFiltroOpcoes.etnia) {
                tmpData[1] = overwriteArray<string>(tmpData[1], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexEtnia);
                tmpData[2] = overwriteArray<string>(tmpData[2], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexEtnia);
                tmpData[3] = overwriteArray<string>(tmpData[3], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexEtnia);
                tmpData[4] = overwriteArray<string>(tmpData[4], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexEtnia);
                tmpData[5] = overwriteArray<string>(tmpData[5], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6"], IndexTable.indexEtnia);
            }
        });

        for (let i = 0; i < tmpData.length; i++)
            data.push(tmpData[i])

    }

}

export {
    eFiltroOpcoes,
    FiltroNotas
}