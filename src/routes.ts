import {Router} from 'express';
import API from './Controllers/ApiController';


const routes = Router();



routes.get("/Teste",API.showTeste);
routes.get("/Cursos", API.showCursos);
routes.get("/Provas", API.showDadosProvas);
routes.get("/Excel", API.Excel);


export default routes;