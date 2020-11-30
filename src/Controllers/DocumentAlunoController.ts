import { Request, response, Response } from 'express';
import { ObjectID } from 'mongodb';
import AlunoModel from '../Models/DocumentAluno';
import Ranking from '../Services/Ranking';
import Indentificador from '../Services/IntendificadorCurso';

interface IPage {
    page: number
}


/*
Por query seram passados como parametro o ano, o curso 
*/


export default {

    //#region Alunos

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
    
    async TotalPorEtnia(req:Request, res:Response)
    {
        try
        {
            let A = await AlunoModel.countDocuments({grupo:'A'});
            let B = await AlunoModel.countDocuments({grupo:'B'});
            let C = await AlunoModel.countDocuments({grupo:'C'});
            let D = await AlunoModel.countDocuments({grupo:'D'});
            let E = await AlunoModel.countDocuments({grupo:'E'});
            let F = await AlunoModel.countDocuments({grupo:'F'});

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

        const a = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 0, $lt: 20 } }, (error: any, notas: any) => {
            return notas
        });
        const b = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 20, $lt: 40 } }, (error: any, notas: any) => {
            return notas
        });
        const c = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 40, $lt: 60 } }, (error: any, notas: any) => {
            return notas
        });
        const d = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 60, $lt: 80 } }, (error: any, notas: any) => {
            return notas
        });
        const e = await AlunoModel.countDocuments({ 'prova.nota_bruta': { $gte: 80, $lt: 100 } }, (error: any, notas: any) => {
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
        const value = [165698, 145312, 0, 21670, 7464, 1400, 131, 9]
        return await res.status(200).json(value)

        try {
            let response: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

            response[0] = await AlunoModel.countDocuments({ idade: { $gte: 16, $lte: 24 } })
            response[1] = await AlunoModel.countDocuments({ idade: { $gte: 25, $lte: 33 } })
            response[2] = await AlunoModel.countDocuments({ idade: { $gte: 34, $lte: 42 } })
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

    async NumeroAlunos(req: Request, res: Response) {
        try {
            let response = await AlunoModel.countDocuments()
            return res.status(200).json(response)
        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async CountNotasPorIdade(req:Request, res:Response)
    {
        let response: Array<any>  =  new Array<any>();
        try
        {
            response[0] = await AlunoModel.countDocuments({ idade: { $gte: 16, $lte: 24 } });
            response[1] = await AlunoModel.countDocuments({ idade: { $gte: 25, $lte: 33 } });
            response[2] = await AlunoModel.countDocuments({ idade: { $gte: 34, $lte: 42 } });
            response[3] = await AlunoModel.countDocuments({ idade: { $gte: 43, $lte: 51 } });
            response[4] = await AlunoModel.countDocuments({ idade: { $gte: 52, $lte: 60 } });
            response[5] = await AlunoModel.countDocuments({ idade: { $gte: 61, $lte: 69 } });
            response[6] = await AlunoModel.countDocuments({ idade: { $gte: 70, $lte: 78 } });
            response[7] = await AlunoModel.countDocuments({ idade: { $gte: 79, $lte: 87 } });
        }
        catch(error)
        {
            console.log(error);
        }
        return res.status(200).json(response);
    },
    //#endregion

    //#region Cursos
    async CursosAvaliados(req: Request, res: Response) {
        let ano:string;
        let tipo:string;
        ano = req.query.ano as string;
        tipo = req.query.tipo as string;
        console.log(typeof(tipo));
        if(tipo == "true")
        {
            let file = await Indentificador.IndentificarPorTipo(ano);
            return res.status(200).json(file);
        }else
        {
            let file = await Indentificador.IndentificarPorID(ano);
            return res.status(200).json(file);
        }
    },

    async TotalPorCurso(req: Request, res: Response) {

        const value = [
            {
                "curso_id": 1,
                "count": 84976
            },
            {
                "curso_id": 2,
                "count": 114313
            },
            {
                "curso_id": 13,
                "count": 6634
            },
            {
                "curso_id": 18,
                "count": 33886
            },
            {
                "curso_id": 22,
                "count": 37936
            },
            {
                "curso_id": 26,
                "count": 5183
            },
            {
                "curso_id": 29,
                "count": 2470
            },
            {
                "curso_id": 38,
                "count": 18284
            },
            {
                "curso_id": 67,
                "count": 961
            },
            {
                "curso_id": 81,
                "count": 4528
            },
            {
                "curso_id": 83,
                "count": 1226
            },
            {
                "curso_id": 84,
                "count": 4753
            },
            {
                "curso_id": 85,
                "count": 7560
            },
            {
                "curso_id": 86,
                "count": 16503
            },
            {
                "curso_id": 87,
                "count": 3941
            },
            {
                "curso_id": 88,
                "count": 4032
            },
            {
                "curso_id": 93,
                "count": 4158
            },
            {
                "curso_id": 94,
                "count": 8232
            },
            {
                "curso_id": 100,
                "count": 3056
            },
            {
                "curso_id": 101,
                "count": 3364
            },
            {
                "curso_id": 102,
                "count": 1622
            },
            {
                "curso_id": 103,
                "count": 1872
            },
            {
                "curso_id": 104,
                "count": 2345
            },
            {
                "curso_id": 105,
                "count": 1144
            },
            {
                "curso_id": 106,
                "count": 3075
            },
            {
                "curso_id": 803,
                "count": 9036
            },
            {
                "curso_id": 804,
                "count": 12838
            }
        ];
        return await res.status(200).json(value);

        try {
            const tmp = await AlunoModel.distinct('curso.area_curso')

            if (tmp) {
                let resp = []
                for await (const i of tmp) {
                    const c = await AlunoModel.countDocuments({ 'curso.area_curso': i })
                    resp.push({ curso_id: i, count: c });
                }

                return res.status(200).json(resp);
            }
            else {
                return res.status(404).send('Not Found')
            }


        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },    

    async Index(req: Request, res: Response) {
        const pageSize: number = 5;
        const page: number = (req.query as unknown as IPage).page;

        try {
            await AlunoModel.find({},{curso:1},(error: any, curso: any) => {
                if (error) {
                    return res.status(404).send('Not Found')
                }
                else {
                    return res.status(200).json(curso);
                }
            }).skip(pageSize * page).limit(pageSize);

        } catch (error) {
            console.log('[ERROR]: ', error)
        }
    },

    async PercentualTipoInstituição(req: Request, res: Response) {
        const value = [
            {
                "tipo_org": 10019,
                "prc": 0.03518224402404455
            },
            {
                "tipo_org": 10020,
                "prc": 24.055608049697433
            },
            {
                "tipo_org": 10022,
                "prc": 27.1338031000583
            },
            {
                "tipo_org": 10026,
                "prc": 0.7428479523933978
            },
            {
                "tipo_org": 10028,
                "prc": 48.032558653826825
            }
        ]
        return res.status(200).json(value);

        try {
            const tmp = await AlunoModel.distinct('curso.tipo_org_acad')
            const total = await AlunoModel.countDocuments();
            let response = []
            for await (const i of tmp) {
                const c = await AlunoModel.countDocuments({ 'curso.tipo_org_acad': i })
                response.push({ tipo_org: i, prc: (100 * c) / total })
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).send('Not Found')
        }
    },
        
    async ProporcaoPresencialEAD(req: Request, res: Response) {
        const value = {
            "presencial": 83.87019762369071,
            "ead": 16.129802376309282
        }
        return res.status(200).json(value);
        try {
            const p = await AlunoModel.countDocuments({'curso.modalidade_ensino': 1 })
            const e = await AlunoModel.countDocuments({'curso.modalidade_ensino': 2 })
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
        const pageSize: number = 50;
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
        const pageSize: number = 50;
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
        const pageSize: number = 50;
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

        const pageSize: number = 50;
        const page: number = (req.query as unknown as IPage).page;

        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso);
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
            let A =  await AlunoModel.find({renda_fam:'A',"prova.ano_prova":ano},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let B =  await AlunoModel.find({renda_fam:'B',"prova.ano_prova":ano},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let C =  await AlunoModel.find({renda_fam:'C',"prova.ano_prova":ano},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let D =  await AlunoModel.find({renda_fam:'D',"prova.ano_prova":ano},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let E =  await AlunoModel.find({renda_fam:'E',"prova.ano_prova":ano},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let F =  await AlunoModel.find({renda_fam:'F',"prova.ano_prova":ano},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
            let G =  await AlunoModel.find({renda_fam:'G',"prova.ano_prova":ano},{"prova.nota_bruta":1}).skip(page*pageSize).limit(pageSize);
        
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
 
        let ano = Number(req.query.ano);
        let curso = Number(req.query.curso);
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
            let A = await AlunoModel.find({bolsa_estudo:'A',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let B = await AlunoModel.find({bolsa_estudo:'B',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let C = await AlunoModel.find({bolsa_estudo:'C',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let D = await AlunoModel.find({bolsa_estudo:'D',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let E = await AlunoModel.find({bolsa_estudo:'E',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let F = await AlunoModel.find({bolsa_estudo:'F',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let G = await AlunoModel.find({bolsa_estudo:'G',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let H = await AlunoModel.find({bolsa_estudo:'H',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let I = await AlunoModel.find({bolsa_estudo:'I',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let J = await AlunoModel.find({bolsa_estudo:'J',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);
            let K = await AlunoModel.find({bolsa_estudo:'K',"prova.ano_prova":ano}, {"prova.nota_bruta":1}).skip(pageSize * page).limit(pageSize);

                
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
        const pageSize: number = 200;
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
            response[0] = await AlunoModel.find({ idade: { $gte: 16, $lte: 24 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
            response[1] = await AlunoModel.find({ idade: { $gte: 25, $lte: 33 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
            response[2] = await AlunoModel.find({ idade: { $gte: 34, $lte: 42 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
            response[3] = await AlunoModel.find({ idade: { $gte: 43, $lte: 51 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
            response[4] = await AlunoModel.find({ idade: { $gte: 52, $lte: 60 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
            response[5] = await AlunoModel.find({ idade: { $gte: 61, $lte: 69 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
            response[6] = await AlunoModel.find({ idade: { $gte: 70, $lte: 78 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
            response[7] = await AlunoModel.find({ idade: { $gte: 79, $lte: 87 },"prova.ano_prova":ano }, {'prova.nota_bruta':1}).skip(page * pageSize).limit(pageSize);
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
    }
    //#endregion


}