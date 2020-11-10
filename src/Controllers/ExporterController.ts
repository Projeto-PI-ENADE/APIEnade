import { Request, Response } from 'express';
import Exporter from '../Services/Exportador'



export default {
    async GetFile(req: Request, res: Response) {

        try {
            const e: Exporter = new Exporter()
            const path = await e.ExportFile(null, 'json')
            return res.sendFile(path, { root: 'Files' })
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    }
}