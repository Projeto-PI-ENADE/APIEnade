import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import AlunoModel from '../Models/DocumentAluno';
import Ranking from '../Services/Ranking';

interface IPage {
    page: number
}


export default {

    //SEM VINCULO COM OBJETOS
    async teste(req:Request, res:Response)
    {
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;
        try
        {
            let alunos = await AlunoModel.findOne({sexo:"M"});
            console.log(alunos);
            return res.status(200).json(alunos);
        }catch(err)
        {
            console.log(err);
        }

    },

    async TotalPorSexo(req: Request, res: Response) {
        const value = {
            "feminino": 244334,
            "masculino": 153594
        };
        return res.status(200).json(value);

        try {
            const m = await AlunoModel.countDocuments({ sexo: 'M' });
            const f = await AlunoModel.countDocuments({ sexo: 'F' });
            const response = {
                "feminino": f,
                "masculino": m
            };

            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },
    
    async RankingNotas(req:Request, res:Response)
    {

    },

    async TotalPorIdade(req: Request, res: Response) {
        const value = [165698, 145312, 0, 21670, 7464, 1400, 131, 9]
        return await res.status(200).json(value)

        try {
            let response: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

            response[0] = await AlunoModel.countDocuments({ idade: { $gte: 16, $lte: 24 } })
            response[1] = await AlunoModel.countDocuments({ idade: { $gte: 25, $lte: 33 } })
            response[2] = await AlunoModel.countDocuments({ idade: { $gte: 34, $lte: 32 } })
            response[3] = await AlunoModel.countDocuments({ idade: { $gte: 43, $lte: 51 } })
            response[4] = await AlunoModel.countDocuments({ idade: { $gte: 52, $lte: 60 } })
            response[5] = await AlunoModel.countDocuments({ idade: { $gte: 61, $lte: 69 } })
            response[6] = await AlunoModel.countDocuments({ idade: { $gte: 70, $lte: 78 } })
            response[7] = await AlunoModel.countDocuments({ idade: { $gte: 79, $lte: 87 } })


            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async PercentualModalidadeEM(req: Request, res: Response) {
        const value = [
            {
                "tip_ens_medio": "A",
                "prc": 66.42030719125067
            },
            {
                "tip_ens_medio": "B",
                "prc": 24.501668643573712
            },
            {
                "tip_ens_medio": "C",
                "prc": 0.10253111115578697
            },
            {
                "tip_ens_medio": "D",
                "prc": 4.7279909933455295
            },
            {
                "tip_ens_medio": "E",
                "prc": 3.9499607969280874
            },
            {
                "tip_ens_medio": "F",
                "prc": 0.2975412637462053
            }
        ]
        return await res.status(200).json(value)

        try {
            const tmp = await AlunoModel.distinct('tip_ens_medio')
            const total = await AlunoModel.countDocuments();
            let response = []
            for await (const i of tmp) {
                const c = await AlunoModel.countDocuments({ tip_ens_medio: i })
                response.push({ tip_ens_medio: i, prc: (100 * c) / total })
            }
            return res.status(200).json(response);
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },






    //NOTAS POR ALGUM PARAMENTRO
    async NotasPorSexo(req:Request, res:Response)
    {
        const pageSize: number = 50;
        const page: number = (req.query as unknown as IPage).page;
        let rankFem =  new Ranking("Alunos do Sexo Feminino");
        let rankMasc = new Ranking("Alunos do Sexo Masculino");
        try
        {
            var masculino = await AlunoModel.find({sexo:"M"}, {"prova.nota_bruta":1}).skip(page * pageSize).limit(pageSize);
            var feminino = await AlunoModel.find({sexo:"F"}, {"prova.nota_bruta":1}).skip(page * pageSize).limit(pageSize);

            rankMasc.CalculaRankNotas(masculino);
            rankFem.CalculaRankNotas(feminino);
        }
        catch(error)
        {
            console.log(error);
        }

        let resp = [];
        resp.push(rankMasc);
        resp.push(rankFem);
        return res.status(200).json(resp);
    },
    
    async NotasPorEtnia(req:Request, res:Response)
    {
        const pageSize: number = 50;
        const page: number = (req.query as unknown as IPage).page;

        let Ranks:Array<Ranking> = new Array<Ranking>();
        Ranks[0] = new Ranking("Grupo A");
        Ranks[1] = new Ranking("Grupo B");
        Ranks[2] = new Ranking("Grupo C");
        Ranks[3] = new Ranking("Grupo D");
        Ranks[4] = new Ranking("Grupo E");
        Ranks[5] = new Ranking("Grupo F");

        try
        {
            let A = await AlunoModel.find({grupo:'A'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let B = await AlunoModel.find({grupo:'B'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let C = await AlunoModel.find({grupo:'C'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let D = await AlunoModel.find({grupo:'D'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let E = await AlunoModel.find({grupo:'E'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let F = await AlunoModel.find({grupo:'F'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            
            Ranks[0].CalculaRankNotas(A);
            Ranks[1].CalculaRankNotas(B)
            Ranks[2].CalculaRankNotas(C)
            Ranks[3].CalculaRankNotas(D)
            Ranks[4].CalculaRankNotas(E)
            Ranks[5].CalculaRankNotas(F);

        }catch(error)
        {
            console.log(error);
        }
        return res.json(Ranks);
    },
    async NotasPorModalidade(req:Request, res:Response)
    {
        const pageSize: number = 50;
        const page: number = (req.query as unknown as IPage).page;
        
        let RankMod1 =  new Ranking("Modalidade 1");
        let RankMod2 =  new Ranking("Modalidade 2");

        try
        {
            var Mod1 = await AlunoModel.find({curso:{modalidade_ensino:1}}, {"prova.nota_bruta":1}).skip(page * pageSize).limit(pageSize);
            //var Mod2 = await AlunoModel.find({curso.modalidade_ensino:1}, {"prova.nota_bruta":1}).skip(page * pageSize).limit(pageSize);
        
            console.log(Mod1);
        }catch(error)
        {
            console.log(error);
        }

        return res.json({clero:"asesino"})
    },
    async NotasPorRenda(req:Request, res:Response)
    {

        const pageSize: number = 50;
        const page: number = (req.query as unknown as IPage).page;
        let Ranks:Array<Ranking> = new Array<Ranking>();
        Ranks[0] = new Ranking("Renda Familiar A");
        Ranks[1] = new Ranking("Renda Familiar B");
        Ranks[2] = new Ranking("Renda Familiar C");
        Ranks[3] = new Ranking("Renda Familiar D");
        Ranks[4] = new Ranking("Renda Familiar E");
        Ranks[5] = new Ranking("Renda Familiar F");
        Ranks[6] = new Ranking("Renda Familiar G");

        try
        {
            let A =  await AlunoModel.find({renda_fam:'A'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let B =  await AlunoModel.find({renda_fam:'B'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let C =  await AlunoModel.find({renda_fam:'C'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let D =  await AlunoModel.find({renda_fam:'D'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let E =  await AlunoModel.find({renda_fam:'E'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let F =  await AlunoModel.find({renda_fam:'F'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let G =  await AlunoModel.find({renda_fam:'G'},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
        
            Ranks[0].CalculaRankNotas(A);
            Ranks[1].CalculaRankNotas(B)
            Ranks[2].CalculaRankNotas(C)
            Ranks[3].CalculaRankNotas(D)
            Ranks[4].CalculaRankNotas(E)
            Ranks[5].CalculaRankNotas(F);
            Ranks[6].CalculaRankNotas(G);
        }catch(error)
        {
            console.log(error);
        }

        return res.status(200).json(Ranks);

    },
    async NotasPorBolsa(req:Request, res:Response)
    {
        const pageSize: number = 50;
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

        try
        {
            let A = await AlunoModel.find({bolsa_estudo:'A'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let B = await AlunoModel.find({bolsa_estudo:'B'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let C = await AlunoModel.find({bolsa_estudo:'C'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let D = await AlunoModel.find({bolsa_estudo:'D'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let E = await AlunoModel.find({bolsa_estudo:'E'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let F = await AlunoModel.find({bolsa_estudo:'F'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let G = await AlunoModel.find({bolsa_estudo:'G'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let H = await AlunoModel.find({bolsa_estudo:'H'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let I = await AlunoModel.find({bolsa_estudo:'I'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let J = await AlunoModel.find({bolsa_estudo:'J'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let K = await AlunoModel.find({bolsa_estudo:'K'}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);

                
        Ranks[0].CalculaRankNotas(A)
        Ranks[1].CalculaRankNotas(B)
        Ranks[2].CalculaRankNotas(C)
        Ranks[3].CalculaRankNotas(D)
        Ranks[4].CalculaRankNotas(E)
        Ranks[5].CalculaRankNotas(F)
        Ranks[6].CalculaRankNotas(G)
        Ranks[7].CalculaRankNotas(H)
        Ranks[8].CalculaRankNotas(I)
        Ranks[9].CalculaRankNotas(J)
        Ranks[10].CalculaRankNotas(K)
        }catch(error)
        {
            console.log(error);
        }

        return res.status(200).json(Ranks);

    },



}