import { Router } from 'express';
import API from './Controllers/ApiController';
import AlunoController from './Controllers/AlunoController';
import ProvaController from './Controllers/ProvaController';
import FeedbackController from './Controllers/FeedbackController';
import CursoController from './Controllers/CursoController'

const routes = Router();

routes.get("/cursos", CursoController.Index);
routes.get("/provas", ProvaController.Index);
routes.get('/alunos', AlunoController.Index);
routes.get('/feedback', FeedbackController.Index);

export default routes;