import { Request, Response } from 'express';
import Curso, { ICurso } from '../Models/Curso';
import Prova from '../Models/Prova';


//var id = new mg.ObjectID("5f91c05ca1b9bbd434e5b3ac");

export default {

    async showTeste(req: Request, res: Response) {
        return res.status(200).send("Teste!");
    },

    //dados sobre as provas     
    async showDadosProvas(req: Request, res: Response) {
        console.log("Show provas")
        let v = await Prova.find((error: any, prova: any) => {

            if (error) {
                res.status(404).send('Not Found')
            }
            else {
                res.status(200).json(prova);
            }
        });
    },

    async showCursos(req: Request, res: Response) {
        console.log("Show Cursos");

        try {

            let v = await Curso.find();

            // Curso.create({ area_curso: 9090 }).then((res) => { console.log(res) });
            return res.status(200).json(v);
        } catch (error) {
            return res.send(error)
        }




    }


    //async alunos1
    //async alunos2
    //async alunos3

}