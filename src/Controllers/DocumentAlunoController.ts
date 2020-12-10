import { Request, response, Response } from 'express';
import { ObjectID } from 'mongodb';
import AlunoModel from '../Models/DocumentAluno';
import Ranking from '../Services/Ranking';
import {
    Indentificador,
    ClassificarPorAno,
    ClassificarPorTipo,
    ClassificarLocal
} from '../Services/IntendificadorCurso';
import DocumentAluno from '../Models/DocumentAluno';

interface IPage {
    page: number
}



export default {

    //#region Alunos

    async TotalPorSexo(req: Request, res: Response) {
        const ano = Number(req.query.ano);

        try {
            const m = await AlunoModel.countDocuments({ sexo: 'M', 'prova.ano_prova':ano});
            const f = await AlunoModel.countDocuments({ sexo: 'F', 'prova.ano_prova':ano});
            const response = {
                "feminino": f,
                "masculino": m
            };

            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },
    
    async TotalPorEtnia(req:Request, res:Response)
    {
        const ano = Number(req.query.ano);
        try
        {
            let A = await AlunoModel.countDocuments({grupo:'A', 'prova.ano_prova': ano});
            let B = await AlunoModel.countDocuments({grupo:'B', 'prova.ano_prova': ano});
            let C = await AlunoModel.countDocuments({grupo:'C', 'prova.ano_prova': ano});
            let D = await AlunoModel.countDocuments({grupo:'D', 'prova.ano_prova': ano});
            let E = await AlunoModel.countDocuments({grupo:'E', 'prova.ano_prova': ano});
            let F = await AlunoModel.countDocuments({grupo:'F', 'prova.ano_prova': ano});

            const result = {
                grupo_A: A,
                grupo_B: B,
                grupo_C: C,
                grupo_D: D,
                grupo_E: E,
                grupo_F: F
            }
            return res.status(200).json(result);
        }catch(error)
        {
            console.log(error)
            return res.status(404).send("erro");
        }
    },

    async RankingNotas(req:Request, res:Response)
    {
        const ano = Number(req.query.ano);
        class rnk { qnt: number; prc: number };
        let ranking: Array<rnk> = new Array<rnk>();

        const a = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 0, $lt: 20 }, 'prova.ano_prova':ano }, (error: any, notas: any) => {
            return notas
        });
        const b = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 20, $lt: 40 }, 'prova.ano_prova':ano }, (error: any, notas: any) => {
            return notas
        });
        const c = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 40, $lt: 60 }, 'prova.ano_prova':ano }, (error: any, notas: any) => {
            return notas
        });
        const d = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 60, $lt: 80 }, 'prova.ano_prova':ano }, (error: any, notas: any) => {
            return notas
        });
        const e = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 80, $lt: 100 }, 'prova.ano_prova':ano }, (error: any, notas: any) => {
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

    async TotalPorIdade(req: Request, res: Response) {
        const ano = Number(req.query.ano);

        try {
            let response: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

            response[0] = await AlunoModel.countDocuments({ idade: { $gte: 16, $lte: 24 }, 'prova.ano_prova':ano })
            response[1] = await AlunoModel.countDocuments({ idade: { $gte: 25, $lte: 33 }, 'prova.ano_prova':ano })
            response[2] = await AlunoModel.countDocuments({ idade: { $gte: 34, $lte: 42 }, 'prova.ano_prova':ano })
            response[3] = await AlunoModel.countDocuments({ idade: { $gte: 43, $lte: 51 }, 'prova.ano_prova':ano })
            response[4] = await AlunoModel.countDocuments({ idade: { $gte: 52, $lte: 60 }, 'prova.ano_prova':ano })
            response[5] = await AlunoModel.countDocuments({ idade: { $gte: 61, $lte: 69 }, 'prova.ano_prova':ano })
            response[6] = await AlunoModel.countDocuments({ idade: { $gte: 70, $lte: 78 }, 'prova.ano_prova':ano })
            response[7] = await AlunoModel.countDocuments({ idade: { $gte: 79, $lte: 87 }, 'prova.ano_prova':ano })


            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async PercentualModalidadeEM(req: Request, res: Response) {
        const ano = Number(req.query.ano);
        const curso = Number(req.query.curso);
        var tmp;
        if(isNaN(curso))
        {
            tmp = await AlunoModel.distinct('tip_ens_medio', {'prova.ano_prova':ano});
        }else
        {
            tmp = await AlunoModel.distinct('tip_ens_medio', {'curso.area_curso':curso});
        }
        const total = await AlunoModel.countDocuments({'prova.ano_prova':ano});
        let response = []

        for await (const i of tmp) {
        const c = await AlunoModel.countDocuments({ tip_ens_medio: i, 'prova.ano_prova':ano});
        response.push({ tip_ens_medio: i, prc: (100 * c) / total });
        }
        return res.status(200).json(response);
    },

    async CountNotasPorIdade(req:Request, res:Response)
    {
        const ano = Number(req.query.ano);
        let response: Array<any>  =  new Array<any>();
        try
        {
            response[0] = await AlunoModel.countDocuments({ idade: { $gte: 16, $lte: 24 }, 'prova.ano_prova':ano });
            response[1] = await AlunoModel.countDocuments({ idade: { $gte: 25, $lte: 33 }, 'prova.ano_prova':ano });
            response[2] = await AlunoModel.countDocuments({ idade: { $gte: 34, $lte: 42 }, 'prova.ano_prova':ano });
            response[3] = await AlunoModel.countDocuments({ idade: { $gte: 43, $lte: 51 }, 'prova.ano_prova':ano });
            response[4] = await AlunoModel.countDocuments({ idade: { $gte: 52, $lte: 60 }, 'prova.ano_prova':ano });
            response[5] = await AlunoModel.countDocuments({ idade: { $gte: 61, $lte: 69 }, 'prova.ano_prova':ano });
            response[6] = await AlunoModel.countDocuments({ idade: { $gte: 70, $lte: 78 }, 'prova.ano_prova':ano });
            response[7] = await AlunoModel.countDocuments({ idade: { $gte: 79, $lte: 87 }, 'prova.ano_prova':ano });
        }
        catch(error)
        {
            console.log(error);
        }
        return res.status(200).json(response);
    },

    async QuantidadeDeAlunos(req:Request, res:Response)
    {
        const ano = Number(req.query.ano);
        const curso = Number(req.query.curso);
        let response;
        try {
            if(isNaN(curso))
            {
                response = await AlunoModel.countDocuments({'prova.ano_prova':ano});
            }else
            {
                response = await AlunoModel.countDocuments({'prova.ano_prova':ano, 'curso.area_curso':curso});
            }
            console.log(response);
            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    //#endregion

    //#region Cursos
    async CursosAvaliados(req: Request, res: Response) {
        let ano:Number;
        let tipo:string;
        ano = Number(req.query.ano);
        tipo = req.query.tipo as string;
        var Indentify:Indentificador;
        if(tipo == "true")
        {
            Indentify =  new Indentificador(new ClassificarPorTipo(ano));
        }else
        {
            Indentify = new Indentificador(new ClassificarPorAno(ano));
        }

        const resposta  =  await Indentify.GetIndentificadores();
        return res.status(200).json(resposta);

    },

    async PercentualTipoInstituição(req: Request, res: Response) {
        const ano = Number(req.query.ano);

        try {
            const tmp = await AlunoModel.distinct('curso.tipo_org_acad')
            const total = await AlunoModel.countDocuments({'prova.ano_prova':ano});
            let response = []
            for await (const i of tmp) {
                const c = await AlunoModel.countDocuments({ 'curso.tipo_org_acad': i, 'prova.ano_prova':ano})
                response.push({ tipo_org: i, prc: (100 * c) / total })
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).send('Not Found')
        }
    },
        
    async ProporcaoPresencialEAD(req: Request, res: Response) {
        const ano = Number(req.query.ano);
        try {
            const p = await AlunoModel.countDocuments({'curso.modalidade_ensino': 1, 'prova.ano_prova':ano })
            const e = await AlunoModel.countDocuments({'curso.modalidade_ensino': 2, 'prova.ano_prova':ano })
            const total = p + e
            const response = { presencial: (100 * p) / total, ead: (100 * e) / total }

            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).send('Not Found')
        }
    },


    //#endregion

    //#region Notas por Parametro 
    async NotasPorSexo(req:Request, res:Response)
    {
        const pageSize: number = 100;
        const page: number = (req.query as unknown as IPage).page;


        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso); 

        let rankFem =  new Ranking("Alunos do Sexo Feminino");
        let rankMasc = new Ranking("Alunos do Sexo Masculino");
        try
        {
            if(!Number.isNaN(curso))
            {
                var masculino = await AlunoModel.find({sexo:"M", "prova.ano_prova":ano, "curso.area_curso": curso}, {"prova.nota_bruta":1})
                .skip(page * pageSize).limit(pageSize);
                var feminino = await AlunoModel.find({sexo:"F", "prova.ano_prova":ano, "curso.area_curso": curso}, {"prova.nota_bruta":1})
                .skip(page * pageSize).limit(pageSize);
                rankMasc.CalculaRankNotas(masculino);
                rankFem.CalculaRankNotas(feminino);
            }else
            {
                var masculino = await AlunoModel.find({sexo:"M", "prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(page * pageSize).limit(pageSize);
                var feminino = await AlunoModel.find({sexo:"F", "prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(page * pageSize).limit(pageSize);
                rankMasc.CalculaRankNotas(masculino);
                rankFem.CalculaRankNotas(feminino);
            }
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
        const pageSize: number = 100;
        const page: number = (req.query as unknown as IPage).page;

        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso); 

        var A,B,C,D,E,F;

        let Ranks:Array<Ranking> = new Array<Ranking>();
        Ranks[0] = new Ranking("Grupo A");
        Ranks[1] = new Ranking("Grupo B");
        Ranks[2] = new Ranking("Grupo C");
        Ranks[3] = new Ranking("Grupo D");
        Ranks[4] = new Ranking("Grupo E");
        Ranks[5] = new Ranking("Grupo F");

        try
        {
            if(Number.isNaN(curso))
            {
                A = await AlunoModel.find({grupo:'A'},{"prova.nota_bruta":1,"prova.ano_prova":ano})
                .skip(page*pageSize).limit(pageSize);
                B = await AlunoModel.find({grupo:'B'},{"prova.nota_bruta":1,"prova.ano_prova":ano})
                .skip(page*pageSize).limit(pageSize);
                C = await AlunoModel.find({grupo:'C'},{"prova.nota_bruta":1,"prova.ano_prova":ano})
                .skip(page*pageSize).limit(pageSize);
                D = await AlunoModel.find({grupo:'D'},{"prova.nota_bruta":1,"prova.ano_prova":ano})
                .skip(page*pageSize).limit(pageSize);
                E = await AlunoModel.find({grupo:'E'},{"prova.nota_bruta":1,"prova.ano_prova":ano})
                .skip(page*pageSize).limit(pageSize);
                F = await AlunoModel.find({grupo:'F'},{"prova.nota_bruta":1,"prova.ano_prova":ano})
                .skip(page*pageSize).limit(pageSize);
            }else
            {
                A = await AlunoModel.find({grupo:'A'},{"prova.nota_bruta":1,"prova.ano_prova":ano, "curso.area_curso": curso})
                .skip(page*pageSize).limit(pageSize);
                B = await AlunoModel.find({grupo:'B'},{"prova.nota_bruta":1,"prova.ano_prova":ano, "curso.area_curso": curso})
                .skip(page*pageSize).limit(pageSize);
                C = await AlunoModel.find({grupo:'C'},{"prova.nota_bruta":1,"prova.ano_prova":ano, "curso.area_curso": curso})
                .skip(page*pageSize).limit(pageSize);
                D = await AlunoModel.find({grupo:'D'},{"prova.nota_bruta":1,"prova.ano_prova":ano, "curso.area_curso": curso})
                .skip(page*pageSize).limit(pageSize);
                E = await AlunoModel.find({grupo:'E'},{"prova.nota_bruta":1,"prova.ano_prova":ano, "curso.area_curso": curso})
                .skip(page*pageSize).limit(pageSize);
                F = await AlunoModel.find({grupo:'F'},{"prova.nota_bruta":1,"prova.ano_prova":ano, "curso.area_curso": curso})
                .skip(page*pageSize).limit(pageSize);
            }
            
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
        const pageSize: number = 100;
        const page: number = (req.query as unknown as IPage).page;
        
        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso); 

        var Mod1, Mod2;

        let RankMod1 =  new Ranking("Modalidade 1");
        let RankMod2 =  new Ranking("Modalidade 2");

        try
        {
        if(Number.isNaN(curso))
        {
            Mod1 = await AlunoModel.find({"curso.modalidade_ensino":1 ,"prova.ano_prova":ano}, {"prova.nota_bruta":1})
            .skip(page * pageSize).limit(pageSize);
            Mod2 = await AlunoModel.find({"curso.modalidade_ensino":2 ,"prova.ano_prova":ano}, {"prova.nota_bruta":1})
            .skip(page * pageSize).limit(pageSize);
        }else
        {
            Mod1 = await AlunoModel.find({"curso.modalidade_ensino":1,"prova.ano_prova":ano, "curso.area_curso": curso},
            {"prova.nota_bruta":1})
            .skip(page * pageSize).limit(pageSize);
            Mod2 = await AlunoModel.find({"curso.modalidade_ensino":2,"prova.ano_prova":ano, "curso.area_curso": curso},
            {"prova.nota_bruta":1})
            .skip(page * pageSize).limit(pageSize);
        }
        RankMod1.CalculaRankNotas(Mod1);
        RankMod2.CalculaRankNotas(Mod2);

        }catch(error)
        {
            console.log(error);
        }

        return res.status(200).json({RankMod1, RankMod2});
    },

    async NotasPorRenda(req:Request, res:Response)
    {

        const pageSize: number = 100;
        const page: number = (req.query as unknown as IPage).page;

        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso);

        let A,B,C,D,E,F,G;
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
            if(Number.isNaN(curso))
            {
                A =  await AlunoModel.find({renda_fam:'A',"prova.ano_prova":ano},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                B =  await AlunoModel.find({renda_fam:'B',"prova.ano_prova":ano},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                C =  await AlunoModel.find({renda_fam:'C',"prova.ano_prova":ano},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                D =  await AlunoModel.find({renda_fam:'D',"prova.ano_prova":ano},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                E =  await AlunoModel.find({renda_fam:'E',"prova.ano_prova":ano},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                F =  await AlunoModel.find({renda_fam:'F',"prova.ano_prova":ano},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                G =  await AlunoModel.find({renda_fam:'G',"prova.ano_prova":ano},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
            }else
            {
                A =  await AlunoModel.find({renda_fam:'A',"prova.ano_prova":ano, "curso.area_curso":curso},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                B =  await AlunoModel.find({renda_fam:'B',"prova.ano_prova":ano, "curso.area_curso":curso},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                C =  await AlunoModel.find({renda_fam:'C',"prova.ano_prova":ano, "curso.area_curso":curso},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                D =  await AlunoModel.find({renda_fam:'D',"prova.ano_prova":ano, "curso.area_curso":curso},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                E =  await AlunoModel.find({renda_fam:'E',"prova.ano_prova":ano, "curso.area_curso":curso},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                F =  await AlunoModel.find({renda_fam:'F',"prova.ano_prova":ano, "curso.area_curso":curso},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
                G =  await AlunoModel.find({renda_fam:'G',"prova.ano_prova":ano, "curso.area_curso":curso},{"prova.nota_bruta":1})
                .skip(page*pageSize).limit(pageSize);
            }
        
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
        const pageSize: number = 100;
        const page: number = (req.query as unknown as IPage).page;
 
        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso);

        let Ranks:Array<Ranking> = new Array<Ranking>();

        let A,B,C,D,E,F,G,H,I,J,K;

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
            if(Number.isNaN(curso))
            {
                A = await AlunoModel.find({bolsa_estudo:'A',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                B = await AlunoModel.find({bolsa_estudo:'B',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                C = await AlunoModel.find({bolsa_estudo:'C',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                D = await AlunoModel.find({bolsa_estudo:'D',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                E = await AlunoModel.find({bolsa_estudo:'E',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                F = await AlunoModel.find({bolsa_estudo:'F',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                G = await AlunoModel.find({bolsa_estudo:'G',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                H = await AlunoModel.find({bolsa_estudo:'H',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                I = await AlunoModel.find({bolsa_estudo:'I',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                J = await AlunoModel.find({bolsa_estudo:'J',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                K = await AlunoModel.find({bolsa_estudo:'K',"prova.ano_prova":ano}, {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
            }else
            {
                A = await AlunoModel.find({bolsa_estudo:'A',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                B = await AlunoModel.find({bolsa_estudo:'B',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                C = await AlunoModel.find({bolsa_estudo:'C',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                D = await AlunoModel.find({bolsa_estudo:'D',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                E = await AlunoModel.find({bolsa_estudo:'E',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                F = await AlunoModel.find({bolsa_estudo:'F',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                G = await AlunoModel.find({bolsa_estudo:'G',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                H = await AlunoModel.find({bolsa_estudo:'H',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                I = await AlunoModel.find({bolsa_estudo:'I',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                J = await AlunoModel.find({bolsa_estudo:'J',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
                K = await AlunoModel.find({bolsa_estudo:'K',"prova.ano_prova":ano, "curso.area_curso":curso},
                {"prova.nota_bruta":1})
                .skip(pageSize * page).limit(pageSize);
            }
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

    async NotasPorIdade(req:Request, res:Response)
    {
        const pageSize: number = 100;
        const page: number = (req.query as unknown as IPage).page;

        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso);
        let Ranks:Array<Ranking> = new Array<Ranking>();
        Ranks[0] =  new Ranking("Entre 16 e 24 anos");
        Ranks[1] =  new Ranking("Entre 25 e 33 anos");
        Ranks[2] =  new Ranking("Entre 34 e 42 anos");
        Ranks[3] =  new Ranking("Entre 43 e 51 anos");
        Ranks[4] =  new Ranking("Entre 52 e 60 anos");
        Ranks[5] =  new Ranking("Entre 61 e 69 anos");
        Ranks[6] =  new Ranking("Entre 70 e 78 anos");
        Ranks[7] =  new Ranking("Entre 79 e 87 anos");

        let response: Array<any>  =  new Array<any>();
        try
        {
            if(Number.isNaN(curso))
            {
                response[0] = await AlunoModel.find({ idade: { $gte: 16, $lte: 24 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[1] = await AlunoModel.find({ idade: { $gte: 25, $lte: 33 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[2] = await AlunoModel.find({ idade: { $gte: 34, $lte: 42 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[3] = await AlunoModel.find({ idade: { $gte: 43, $lte: 51 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[4] = await AlunoModel.find({ idade: { $gte: 52, $lte: 60 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[5] = await AlunoModel.find({ idade: { $gte: 61, $lte: 69 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[6] = await AlunoModel.find({ idade: { $gte: 70, $lte: 78 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[7] = await AlunoModel.find({ idade: { $gte: 79, $lte: 87 },"prova.ano_prova":ano }, {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
            }else
            {
                response[0] = await AlunoModel.find({ idade: { $gte: 16, $lte: 24 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[1] = await AlunoModel.find({ idade: { $gte: 25, $lte: 33 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[2] = await AlunoModel.find({ idade: { $gte: 34, $lte: 42 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[3] = await AlunoModel.find({ idade: { $gte: 43, $lte: 51 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[4] = await AlunoModel.find({ idade: { $gte: 52, $lte: 60 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[5] = await AlunoModel.find({ idade: { $gte: 61, $lte: 69 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[6] = await AlunoModel.find({ idade: { $gte: 70, $lte: 78 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
                response[7] = await AlunoModel.find({ idade: { $gte: 79, $lte: 87 },"prova.ano_prova":ano, "curso.area_curso":curso },
                {'prova.nota_bruta':1})
                .skip(page * pageSize).limit(pageSize);
            }
        }
        catch(error)
        {
            console.log(error);
        }
        let iterator = 0;
        response.forEach(element => {
            Ranks[iterator].CalculaRankNotas(element);
            iterator++;
        });
        return res.status(200).json(Ranks);
    },
    //#endregion

    //#region Locais da Prova 

    async Locais(req:Request, res:Response)
    {
        var id:Indentificador;
        const ano = Number(req.query.ano);

        try
        {
            id =  new Indentificador(new ClassificarLocal(ano));
            const response = await id.GetIndentificadores();
            var pog = response[0];
            return res.status(200).send(pog);
        }catch(error)
        {
            console.log(error);
        }



    }

    //#endregion

}