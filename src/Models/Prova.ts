import mongoose from 'mongoose';
const Schema = mongoose.Schema;

class Provas extends Schema
{
  id_aluno:{type:number, required: true}//foreign Key, esquece n           // int   [ref: > aluno.id_aluno, not null]
  data_prova:{type:Date, required: true}         // int   [not null]  //NU_ANO
  nota_bruta:{type:number, required:true}         // float [not null]  //NT_GER
  tipo_presenca:{type:number, required:true}      // int   [not null]  //TP_PRES
}

mongoose.model('Provas', new Provas)



