import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;



//esquece das foreign key n namoral
class Cursos extends Schema
{
    id_aluno:{type:number, required:true}            //int   [ref: > aluno.id_aluno, not null]
    area_curso:{type:number, required:true}          //int   [not null]  //CO_GRUPO
    curso_estado:{type:number, required:true}        //int   [not null]  //CO_UF_CURSO
    tipo_org_acad:{type:number, required:true}       //int   [not null]  //CO_ORGACAD
    modalidade_ensino:{type:number, required:true}   //int   [not null]  //CO_MODALIDADE
}


mongoose.model('Cursos', new Cursos);