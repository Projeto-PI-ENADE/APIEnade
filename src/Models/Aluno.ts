import mongoose from 'mongoose';
const Schema =  mongoose.Schema;


class Alunos extends Schema
{
    sexo:{type:string, required:true}               //char  [not null]  //TP_SEXO
    idade:{type:number, required:true}               //int   [not null]  //NU_IDADE
    renda_fam:{type:string, required:true}           //char  [not null]  //QE_I08
    trabalho:{type:string, required:true}            //char  [not null]  //QE_I10
    tipo_ens_medio:{type:string, required:true}      //char  [not null]  //QE_I17
    bolsa_estudo:{type:string, required:true}        //char  [not null]  //QE_I11
    familiar_curso:{type:string, required:true}      //char  [not null]  //QE_I21
    extraclasse:{type:string, required:true}         //char  [not null]  //QE_I23
    razao_insti_sup:{type:string, required:true}     //char  [not null]  //QE_I26
}


export default mongoose.model('Alunos', new Alunos);