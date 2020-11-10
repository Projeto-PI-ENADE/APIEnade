import { Mongoose } from 'mongoose';
import mongoose from '../db';
const Schema = mongoose.Schema;

export interface IAluno {
    sexo: string
    idade: number
    renda_fam: string
    trabalho: string
    tipo_ens_medio: string
    bolsa_estudo: string
    familiar_curso: string
    extraclasse: string
    razao_insti_sup: string
    grupo:string
}

const AlunoSchema: mongoose.Schema = new mongoose.Schema({
    sexo: { type: String, required: true },
    idade: { type: Number, required: true },
    renda_fam: { type: String, required: true },
    trabalho: { type: String, required: true },
    tipo_ens_medio: { type: String, required: true },
    bolsa_estudo: { type: String, required: true },
    familiar_curso: { type: String, required: true },
    extraclasse: { type: String, required: true },
    razao_insti_sup: { type: String, required: true },
    grupo:{type:String, required:true}
})


export default mongoose.model('alunos', AlunoSchema);