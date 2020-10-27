import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

class Feedback extends Schema
{
    id_aluno:{type:number, required:true}            //int   [ref: > aluno.id_aluno, not null]
    dif_forma_geral:{type:string, required:true}     //char  [not null]  //CO_RS_I1
    dif_forma_especif:{type:string, required:true}   //char  [not null]  //CO_RS_I2
    ext_temp_prova:{type:string, required:true}      //char  [not null]  //CO_RS_I3
    clarez_prov_geral:{type:string, required:true}   //char  [not null]  //CO_RS_I4
    clarez_prov_espe:{type:string, required:true}    //char  [not null]  //CO_RS_I5
    tempo_gasto:{type:string, required:true}         //char  [not null]  //CO_RS_I9
    disc_contribu_form:{type:number, required:true}  ///int   [not null]  //QE_I27
    conteu_contr_atv:{type:number, required:true}    //int   [not null]  //QE_I28
    retorno_curso:{type:number, required:true}       //int   [not null]  //QE_I30
}

mongoose.model('Feedback', new Feedback);