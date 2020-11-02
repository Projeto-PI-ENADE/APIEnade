import { Request, Response } from 'express';
import Curso from '../Models/Curso';
import mg from 'mongodb';
import '../Services/Exportador'
import ExportarCSV from '../Services/Exportador';

//var id = new mg.ObjectID("5f91c05ca1b9bbd434e5b3ac");

export default {

    async showTeste(req: Request, res: Response) {
        return res.status(200).send("Teste!");
    },

    //dados sobre as provas     
    async showDadosProvas(req: Request, res: Response) {
        return res.status(400).send("Not implemented");
    },

    async showCursos(req: Request, res: Response)
     {
        console.log("Show Cursos");

        await Curso.find({}, (error, curso) => {

            if (error) {
                res.status(404).send('Not Found')
            }
            else {
                res.status(200).json(curso);
            }
        }).lean();
    },

    async Excel(req: Request, res: Response)
    {
        const list = [
            {
                age:1,
                test:"aaa"
            },
            {   
                create:true,
                dec:1
            }
        ]
        ExportarCSV('./src/Files/List.csv', list);
        return res.json({message:"Funcionou"});
    }

    //async alunos1
    //async alunos2
    //async alunos3

}