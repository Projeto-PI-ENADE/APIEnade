import { Router } from 'express';
import { Request, Response } from 'express';
import DocumentAlunoController from './Controllers/DocumentAlunoController';
import PresenceController from './Controllers/PresencaController';
import AlunoModel from './Models/DocumentAluno';

const routes = Router();


async function NotasPorIdade(req: Request, res: Response) {

    const prom = [
        AlunoModel.aggregate([
            { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 } } },
            { $group: { _id: "$sexo", count: { $sum: 1 } } }
        ]),
        AlunoModel.aggregate([
            { $match: { "prova.nota_bruta": { "$gte": 20, "$lt": 40 } } },
            { $group: { _id: "$sexo", count: { $sum: 1 } } }
        ]),
        AlunoModel.aggregate([
            { $match: { "prova.nota_bruta": { "$gte": 40, "$lt": 60 } } },
            { $group: { _id: "$sexo", count: { $sum: 1 } } }
        ]),
        AlunoModel.aggregate([
            { $match: { "prova.nota_bruta": { "$gte": 60, "$lt": 80 } } },
            { $group: { _id: "$sexo", count: { $sum: 1 } } }
        ]),
        AlunoModel.aggregate([
            { $match: { "prova.nota_bruta": { "$gte": 80, "$lt": 101 } } },
            { $group: { _id: "$sexo", count: { $sum: 1 } } }
        ])
    ]

    const val = await Promise.all(prom);
    let r = new Array<Array<number>>()
    const index = { "F": 0, "M": 1, "N": 2 }

    for (let i = 0; i < val.length; i++) {
        r[i] = new Array<number>(3).fill(0)
        for (let j = 0; j < val[i].length; j++) {
            r[i][index[val[i][j]._id]] = val[i][j].count;
        }
    }
    return res.status(200).json(r);
    // const val1 = await AlunoModel.aggregate([
    //     { $match: { "prova.nota_bruta": { "$gte": 0, "$lt": 20 } } },
    //     { $bucket: { groupBy: "$idade", boundaries: [0, 16, 25, 34, 43, 52, 61, 70, 79, 87, 100] } }
    // ]);

}

//#region  /PROVAS
// routes.get("/provas", ProvaController.Index);
routes.get("/provas/RankingNotas", DocumentAlunoController.RankingNotas);
//#endregion

//#region  /CURSOS
routes.get("/cursos", DocumentAlunoController.Index);
routes.get("/cursos/TotalPorCurso", DocumentAlunoController.TotalPorCurso);
routes.get("/cursos/CursosAvaliados", DocumentAlunoController.CursosAvaliados);
routes.get("/cursos/PercentualTipoInstituicao", DocumentAlunoController.PercentualTipoInstituição);
routes.get("/cursos/ProporcaoPresencialEAD", DocumentAlunoController.ProporcaoPresencialEAD)
//#endregion

//#region  /ALUNOS
// routes.get('/alunos', AlunoController.Index);
routes.get("/alunos/NumeroAlunos", DocumentAlunoController.NumeroAlunos);
routes.get('/alunos/TotalPorSexo', DocumentAlunoController.TotalPorSexo);
routes.get('/alunos/TotalPorIdade', DocumentAlunoController.TotalPorIdade);
routes.get('/alunos/PercentualModalidadeEM', DocumentAlunoController.PercentualModalidadeEM);
routes.get('/alunos/TotalPorEtnia', DocumentAlunoController.TotalPorEtnia);
routes.get('/alunos/CountNotasPorIdade', DocumentAlunoController.CountNotasPorIdade);
// routes.get('/feedback', FeedbackController.Index);
//#endregion

//#region  /PROVAS
routes.get('/Provas/Sexo', DocumentAlunoController.NotasPorSexo);
routes.get('/Provas/Etnia', DocumentAlunoController.NotasPorEtnia);
routes.get('/Provas/Renda', DocumentAlunoController.NotasPorRenda);
routes.get('/Provas/Bolsa', DocumentAlunoController.NotasPorBolsa);
routes.get('/Provas/Modalidade', DocumentAlunoController.NotasPorModalidade);
routes.get('/Provas/Idade', DocumentAlunoController.NotasPorIdade);

//#endregion

//#region  /PRESENCA

routes.get('/Presenca/Index', PresenceController.Index);

routes.get('/Presenca/ProporcaoAusentePresente', PresenceController.ProporcaoPresenteAusente);

//#endregion

//#region RELATORIO
routes.get('/relatorio/teste', NotasPorIdade);
//#endregion


export default routes;