const filePath = 'Files/'
const fs = require('fs');
const { convertArrayToCSV } = require('convert-array-to-csv');
const xlsx = require("node-xlsx");




abstract class FileExporter {
  data: Array<Object>;
  ext: string;
  time: number

  constructor(data: Array<Object>, ext: string) {
    this.data = data;
    this.ext = ext;
    this.time = Date.now()
  }

  abstract async CreateFile(): Promise<void>;
  abstract BuildData(values: any): any;

  FileName(): string {
    return this.ext + '_' + this.time + '.' + this.ext;
  }

  async ExportFile(): Promise<string> {
    try {
      await this.CreateFile();
      return this.FileName();
    } catch (error) {
      console.log('File Exporter: .', this.ext)
      console.log(error)
    }

  }
}

abstract class TableExporter extends FileExporter {
  BuildData(values: any): any {
    let tmp_data = []

    let header = ['', '', 'Sexo', '', 'Idade', '', '', '', '', '', '', '', 'Renda', '', '', '', '', '', '', 'Tipo Ensino Médio', '', '', '', '', '', 'Cor', '', '', '', '', '']
    let header2 = [
      '', 'Quantidade',
      'Feminino', 'Masculino',
      '16 - 24', '25 - 33', '34 - 42', '43- 51', '52 - 60', '61 - 69', '70 - 78', '79 - 87',
      '0 - 1,5', '1,5 - 3', '3 - 4,5', '4,5 - 6', '6 - 10', '10 - 30', '30 - ?',
      'Tradicional', 'Profissionalizante Tecnico', 'Profissionalizante', 'Magisterio', 'EJA', 'Outro',
      'Branca', 'Preta', 'Amarela', 'Parda', 'Indigena', 'Não Declarado']

    tmp_data.push(header)
    tmp_data.push(header2)
    return tmp_data
  }
}

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

class JSONExporter extends FileExporter {

  constructor(data: Array<Object>) {
    super(data, 'json')
  }
  BuildData(values: any): any {
    class ModalidadeEnsino {
      tradicional: number;
      profossionalizanteTecnico: number;
      profissionalizante: number;
      magisterio: number;
      EJA: number;
      outro: number;
    }
    class Cor {
      branca: number;
      prete: number;
      amarela: number;
      parda: number;
      indigena: number;
      naoDeclarado: number;
    }
    class Sexo {
      feminino: number
      masculino: number
    }

    class Data_h {
      quantidade: number;
      sexo: Sexo;
      idade: Array<number>;
      renda: Array<number>;
      tipoEnsinoMedio: ModalidadeEnsino;
      cor: Cor;
    }

    let v = {
      Geral: {
        Notas: [
          new Data_h(),
          new Data_h(),
          new Data_h(),
        ],
        Presenca: [
          new Data_h(),
          new Data_h(),
        ],
        Participantes: [
          new Data_h(),
        ]
      }
    }

    return JSON.stringify(v)
  }
  async CreateFile(): Promise<void> {
    let buffer = this.BuildData(this.data)
    await fs.writeFileSync(filePath + this.FileName(), buffer, function (err) {
      if (err) return console.log(err);
    })
  }
}


export default class Exporter {

  async ExportFile(data: Array<Object>, ext: string): Promise<string> {
    switch (ext) {
      case 'csv':
        return await new CSVExporter(data).ExportFile()
      case 'xlsx':
        return await new XLSXExporter(data).ExportFile()
      case 'json':
        return await new JSONExporter(data).ExportFile()
      default:
        return null
    }
  }
}

