import {Router} from 'express';
import API from './Controllers/ApiController';


const routes = Router();



routes.get("/",API.show);


export default routes;