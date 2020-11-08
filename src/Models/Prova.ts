import mongoose from '../db';
const Schema = mongoose.Schema;

export interface IProva {
  id_aluno: number,
  data_prova: Date,
  nota_bruta: number,
  tipo_presenca: number
}

const ProvaSchema: mongoose.Schema = new mongoose.Schema({
  id_aluno: [{ type: Schema.Types.ObjectId, ref: 'alunos', required: true }],
  data_prova: { type: Date, required: true },
  nota_bruta: { type: Number, required: true },
  tipo_presenca: { type: Number, required: true }
})

export default mongoose.model('provas', ProvaSchema)


