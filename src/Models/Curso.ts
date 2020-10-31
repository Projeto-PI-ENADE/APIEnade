import mongoose from '../db';

export interface ICurso extends mongoose.Document {
    id_aluno: { type: Number, required: true },            //int   [ref: > aluno.id_aluno, not null]
    area_curso: { type: Number, required: true },          //int   [not null]  //CO_GRUPO
    curso_estado: { type: Number, required: true },        //int   [not null]  //CO_UF_CURSO
    tipo_org_acad: { type: Number, required: true },       //int   [not null]  //CO_ORGACAD
    modalidade_ensino: { type: Number, required: true },
}

const CursoSchema: mongoose.Schema = new mongoose.Schema({
    id_aluno: { type: Number, required: true },            //int   [ref: > aluno.id_aluno, not null]
    area_curso: { type: Number, required: true },          //int   [not null]  //CO_GRUPO
    curso_estado: { type: Number, required: true },        //int   [not null]  //CO_UF_CURSO
    tipo_org_acad: { type: Number, required: true },
});

// Export the model and return your IUser interface
export default mongoose.model<ICurso>('Curso', CursoSchema);






// import mongoose , { mongo, Schema } from 'mongoose';



// const Cursos = new Schema({
//     id_aluno:{type:Number, required:true},            //int   [ref: > aluno.id_aluno, not null]
//     area_curso:{type:Number, required:true},          //int   [not null]  //CO_GRUPO
//     curso_estado:{type:Number, required:true},        //int   [not null]  //CO_UF_CURSO
//     tipo_org_acad:{type:Number, required:true},       //int   [not null]  //CO_ORGACAD
//     modalidade_ensino:{type:Number, required:true}, 
//   });
// //esquece das foreign key n namoral

// export default mongoose.model<>('Cursos', Cursos);