import INode from '../INode'

export default class FiltroAnos extends INode {
    constructor() {
        super()
        this.title = 'FiltroAnos'
        this.AddValue({ title: '2018', type: 2018, checked: false })
        this.AddValue({ title: '2017', type: 2017, checked: false })
        this.AddValue({ title: '2016', type: 2016, checked: false })
        this.AddValue({ title: '2015', type: 2015, checked: false })
        this.AddValue({ title: '2014', type: 2014, checked: false })
        this.AddValue({ title: '2013', type: 2013, checked: false })
        this.AddValue({ title: '2012', type: 2012, checked: false })
        this.AddValue({ title: '2011', type: 2011, checked: false })
        this.AddValue({ title: '2010', type: 2010, checked: false })
    }

    async Generate(data: Array<Array<any>>, parentProps: any): Promise<any> {
        if (parentProps == null) {
            parentProps = { ano: 0 };
        } else {
            parentProps["ano"] = 0;
        }

        this.values.filter((v) => { v.checked === true }).map(async (f) => {
            data.push([]);
            data.push([f.title]);
            for await (const c of this.child) {
                parentProps["ano"] = f.type;
                await c.Generate(data, parentProps);
            }
        });
    }
}