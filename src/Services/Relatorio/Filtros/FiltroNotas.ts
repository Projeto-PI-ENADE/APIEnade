import INode from '../INode'
import eFiltroOpcoes from './OpcoesFiltro'
import { IdadeOpcoes, QuantidadeOpcoes, SexoOpcoes, RendaOpcoes, ModalidadeOpcoes, EtniaOpcoes } from './Opcoes/OpcoesFiltro'
import overwriteArray from '../ArrayAux';
import IndexTable from './IndexTable';
import AlunoModel from '../../../Models/DocumentAluno'

class FiltroNotas extends INode {



    async Generate(data: Array<Array<string>>, parentProps: any) {

        const { ano, curso } = parentProps;
        var tmpData = []
        tmpData.push([' ']);
        tmpData.push(['Notas']);
        tmpData.push(['Total']);
        tmpData.push(['0-20']);
        tmpData.push(['20-40']);
        tmpData.push(['40-60']);
        tmpData.push(['60-80']);
        tmpData.push(['80-100']);



        const sel = [
            { "prova.nota_bruta": { "$gte": 0, "$lt": 20 }, "prova.ano_prova": ano, "curso.area_curso": curso },
            { "prova.nota_bruta": { "$gte": 20, "$lt": 40 }, "prova.ano_prova": ano, "curso.area_curso": curso },
            { "prova.nota_bruta": { "$gte": 40, "$lt": 60 }, "prova.ano_prova": ano, "curso.area_curso": curso },
            { "prova.nota_bruta": { "$gte": 60, "$lt": 80 }, "prova.ano_prova": ano, "curso.area_curso": curso },
            { "prova.nota_bruta": { "$gte": 80, "$lt": 101 }, "prova.ano_prova": ano, "curso.area_curso": curso }
        ]

        for await (const f of this.values) {
            if (f.id === eFiltroOpcoes.idade) {
                tmpData = await new IdadeOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.quantidade) {
                tmpData = await new QuantidadeOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.sexo) {
                tmpData = await new SexoOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.renda) {
                tmpData = await new RendaOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.modalidade) {
                tmpData = await new ModalidadeOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.etnia) {
                tmpData = await new EtniaOpcoes(sel).Generate(tmpData);
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