import INode from '../INode'

export default class FiltroAnos extends INode {

    async Generate(data: Array<Array<any>>, parentProps: any): Promise<any> {

        if (parentProps == null) {
            parentProps = { ano: 0 };
        } else {
            parentProps["ano"] = 0;
        }



        for await (const f of this.values) {

            data.push([' ']);
            data.push([f.nome]);
            for await (const c of this.childs) {
                parentProps["ano"] = f.id;
                await c.Generate(data, parentProps);
            }
        }

    }
}