import CSVExporter from './CSVExporter'
import XLSXExporter from './XLSXExporter'
import JSONExporter from './JSONExporter'

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

