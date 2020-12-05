import INode from '../INode'

export default class FiltroAnos extends INode {
    constructor() {
        super()
        this.title = 'FiltroAnos'

    }

    async Generate(data: Array<Array<any>>, parentProps: any): Promise<any> {

        if (parentProps == null) {
            parentProps = { ano: 0 };
        } else {
            parentProps["ano"] = 0;
        }

        const vals = this.values.filter((v) => { v.checked === true })

        for await (const f of this.values) {

            data.push([]);
            data.push([f.title]);

            for await (const c of this.child) {
                parentProps["ano"] = f.type;
                await c.Generate(data, parentProps);
            }
        }

    }
}