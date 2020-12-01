import INode from '../INode'


export default class FiltroCurso extends INode {

    constructor() {
        super();
        this.title = 'FiltroBacharelado'
        this.AddValue({ title: "Administração", type: 0, checked: false })

    }

    async Generate(data: string[][], parentProps: any): Promise<any> {
        const vals = this.values.filter((v) => { v.checked === true })

        for await (const v of vals) {
            parentProps["curso"] = v.type;
            data.push([])
            data.push([v.title])
            for await (const c of this.child) {
                await c.Generate(data, parentProps)
            }

        }

    }

}

