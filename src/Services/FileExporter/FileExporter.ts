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


export default FileExporter