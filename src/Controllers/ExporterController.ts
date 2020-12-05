import { Request, Response } from 'express';
import Exporter from '../Services/FileExporter/Exportador'
import INode from '../Services/Relatorio/INode'
import Example from '../Services/Relatorio/Filtros/Example'
const fs = require('fs')

var AdmZip = require('adm-zip');

async function makeZip(files: String[]): Promise<string> {
    var zip = new AdmZip();
    files.map(v => zip.addLocalFile('Files/' + v))
    const zip_name = 'rel_' + Date.now().toString() + '.zip'
    await zip.writeZip('Files/' + zip_name)
    return zip_name
}

export default {
    async GetFile(req: Request, res: Response) {

        try {
            const op: INode = Example;

            let path = await op.Generate(null, null);
            console.log('Files:', path)
            const zip_name = await makeZip(path)

            try {
                path.map(r => fs.unlinkSync('Files/' + r))
            } catch (e) {
                console.log(e)
            }

            return res.sendFile(zip_name, { root: 'Files' })

        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    }
}