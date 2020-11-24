const fs = require('fs');
const filePath = 'Files/'
const xlsx = require("node-xlsx");
import TableExporter from './TableExporter'

class XLSXExporter extends TableExporter {

    constructor(data: Array<Object>) {
        super(data, 'xlsx')
    }

    async CreateFile(): Promise<void> {
        let v = this.BuildData(this.data)

        const buffer = xlsx.build([{ name: this.FileName(), data: v }])

        await fs.writeFileSync(filePath + this.FileName(), buffer, function (err) {
            if (err) return console.log(err);
        })
    }
}


export default XLSXExporter