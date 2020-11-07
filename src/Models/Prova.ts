import mongoose from '../db';
const Schema = mongoose.Schema;

export interface ISchema {
  id_aluno: mongoose.Schema.Types.ObjectId, //Number o caralho
  data_prova: Date,
  nota_bruta: number,
  tipo_presenca: number
}

const ProvaSchema: mongoose.Schema = new mongoose.Schema({
  id_aluno: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'alunos' },
  data_prova: { type: Date, required: true },
  nota_bruta: { type: Number, required: true },
  tipo_presenca: { type: Number, required: true }
})

export default mongoose.model('provas', ProvaSchema)


