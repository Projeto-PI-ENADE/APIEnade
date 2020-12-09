import { Mongoose } from 'mongoose';
import mongoose from '../db';


//Documento geral do Aluno
export interface IProva {
    data_prova: Date,
    nota_bruta: number,
    tipo_presenca: number
}
export interface ICurso {
    area_curso: number,
    curso_estado: number,
    tipo_org_acad: number,
    modalidade_ensino: number,
}
export interface IFeedback {
    dif_forma_geral: string
    dif_forma_especif: string
    ext_temp_prova: string
    clarez_prov_geral: string
    clarez_prov_espe: string
    tempo_gasto: string
    disc_contribu_form: number
    conteu_contr_atv: number
    retorno_curso: number
}
export interface IDocumentoAluno {
    sexo: string
    idade: number
    renda_fam: string
    trabalho: string
    tipo_ens_medio: string
    bolsa_estudo: string
    familiar_curso: string
    extraclasse: string
    razao_insti_sup: string
    grupo: string
    prova: IProva
    curso: ICurso
    feedback: IFeedback
}



const DocumentAlunoSchema: mongoose.Schema = new mongoose.Schema({
    sexo: { type: String, required: true },
    idade: { type: Number, required: true },
    grupo: { type: String, required: true },
    renda_fam: { type: String, required: true },
    trabalho: { type: String, required: true },
    bolsa_estudo: { type: String, required: true },
    tipo_ens_medio: { type: String, required: true },
    familiar_curso: { type: String, required: true },
    extraclasse: { type: String, required: true },
    prova: {
        type: Object,
        required: true,
        ano_prova: { type: Date, required: true },
        nota_bruta: { type: Number, required: true },
        tipo_presenca: { type: Number, required: true }
    },
    curso: {
        type: Object,
        required: true,
        area_curso: { type: Number, required: true },
        curso_estado: { type: Number, required: true },
        tipo_org_acad: { type: Number, required: true },
        modalidade_ensino: { type: Number, required: true },
    },
    feedback: {
        type: Object,
        required: true,
        dif_forma_geral: { type: String, required: true },
        dif_forma_especif: { type: String, required: true },
        ext_temp_prova: { type: String, required: true },
        clarez_prov_geral: { type: String, required: true },
        clarez_prov_espe: { type: String, required: true },
        tempo_gasto: { type: String, required: true },
    },
})



export default mongoose.model('AlunoFull', DocumentAlunoSchema, 'AlunoFull');