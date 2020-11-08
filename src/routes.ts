import { Router } from 'express';

import AlunoController from './Controllers/AlunoController';
import ProvaController from './Controllers/ProvaController';
import FeedbackController from './Controllers/FeedbackController';
import CursoController from './Controllers/CursoController'

const routes = Router();

routes.get("/provas", ProvaController.Index);
routes.get("/provas/NotasPorIdade", ProvaController.RankingNotas);

routes.get("/cursos", CursoController.Index);
routes.get("/cursos/TotalPorCurso", CursoController.TotalPorCurso);
routes.get("/cursos/CursosAvaliados", CursoController.CursosAvaliados);
routes.get("/cursos/PercentualTipoInstituicao", CursoController.PercentualTipoInstituição);
routes.get("/cursos/ProporcaoPresencialEAD", CursoController.ProporcaoPresencialEAD)

routes.get('/alunos', AlunoController.Index);
routes.get('/alunos/TotalPorSexo', AlunoController.TotalPorSexo);
routes.get('/alunos/TotalPorIdade', AlunoController.TotalPorIdade);
routes.get('/alunos/PercentualModalidadeEM', AlunoController.PercentualModalidadeEM);

routes.get('/feedback', FeedbackController.Index);

export default routes;