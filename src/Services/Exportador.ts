import { ExportToCsv } from "export-to-csv";
const ObjectsToCsv = require('objects-to-csv');




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