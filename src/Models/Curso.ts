import mongoose from '../db';
const Schema = mongoose.Schema;

export interface ICurso {
    id_aluno: number,
    area_curso: number,
    curso_estado: number,
    tipo_org_acad: number,
    modalidade_ensino: number,
}

const CursoSchema: mongoose.Schema = new mongoose.Schema({
    id_aluno: [{ type: Schema.Types.ObjectId, ref: 'aluno', required: true }],
    area_curso: { type: Number, required: true },
    curso_estado: { type: Number, required: true },
    tipo_org_acad: { type: Number, required: true },
    modalidade_ensino: { type: Number, required: true },
});

// Export the model and return your IUser interface
export default mongoose.model('cursos', CursoSchema);

