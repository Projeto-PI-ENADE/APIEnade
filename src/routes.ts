import { Router } from 'express';

import AlunoController from './Controllers/DocumentAlunoController';
import ProvaController from './Controllers/ProvaController';
import FeedbackController from './Controllers/FeedbackController';
import CursoController from './Controllers/CursoController'
import ExporterController from './Controllers/ExporterController';
import DocumentAlunoController from './Controllers/DocumentAlunoController';

const routes = Router();

// routes.get("/provas", ProvaController.Index);
routes.get("/provas/RankingNotas", DocumentAlunoController.RankingNotas);

routes.get("/cursos", DocumentAlunoController.Index);
routes.get("/cursos/TotalPorCurso", DocumentAlunoController.TotalPorCurso);
routes.get("/cursos/CursosAvaliados", DocumentAlunoController.CursosAvaliados);
routes.get("/cursos/PercentualTipoInstituicao", DocumentAlunoController.PercentualTipoInstituição);
routes.get("/cursos/ProporcaoPresencialEAD", CursoController.ProporcaoPresencialEAD)

// routes.get('/alunos', AlunoController.Index);
routes.get("/alunos/NumeroAlunos", DocumentAlunoController.NumeroAlunos);
routes.get('/alunos/TotalPorSexo', DocumentAlunoController.TotalPorSexo);
routes.get('/alunos/TotalPorIdade', DocumentAlunoController.TotalPorIdade);
routes.get('/alunos/PercentualModalidadeEM', DocumentAlunoController.PercentualModalidadeEM);

// routes.get('/feedback', FeedbackController.Index);

routes.get('/Provas/Sexo', DocumentAlunoController.NotasPorSexo);
routes.get('/Provas/Etnia', DocumentAlunoController.NotasPorEtnia);
routes.get('/Provas/Renda', DocumentAlunoController.NotasPorRenda);
routes.get('/Provas/Bolsa', DocumentAlunoController.NotasPorBolsa);
routes.get('/Provas/Modalidade', DocumentAlunoController.NotasPorModalidade);
//routes.get('/relatorio/:tipo', ExporterController.GetFile)

//routes.get('/Teste', AlunoController.teste);


export default routes;