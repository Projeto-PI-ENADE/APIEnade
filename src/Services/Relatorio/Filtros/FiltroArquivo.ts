
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

    async Generate(data: Array<Array<any>>, parentProps: any): Promise<any> {

        data = [[]]
        let files: Array<String> = new Array<String>();

        for await (const c of this.childs) {
            await c.Generate(data, null);
        }

        for await (const f of this.values) {
            if (f.id == eFiltroArquivoValues.CSV) {
                const r = await new CSVExporter(data).ExportFile()
                files.push(r);
            }
            if (f.id == eFiltroArquivoValues.XLSX) {
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