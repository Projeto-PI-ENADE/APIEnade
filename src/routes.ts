import { Router } from 'express';

import AlunoController from './Controllers/AlunoController';
import ProvaController from './Controllers/ProvaController';
import FeedbackController from './Controllers/FeedbackController';
import CursoController from './Controllers/CursoController'
import ExporterController from './Controllers/ExporterController';

const routes = Router();

routes.get("/provas", ProvaController.Index);
routes.get("/provas/RankingNotas", ProvaController.RankingNotas);

routes.get("/cursos", CursoController.Index);
routes.get("/cursos/TotalPorCurso", CursoController.TotalPorCurso);
routes.get("/cursos/CursosAvaliados", CursoController.CursosAvaliados);
routes.get("/cursos/PercentualTipoInstituicao", CursoController.PercentualTipoInstituição);
routes.get("/cursos/ProporcaoPresencialEAD", CursoController.ProporcaoPresencialEAD)

routes.get('/alunos', AlunoController.Index);
routes.get("/alunos/NumeroAlunos", AlunoController.NumeroAlunos);
routes.get('/alunos/TotalPorSexo', AlunoController.TotalPorSexo);
routes.get('/alunos/TotalPorIdade', AlunoController.TotalPorIdade);
routes.get('/alunos/PercentualModalidadeEM', AlunoController.PercentualModalidadeEM);

routes.get('/feedback', FeedbackController.Index);

routes.get('/Provas/Sexo/:sexo', ProvaController.NotasPorSexo);
routes.get('/Provas/Etnia', ProvaController.NotasPorEtnia);
routes.get('/relatorio/:tipo', ExporterController.GetFile)

export default routes;