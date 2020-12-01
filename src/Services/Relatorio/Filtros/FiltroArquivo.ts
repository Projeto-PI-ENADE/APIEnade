
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
        this.AddValue({ title: 'CSV', type: eFiltroArquivoValues.CSV, checked: false })
        this.AddValue({ title: 'XLSX', type: eFiltroArquivoValues.XLSX, checked: false })
        this.AddValue({ title: 'JSON', type: eFiltroArquivoValues.JSON, checked: false })
    }

    async Generate(data: Array<Array<any>>, parentProps: any): Promise<any> {
        data = [[]]

        for await (const c of this.child) {
            await c.Generate(data, null);
        }

        return this.values.filter((v) => { v.checked === true }).map(async (f) => {
            if (f.type == eFiltroArquivoValues.CSV) {
                return await new CSVExporter(data).ExportFile()
            }
            if (f.type == eFiltroArquivoValues.XLSX) {
                return await new XLSXExporter(data).ExportFile()
            }
        })
    }
}

export {
    eFiltroArquivoValues,
    FiltroArquivo
}