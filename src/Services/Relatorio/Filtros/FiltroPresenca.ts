import INode from '../INode'
import eFiltroOpcoes from './OpcoesFiltro'
import { IdadeOpcoes, QuantidadeOpcoes, SexoOpcoes, RendaOpcoes, ModalidadeOpcoes, EtniaOpcoes } from './Opcoes/OpcoesFiltroPresenca'

import overwriteArray from '../ArrayAux';
import IndexTable from './IndexTable';
import AlunoModel from '../../../Models/DocumentAlunoF'


enum pres_cod {
    ausente = 222,
    eliminado = 334,
    ausente_dg = 444,
    presente_val = 555,
    presente_desc = 556
}

class FiltroPresenca extends INode {


    async Generate(data: Array<Array<string>>, parentProps: any) {

        let tmpData = []

        tmpData.push([' '])
        tmpData.push(['Presenca'])
        tmpData.push(['Total'])
        tmpData.push(['Ausente'])
        tmpData.push(['Eliminado'])
        tmpData.push(['Ausente devido a dupla graduação'])
        tmpData.push(['Presente'])
        tmpData.push(['Resultado Desconsiderado'])

        const { ano, curso } = parentProps;

        const sel = [{ "prova.tipo_presenca": pres_cod.ausente, "prova.ano_prova": ano, "curso.area_curso": curso },
        { "prova.tipo_presenca": pres_cod.eliminado, "prova.ano_prova": ano, "curso.area_curso": curso },
        { "prova.tipo_presenca": pres_cod.ausente_dg, "prova.ano_prova": ano, "curso.area_curso": curso },
        { "prova.tipo_presenca": pres_cod.presente_val, "prova.ano_prova": ano, "curso.area_curso": curso },
        { "prova.tipo_presenca": pres_cod.presente_desc, "prova.ano_prova": ano, "curso.area_curso": curso }]
        for await (const f of this.values) {

            if (f.id === eFiltroOpcoes.idade) {
                await new IdadeOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.quantidade) {
                await new QuantidadeOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.sexo) {
                await new SexoOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.renda) {
                await new RendaOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.modalidade) {
                await new ModalidadeOpcoes(sel).Generate(tmpData);
            }

            if (f.id == eFiltroOpcoes.etnia) {
                await new EtniaOpcoes(sel).Generate(tmpData);
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