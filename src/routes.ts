import { Router } from 'express';

import AlunoController from './Controllers/AlunoController';
import ProvaController from './Controllers/ProvaController';
import FeedbackController from './Controllers/FeedbackController';
import CursoController from './Controllers/CursoController'

const routes = Router();

routes.get("/provas", ProvaController.Index);
routes.get("/provas/rankingNotas", ProvaController.RankingNotas);

routes.get("/cursos", CursoController.Index);
routes.get('/alunos', AlunoController.Index);
routes.get('/feedback', FeedbackController.Index);

export default routes;