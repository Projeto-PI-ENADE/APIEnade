import { Request, Response } from 'express';
import Exporter from '../Services/FileExporter/Exportador'



export default {
    async GetFile(req: Request, res: Response) {

        try {
            const e: Exporter = new Exporter()

            let path = '';
            switch (req.params.tipo) {
                case '1':
                    path = await e.ExportFile(null, 'xlsx')
                    break
                case '2':
                    path = await e.ExportFile(null, 'json')
                    break
                default:
                    path = await e.ExportFile(null, 'csv')

            }

            return res.sendFile(path, { root: 'Files' })
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    }
}