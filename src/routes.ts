import { Router } from 'express';

import DocumentAlunoController from './Controllers/DocumentAlunoController';
import PresenceController from './Controllers/PresencaController';


const routes = Router();

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
routes.get("/alunos/NumeroAlunos", PresenceController.NumeroAlunos);
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
//routes.get('/relatorio/:tipo', ExporterController.GetFile)
//#endregion


export default routes;