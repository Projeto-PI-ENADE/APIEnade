import { Request, Response } from 'express';
import Exporter from '../Services/FileExporter/Exportador'
import INode from '../Services/Relatorio/INode'
import Example from '../Services/Relatorio/Filtros/Example'

export default {
    async GetFile(req: Request, res: Response) {

        try {
            const op: INode = Example;

            let path = String(await op.Generate(null, null));
            console.log(path)
            return res.sendFile(path, { root: 'Files' })
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    }
}