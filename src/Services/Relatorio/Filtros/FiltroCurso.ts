import INode from '../INode'


export default class FiltroCurso extends INode {

    constructor() {
        super();
        this.title = 'FiltroBacharelado'
    }

    async Generate(data: string[][], parentProps: any): Promise<any> {
        const vals = this.values.filter((v) => { v.checked === true })

        for await (const v of this.values) {
            parentProps["curso"] = v.type;
            data.push([" "])
            data.push([v.title])
            for await (const c of this.child) {
                await c.Generate(data, parentProps)
            }

        }

    }

}

