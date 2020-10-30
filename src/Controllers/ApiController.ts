import {Request, Response} from 'express';
import Curso from '../Models/Curso';
import mg from 'mongodb';

//var id = new mg.ObjectID("5f91c05ca1b9bbd434e5b3ac");

export default {

    async showTeste(req:Request, res:Response)
    {       
        console.log("Consulta iniciada")
        const c = await Curso.find({tipo_org_acad:10020},(error,curso) => {  
            console.log("Fiz uma query aqui");
        });
        return res.json(c);
    },

    //dados sobre as provas     
    async showDadosProvas(req:Request, res:Response)
    {
        return res.json({message:"Provas aqui"});
    },

    async showCursos(req:Request, res:Response)
    {
        return res.json({message:"Curso x", Tipo:"Bacharelado"});
    }


    //async alunos1
    //async alunos2
    //async alunos3

}