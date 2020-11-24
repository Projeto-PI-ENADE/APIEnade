const fs = require('fs');
const { convertArrayToCSV } = require('convert-array-to-csv');
const filePath = 'Files/'
import TableExporter from './TableExporter'

class CSVExporter extends TableExporter {

    constructor(data: Array<Object>) {
        super(data, 'csv')
    }

    async CreateFile(): Promise<void> {
        let v = this.BuildData(this.data)

        const csvFromArrayOfArrays = convertArrayToCSV(v, { separator: ';' });

        await fs.writeFileSync(filePath + this.FileName(), csvFromArrayOfArrays, function (err) {
            if (err) return console.log(err);
        })
    }
}


export default CSVExporter