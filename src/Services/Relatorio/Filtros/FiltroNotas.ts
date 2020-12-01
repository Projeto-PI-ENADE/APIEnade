import INode from '../INode'
import overwriteArray from '../ArrayAux';
import IndexTable from './IndexTable';
import eFiltroOpcoes from './OpcoesFiltro'



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
        let tmpData = [
            ['Notas']
            ['0-20'],
            ['20-40'],
            ['40-60'],
            ['60-80'],
            ['80-100']
        ];

        //FEÃO 
        this.values.filter((v) => { v.checked === true }).map((f) => {
            if (f.type === eFiltroOpcoes.idade) {
                tmpData[1] = overwriteArray<string>(tmpData[1], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6", "valor7", "valor8"], IndexTable.indexIdade);
                tmpData[2] = overwriteArray<string>(tmpData[2], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6", "valor7", "valor8"], IndexTable.indexIdade);
                tmpData[3] = overwriteArray<string>(tmpData[3], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6", "valor7", "valor8"], IndexTable.indexIdade);
                tmpData[4] = overwriteArray<string>(tmpData[4], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6", "valor7", "valor8"], IndexTable.indexIdade);
                tmpData[5] = overwriteArray<string>(tmpData[5], ["valor 1", "valor2", "valor3", "valor4", "valor5", "valor6", "valor7", "valor8"], IndexTable.indexIdade);
            }

            if (f.type == eFiltroOpcoes.quantidade) {
                tmpData[1] = overwriteArray<string>(tmpData[1], ["valor 1"], IndexTable.indexQuantidade);
                tmpData[2] = overwriteArray<string>(tmpData[2], ["valor 1"], IndexTable.indexQuantidade);
                tmpData[3] = overwriteArray<string>(tmpData[3], ["valor 1"], IndexTable.indexQuantidade);
                tmpData[4] = overwriteArray<string>(tmpData[4], ["valor 1"], IndexTable.indexQuantidade);
                tmpData[5] = overwriteArray<string>(tmpData[5], ["valor 1"], IndexTable.indexQuantidade);
            }

            if (f.type == eFiltroOpcoes.sexo) {
                tmpData[1] = overwriteArray<string>(tmpData[1], ["valor 1", "valor2"], IndexTable.indexSexo);
                tmpData[2] = overwriteArray<string>(tmpData[2], ["valor 1", "valor2"], IndexTable.indexSexo);
                tmpData[3] = overwriteArray<string>(tmpData[3], ["valor 1", "valor2"], IndexTable.indexSexo);
                tmpData[4] = overwriteArray<string>(tmpData[4], ["valor 1", "valor2"], IndexTable.indexSexo);
                tmpData[5] = overwriteArray<string>(tmpData[5], ["valor 1", "valor2"], IndexTable.indexSexo);
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