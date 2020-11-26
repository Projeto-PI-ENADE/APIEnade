
import INode from './INode'

enum eFiltroArquivoValues {
    CSV,
    XLSX,
    JSON
}

export default class FiltroArquivo extends INode {
    constructor() {
        super()
        this.title = 'FiltroArquivo'
        this.AddValue({ title: 'CSV', type: eFiltroArquivoValues.CSV, checked: false })
        this.AddValue({ title: 'XLSX', type: eFiltroArquivoValues.XLSX, checked: false })
        this.AddValue({ title: 'JSON', type: eFiltroArquivoValues.JSON, checked: false })
    }
}
