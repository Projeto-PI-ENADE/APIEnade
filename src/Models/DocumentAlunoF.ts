import { Mongoose } from 'mongoose';
import mongoose from '../db';
const Schema = mongoose.Schema;

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

const DocumentAlunoFSchema: mongoose.Schema = new mongoose.Schema({
    sexo: { type: String },
    idade: { type: Number },
    grupo: { type: String },
    renda_fam: { type: String },
    trabalho: { type: String },
    bolsa_estudo: { type: String },
    tipo_ens_medio: { type: String },
    familiar_curso: { type: String },
    extraclasse: { type: String },
    prova: {
        type: Object,
        required: true,
        ano_prova: { type: Date },
        nota_bruta: { type: Number },
        tipo_presenca: { type: Number }
    },
    curso: {
        type: Object,
        required: true,
        area_curso: { type: Number },
        curso_estado: { type: Number },
        tipo_org_acad: { type: Number },
        modalidade_ensino: { type: Number },
    },
    feedback: {
        type: Object,
        required: true,
        dif_forma_geral: { type: String },
        dif_forma_especif: { type: String },
        ext_temp_prova: { type: String },
        clarez_prov_geral: { type: String },
        clarez_prov_espe: { type: String },
        tempo_gasto: { type: String },
    },
})



export default mongoose.model('AlunoFullPress', DocumentAlunoFSchema, 'AlunoFullPress');