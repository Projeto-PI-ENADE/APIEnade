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

export default async function ExportarCSV(path: string, list: Array<Object>) {
  const csv = new ObjectsToCsv(list);

  try {
    await csv.toDisk(path);
  } catch (err) {
    console.log(err);
  }

}