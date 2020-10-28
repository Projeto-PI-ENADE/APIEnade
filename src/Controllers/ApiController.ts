import {Request, Response} from 'express';
import Curso from '../Models/Curso';


export default {

    async showTeste(req:Request, res:Response)
    {       
        await Curso.findOne({},(error,curso) => {  
            if(error)
            {
                console.log("Nao funcionou");
            }else{
                return res.json(curso);
            }
        });
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