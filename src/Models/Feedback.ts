import { mongo } from 'mongoose';
import mongoose from '../db';
const Schema = mongoose.Schema;

export interface IFeedback {
    id_aluno: number
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

const FeedbackSchema: mongoose.Schema = new mongoose.Schema({
    id_aluno: { type: Number, required: true },
    dif_forma_geral: { type: String, required: true },
    dif_forma_especif: { type: String, required: true },
    ext_temp_prova: { type: String, required: true },
    clarez_prov_geral: { type: String, required: true },
    clarez_prov_espe: { type: String, required: true },
    tempo_gasto: { type: String, required: true },
    disc_contribu_form: { type: Number, required: true },
    conteu_contr_atv: { type: Number, required: true },
    retorno_curso: { type: Number, required: true },
});

export default mongoose.model('feedbacks', FeedbackSchema);