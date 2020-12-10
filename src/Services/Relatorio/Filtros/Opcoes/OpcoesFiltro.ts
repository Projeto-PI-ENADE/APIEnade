import AlunoModel from '../../../../Models/DocumentAluno'
import overwriteArray from '../../ArrayAux';
import IndexTable from '../IndexTable';

abstract class FiltroOpcoes {
    protected async abstract makeQuery(): Promise<any>;
    protected abstract prepareData(data: any): any;
    protected abstract mountData(data_out: any[], data_in: any[]): any;
    public async Generate(out: any): Promise<any> {
        const val = await this.makeQuery();
        const res = this.prepareData(val);
        return this.mountData(out, res)
    }
}



class IdadeOpcoes extends FiltroOpcoes {
    selectData: object[];

    constructor(selector: object[]) {
        super()
        this.selectData = selector
    }
    async makeQuery() {
        const prom = [
            AlunoModel.aggregate([
                { $match: this.selectData[0] },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[1] },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[2] },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[3] },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[4] },
                { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
            ])
        ]
        return await Promise.all(prom);

    }
    prepareData(data: any): any {
        let r = new Array<Array<number>>()
        const index = { 0: 0, 16: 1, 25: 2, 34: 3, 43: 4, 52: 5, 61: 6, 70: 7, 79: 8, 87: 9 }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < data.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < data[i].length; j++) {
                r[i + 1][index[data[i][j]._id]] = data[i][j].count;
                r[0][index[data[i][j]._id]] += data[i][j].count;
            }
        }

        return r;
    }
    mountData(data_out: any[], data_in: any[]) {
        data_out[1] = overwriteArray<any>(data_out[1], data_in[0], IndexTable.indexIdade);
        data_out[2] = overwriteArray<any>(data_out[2], data_in[1], IndexTable.indexIdade);
        data_out[3] = overwriteArray<any>(data_out[3], data_in[2], IndexTable.indexIdade);
        data_out[4] = overwriteArray<any>(data_out[4], data_in[3], IndexTable.indexIdade);
        data_out[5] = overwriteArray<any>(data_out[5], data_in[4], IndexTable.indexIdade);
        data_out[6] = overwriteArray<any>(data_out[6], data_in[5], IndexTable.indexIdade);

        return data_out
    }

}

class QuantidadeOpcoes extends FiltroOpcoes {
    selectData: object[];
    constructor(selector: object[]) {
        super()
        this.selectData = selector
    }
    protected async makeQuery(): Promise<any> {
        const prom = [
            AlunoModel.countDocuments(this.selectData[0]),
            AlunoModel.countDocuments(this.selectData[1]),
            AlunoModel.countDocuments(this.selectData[2]),
            AlunoModel.countDocuments(this.selectData[3]),
            AlunoModel.countDocuments(this.selectData[4])]

        return await Promise.all(prom);
    }
    protected prepareData(data: any): any {
        let r = [data.length + 1].fill(0)
        r = overwriteArray<any>(r, data, 1);
        r[0] = data.reduce((total, num) => { return total + num; })
        return r
    }
    protected mountData(data_out: any[], data_in: any[]) {
        data_out[1] = overwriteArray<any>(data_out[1], [data_in[0]], IndexTable.indexQuantidade);
        data_out[2] = overwriteArray<any>(data_out[2], [data_in[1]], IndexTable.indexQuantidade);
        data_out[3] = overwriteArray<any>(data_out[3], [data_in[2]], IndexTable.indexQuantidade);
        data_out[4] = overwriteArray<any>(data_out[4], [data_in[3]], IndexTable.indexQuantidade);
        data_out[5] = overwriteArray<any>(data_out[5], [data_in[4]], IndexTable.indexQuantidade);
        data_out[6] = overwriteArray<any>(data_out[6], [data_in[5]], IndexTable.indexQuantidade);

        return data_out
    }

}

class SexoOpcoes extends FiltroOpcoes {

    selectData: object[];
    constructor(selector: object[]) {
        super()
        this.selectData = selector
    }

    protected async makeQuery(): Promise<any> {
        const prom = [
            AlunoModel.aggregate([
                { $match: this.selectData[0] },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[1] },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[2] },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[3] },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[4] },
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ])
        ]

        return await Promise.all(prom);
    }
    protected prepareData(data: any) {
        let r = new Array<Array<number>>()
        const index = { "F": 0, "M": 1, "N": 2 }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < data.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < data[i].length; j++) {
                r[i + 1][index[data[i][j]._id]] = data[i][j].count;
                r[0][index[data[i][j]._id]] += data[i][j].count;
            }
        }
        return r
    }
    protected mountData(data_out: any[], data_in: any[]) {
        data_out[1] = overwriteArray<any>(data_out[1], data_in[0], IndexTable.indexSexo);
        data_out[2] = overwriteArray<any>(data_out[2], data_in[1], IndexTable.indexSexo);
        data_out[3] = overwriteArray<any>(data_out[3], data_in[2], IndexTable.indexSexo);
        data_out[4] = overwriteArray<any>(data_out[4], data_in[3], IndexTable.indexSexo);
        data_out[5] = overwriteArray<any>(data_out[5], data_in[4], IndexTable.indexSexo);
        data_out[6] = overwriteArray<any>(data_out[6], data_in[5], IndexTable.indexSexo);

        return data_out
    }

}

class RendaOpcoes extends FiltroOpcoes {
    selectData: object[];
    constructor(selector: object[]) {
        super()
        this.selectData = selector
    }

    protected async makeQuery(): Promise<any> {
        const prom = [
            AlunoModel.aggregate([
                { $match: this.selectData[0] },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[1] },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[2] },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[3] },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[4] },
                { $group: { _id: "$renda_fam", count: { $sum: 1 } } }
            ])
        ]

        return await Promise.all(prom);
    }
    protected prepareData(data: any) {
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < data.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < data[i].length; j++) {
                r[i + 1][index[data[i][j]._id]] = data[i][j].count;
                r[0][index[data[i][j]._id]] += data[i][j].count;
            }
        }
        return r
    }
    protected mountData(data_out: any[], data_in: any[]) {

        data_out[1] = overwriteArray<any>(data_out[1], data_in[0], IndexTable.indexRenda);
        data_out[2] = overwriteArray<any>(data_out[2], data_in[1], IndexTable.indexRenda);
        data_out[3] = overwriteArray<any>(data_out[3], data_in[2], IndexTable.indexRenda);
        data_out[4] = overwriteArray<any>(data_out[4], data_in[3], IndexTable.indexRenda);
        data_out[5] = overwriteArray<any>(data_out[5], data_in[4], IndexTable.indexRenda);
        data_out[6] = overwriteArray<any>(data_out[6], data_in[5], IndexTable.indexRenda);
        return data_out
    }

}

class ModalidadeOpcoes extends FiltroOpcoes {
    selectData: object[];
    constructor(selector: object[]) {
        super()
        this.selectData = selector
    }
    protected async makeQuery(): Promise<any> {
        const prom = [
            AlunoModel.aggregate([
                { $match: this.selectData[0] },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[1] },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[2] },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[3] },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[4] },
                { $group: { _id: "$tip_ens_medio", count: { $sum: 1 } } }
            ])
        ]

        return await Promise.all(prom);
    }
    protected prepareData(data: any) {
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < data.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < data[i].length; j++) {
                r[i + 1][index[data[i][j]._id]] = data[i][j].count;
                r[0][index[data[i][j]._id]] += data[i][j].count;
            }
        }
        return r;
    }
    protected mountData(data_out: any[], data_in: any[]) {
        data_out[1] = overwriteArray<any>(data_out[1], data_in[0], IndexTable.indexModalidade);
        data_out[2] = overwriteArray<any>(data_out[2], data_in[1], IndexTable.indexModalidade);
        data_out[3] = overwriteArray<any>(data_out[3], data_in[2], IndexTable.indexModalidade);
        data_out[4] = overwriteArray<any>(data_out[4], data_in[3], IndexTable.indexModalidade);
        data_out[5] = overwriteArray<any>(data_out[5], data_in[4], IndexTable.indexModalidade);
        data_out[6] = overwriteArray<any>(data_out[6], data_in[5], IndexTable.indexModalidade);

        return data_out
    }
}

class EtniaOpcoes extends FiltroOpcoes {
    selectData: object[];
    constructor(selector: object[]) {
        super()
        this.selectData = selector
    }
    protected async makeQuery(): Promise<any> {
        const prom = [
            AlunoModel.aggregate([
                { $match: this.selectData[0] },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[1] },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[2] },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[3] },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ]),
            AlunoModel.aggregate([
                { $match: this.selectData[4] },
                { $group: { _id: "$grupo", count: { $sum: 1 } } }
            ])
        ]

        return await Promise.all(prom);
    }
    protected prepareData(data: any) {
        let r = new Array<Array<number>>()
        const index = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, }

        r[0] = new Array<number>(Object.keys(index).length).fill(0)
        for (let i = 0; i < data.length; i++) {
            r[i + 1] = new Array<number>(Object.keys(index).length).fill(0)
            for (let j = 0; j < data[i].length; j++) {
                r[i + 1][index[data[i][j]._id]] = data[i][j].count;
                r[0][index[data[i][j]._id]] += data[i][j].count;
            }
        }
        return r
    }
    protected mountData(data_out: any[], data_in: any[]) {
        data_out[1] = overwriteArray<any>(data_out[1], data_in[0], IndexTable.indexEtnia);
        data_out[2] = overwriteArray<any>(data_out[2], data_in[1], IndexTable.indexEtnia);
        data_out[3] = overwriteArray<any>(data_out[3], data_in[2], IndexTable.indexEtnia);
        data_out[4] = overwriteArray<any>(data_out[4], data_in[3], IndexTable.indexEtnia);
        data_out[5] = overwriteArray<any>(data_out[5], data_in[4], IndexTable.indexEtnia);
        data_out[6] = overwriteArray<any>(data_out[6], data_in[5], IndexTable.indexEtnia);

        return data_out
    }

}

export {
    IdadeOpcoes,
    QuantidadeOpcoes,
    SexoOpcoes,
    RendaOpcoes,
    ModalidadeOpcoes,
    EtniaOpcoes
}