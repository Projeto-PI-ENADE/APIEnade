import { json, query, Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import ProvaModel from '../Models/Prova'
import AlunoModel from '../Models/Aluno';
import Aluno from '../Models/Aluno';

interface IPage {
    page: number
}


interface IRank
{
    quantidade_elementos:number;
    percentual:number;
}


class Ranking
{
    grupo:string;
    rank:Array<IRank>
    

    constructor(str:string)
    {
        this.grupo = str;
        this.rank = new Array<IRank>();
    }

    public CalculaRankNotas(list:Array<any>):void
    {
        var a = 0,b = 0,c = 0,d = 0, e = 0;
        list.forEach(element => {
            if(element.nota_bruta >= 0 && element.nota_bruta <= 20)
            {
                a++;
            }
            else if(element.nota_bruta > 20 && element.nota_bruta <= 40)
            {
                b++
            }
            else if(element.nota_bruta > 40 && element.nota_bruta <= 60)
            {
                c++;
            }
            else if(element.nota_bruta > 60 && element.nota_bruta <= 80)
            {
                d++;
            }
            else
            {
                e++;;
            }
        });

        var total = a + b + c + d + e;
        this.rank.push({quantidade_elementos:a, percentual:(100 * a)/total});
        this.rank.push({quantidade_elementos:b, percentual:(100 * b)/total});
        this.rank.push({quantidade_elementos:c, percentual:(100 * c)/total});
        this.rank.push({quantidade_elementos:d, percentual:(100 * d)/total});
        this.rank.push({quantidade_elementos:e, percentual:(100 * e)/total});
    }

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
        
        class Rank{quantidade:number; percentual:number};
        const Ranking:Array<Rank> =  new Array<Rank>();


        try
        {
            var alunos =  await AlunoModel.find(req.params,{roll:1, }).skip(pageSize * page).limit(pageSize);
            var provas = [];
            for await (const element of alunos) {
                let query = await ProvaModel.findOne({id_aluno:element});
                provas.push(query);
            }
        }catch(error)
        {
            console.log(error);
        }

        var a:number = 0,b = 0,c = 0,d = 0, e = 0;
        provas.forEach(element => {
            if(element.nota_bruta >= 0 && element.nota_bruta <= 20)
            {
                a++;
            }
            else if(element.nota_bruta > 20 && element.nota_bruta <= 40)
            {
                b++
            }
            else if(element.nota_bruta > 40 && element.nota_bruta <= 60)
            {
                c++;
            }
            else if(element.nota_bruta > 60 && element.nota_bruta <= 80)
            {
                d++;
            }
            else
            {
                e++;;
            }
        });
        
        var total = a + b + c + d + e;

        Ranking.push({quantidade:a, percentual:(100 * a) / total});
        Ranking.push({quantidade:b, percentual:(100 * b) / total});
        Ranking.push({quantidade:c, percentual:(100 * c) / total});
        Ranking.push({quantidade:d, percentual:(100 * d) / total});
        Ranking.push({quantidade:e, percentual:(100 * e) / total});

        var def = [1,10,11,4];
        return res.json(Ranking);

    },

    async NotasPorEtnia(req:Request,res:Response)
    {
        const pageSize: number = 5;
        const page: number = req.query.page;
        
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
    }
}

