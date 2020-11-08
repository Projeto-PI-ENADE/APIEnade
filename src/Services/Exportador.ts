import { ExportToCsv } from "export-to-csv";
const ObjectsToCsv = require('objects-to-csv');

const filePath = 'Files/'

interface FileExporter {
  data: Array<Object>;
  CreateFile(): void;
  ExportFile(): string;
}

class CSVExporter implements FileExporter {
  data: Array<Object>;

  constructor(data: Array<Object>) {
    this.data = data;
  }

  CreateFile(): void {

  }

  ExportFile(): string {
    this.CreateFile();
    const path = filePath + 'csv_' + Date.now() + '.csv'
    return path;
  }

}

class XLSXExporter implements FileExporter {

  data: Array<Object>;

  constructor(data: Array<Object>) {
    this.data = data;
  }

  CreateFile(): void {

  }

  ExportFile(): string {
    this.CreateFile();
    const path = filePath + 'xlsx_' + Date.now() + '.xlsx'
    return path;
  }
}



class Exporter
{
  path:string;

  constructor(str:string)
  {
    this.path = str;
  }

  async ExportToCSV(list:Array<Object>) 
  {
    const csv =  new ObjectsToCsv(list);
    try
    {
      await csv.toDisk(this.path);
    }catch(err)
    {
      console.log(err);
    }
  }

}

export default Exporter;