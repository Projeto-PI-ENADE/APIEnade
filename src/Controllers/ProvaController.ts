import { json, query, Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import '../Services/Ranking';
import ProvaModel from '../Models/Prova'
import AlunoModel from '../Models/Aluno';
import Aluno from '../Models/Aluno';
import Ranking from '../Services/Ranking';

interface IPage {
    page: number
}


export default {
    async Index(req: Request, res: Response) {
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;

        var parametro = req.params
        try {
            let response = await ProvaModel.find().skip(pageSize * page).limit(pageSize).exec((error: any, prova: any) => {
                if (error) {
                    return res.status(404).send('Not Found')
                }
                else {
                    return res.status(200).json(prova);
                }
            });

        } catch (error) {
            console.log('[ERROR]: ', error)
        }

    },

    async RankingNotas(req: Request, res: Response) {

        const result = [
            {
                "qnt": 15103,
                "prc": 3.7954102249653205
            },
            {
                "qnt": 156231,
                "prc": 39.26112261514646
            },
            {
                "qnt": 173801,
                "prc": 43.67649424016405
            },
            {
                "qnt": 51258,
                "prc": 12.881224744174826
            },
            {
                "qnt": 1535,
                "prc": 0.3857481755493456
            }
        ]

        return await res.status(200).json(result)

        class rnk { qnt: number; prc: number };
        let ranking: Array<rnk> = new Array<rnk>();

        const a = await ProvaModel.countDocuments({ nota_bruta: { $gte: 0, $lt: 20 } }, (error: any, notas: any) => {
            return notas
        });
        const b = await ProvaModel.countDocuments({ nota_bruta: { $gte: 20, $lt: 40 } }, (error: any, notas: any) => {
            return notas
        });
        const c = await ProvaModel.countDocuments({ nota_bruta: { $gte: 40, $lt: 60 } }, (error: any, notas: any) => {
            return notas
        });
        const d = await ProvaModel.countDocuments({ nota_bruta: { $gte: 60, $lt: 80 } }, (error: any, notas: any) => {
            return notas
        });
        const e = await ProvaModel.countDocuments({ nota_bruta: { $gte: 80, $lt: 100 } }, (error: any, notas: any) => {
            return notas
        });

        const total = a + b + c + d + e;

        ranking.push({ qnt: a, prc: (100 * a) / total });
        ranking.push({ qnt: b, prc: (100 * b) / total });
        ranking.push({ qnt: c, prc: (100 * c) / total });
        ranking.push({ qnt: d, prc: (100 * d) / total });
        ranking.push({ qnt: e, prc: (100 * e) / total });

        return res.status(200).json(ranking)
    },

    async NotasProModalidadeEnsino(req: Request, res: Response) {

    },

    async NotasPorSexo(req:Request,res:Response)
    {
        const pageSize: number = 10;
        const page: number = req.query.page;
        
        let Ranks:Array<Ranking> = new Array<Ranking>();

        Ranks[0] = new Ranking("Sexo Feminino");
        Ranks[1] = new Ranking("Sexo Masculino");
        let Alunos = []
        try
        {
            Alunos.push(   await AlunoModel.find({sexo:'M'},{roll:1, }).skip(pageSize * page).limit(pageSize));
            Alunos.push(   await AlunoModel.find({sexo:'F'},{roll:1, }).skip(pageSize * page).limit(pageSize));
            var provas = [];
            for await (const element of Alunos) {
                let query = await ProvaModel.findOne({id_aluno:element});
                provas.push(query);
            }
        }catch(error)
        {
            console.log(error);
        }

        let it = 0;
        for await (const iterator of Alunos) {
            let notas = [];
            for await(const element of iterator)
            {
                notas.push(await ProvaModel.findOne({id_aluno:element}));
            }
            Ranks[it].CalculaRankNotas(notas);
            it++;
        }
        return res.json(Ranks);

    },

    async NotasPorEtnia(req:Request,res:Response)
    {
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;
        
        let Ranks:Array<Ranking> = new Array<Ranking>();

        Ranks[0] = new Ranking("Grupo A");
        Ranks[1] = new Ranking("Grupo B");
        Ranks[2] = new Ranking("Grupo C");
        Ranks[3] = new Ranking("Grupo D");
        Ranks[4] = new Ranking("Grupo E");
        Ranks[5] = new Ranking("Grupo F");

        
        //querys dos grupos
        let Alunos = [];
        try
        {
        Alunos.push ( await AlunoModel.find({grupo:'A'}, {roll:1}).skip(pageSize * page).limit(pageSize));
        Alunos.push ( await AlunoModel.find({grupo:'B'}, {roll:1}).skip(pageSize * page).limit(pageSize));
        Alunos.push ( await AlunoModel.find({grupo:'C'}, {roll:1}).skip(pageSize * page).limit(pageSize));
        Alunos.push ( await AlunoModel.find({grupo:'D'}, {roll:1}).skip(pageSize * page).limit(pageSize));
        Alunos.push ( await AlunoModel.find({grupo:'E'}, {roll:1}).skip(pageSize * page).limit(pageSize));
        Alunos.push ( await AlunoModel.find({grupo:'F'}, {roll:1}).skip(pageSize * page).limit(pageSize));
        }catch(error)
        {
            console.log(error);
        }

        //colocando percentual das notas por grupo
        //console.log(Alunos)
        let it = 0;
        for await (const iterator of Alunos) {
            let notas = [];
            for await(const element of iterator)
            {
                notas.push(await ProvaModel.findOne({id_aluno:element}));
            }
            Ranks[it].CalculaRankNotas(notas);
            it++;
        }

        return res.status(200).json(Ranks);
    },

    async NotasPorRenda(req:Request, res:Response) {
    
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;

        let Ranks:Array<Ranking> = new Array<Ranking>();

        Ranks[0] = new Ranking("Renda Familiar A");
        Ranks[1] = new Ranking("Renda Familiar B");
        Ranks[2] = new Ranking("Renda Familiar C");
        Ranks[3] = new Ranking("Renda Familiar D");
        Ranks[4] = new Ranking("Renda Familiar E");
        Ranks[5] = new Ranking("Renda Familiar F");
        Ranks[6] = new Ranking("Renda Familiar G");

        let Alunos = []
        try
        {
            Alunos.push ( await AlunoModel.find({renda_fam:'A'}, {roll:1}).skip(pageSize * page).limit(pageSize));
            Alunos.push ( await AlunoModel.find({renda_fam:'B'}, {roll:1}).skip(pageSize * page).limit(pageSize));
            Alunos.push ( await AlunoModel.find({renda_fam:'C'}, {roll:1}).skip(pageSize * page).limit(pageSize));
            Alunos.push ( await AlunoModel.find({renda_fam:'D'}, {roll:1}).skip(pageSize * page).limit(pageSize));
            Alunos.push ( await AlunoModel.find({renda_fam:'E'}, {roll:1}).skip(pageSize * page).limit(pageSize));
            Alunos.push ( await AlunoModel.find({renda_fam:'F'}, {roll:1}).skip(pageSize * page).limit(pageSize));
            Alunos.push ( await AlunoModel.find({renda_fam:'G'}, {roll:1}).skip(pageSize * page).limit(pageSize));
        }catch(error)
        {
            console.log(error);
        }

        let it = 0;
        for await (const iterator of Alunos) {
            let notas = [];
            for await(const element of iterator)
            {
                notas.push(await ProvaModel.findOne({id_aluno:element}));
            }
            Ranks[it].CalculaRankNotas(notas);
            it++;
        }
        res.status(200).json(Ranks);

    },

    async NotasPorBolsa(req:Request, res:Response) {
            
       // let response = await AlunoModel.findOne();
       const pageSize: number = 5;
       const page: number = (req.query as unknown as IPage).page;

       let Ranks:Array<Ranking> = new Array<Ranking>();

       Ranks[0] = new Ranking("Bolsa de Estudos do tipo A");
       Ranks[1] = new Ranking("Bolsa de Estudos do tipo B");
       Ranks[2] = new Ranking("Bolsa de Estudos do tipo C");
       Ranks[3] = new Ranking("Bolsa de Estudos do tipo D");
       Ranks[4] = new Ranking("Bolsa de Estudos do tipo E");
       Ranks[5] = new Ranking("Bolsa de Estudos do tipo F");
       Ranks[6] = new Ranking("Bolsa de Estudos do tipo G");
       Ranks[7] = new Ranking("Bolsa de Estudos do tipo H");
       Ranks[8] = new Ranking("Bolsa de Estudos do tipo I");
       Ranks[9] = new Ranking("Bolsa de Estudos do tipo J");
       Ranks[10] = new Ranking("Bolsa de Estudos do tipo K");

       let Alunos = []
       try
       {
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'A'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'B'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'C'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'D'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'E'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'F'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'G'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'H'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'I'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'J'}, {roll:1}).skip(pageSize * page).limit(pageSize));
           Alunos.push ( await AlunoModel.find({bolsa_estudo:'K'}, {roll:1}).skip(pageSize * page).limit(pageSize));
       }catch(error)
       {
           console.log(error);
       }
       let it = 0;
       for await (const iterator of Alunos) {
           let notas = [];
           for await(const element of iterator)
           {
               notas.push(await ProvaModel.findOne({id_aluno:element}));
           }
           Ranks[it].CalculaRankNotas(notas);
           it++;
       }
        return res.status(200).json(Ranks);
    },

    async NotasPorModalidade(req:Request,res:Response)
    {
        let response = await AlunoModel.findOne();

        return res.status(200).json(response);
    }

}

