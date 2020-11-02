import { ExportToCsv } from "export-to-csv";
const ObjectsToCsv = require('objects-to-csv');


export default async function ExportarCSV(path:string, list:Array<Object>)
{
  const csv =  new ObjectsToCsv(list);

  try
  {
    await csv.toDisk(path);
  }catch(err)
  {
    console.log(err);
  }

}