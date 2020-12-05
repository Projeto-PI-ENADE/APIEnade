
import INode from '../INode'
import CSVExporter from '../../../Services/FileExporter/CSVExporter'
import XLSXExporter from '../../../Services/FileExporter/XLSXExporter'
import JSONExporter from '../../../Services/FileExporter/JSONExporter'

enum eFiltroArquivoValues {
    CSV = 1,
    XLSX = 2,
    JSON = 3
}

class FiltroArquivo extends INode {
    constructor() {
        super()
        this.title = 'FiltroArquivo'
    }

    async Generate(data: Array<Array<any>>, parentProps: any): Promise<any> {

        data = [[]]
        let files: Array<String> = new Array<String>();

        for await (const c of this.child) {
            await c.Generate(data, null);
        }

        for await (const f of this.values) {
            if (f.type == eFiltroArquivoValues.CSV) {
                const r = await new CSVExporter(data).ExportFile()
                files.push(r);
            }
            if (f.type == eFiltroArquivoValues.XLSX) {
                const r = await new XLSXExporter(data).ExportFile()
                files.push(r)
            }
        }

        return files;

    }
}

export {
    eFiltroArquivoValues,
    FiltroArquivo
}