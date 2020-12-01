import INode from '../INode'

enum eFiltroLicenciaturaValues {
    matematica,
    letras,
    fisica
}

export default class FiltroLicenciatura extends INode {
    constructor() {
        super();
        this.title = 'FiltroLicenciatura'
        this.AddValue({ title: "Matemática", type: eFiltroLicenciaturaValues.matematica, checked: false })
        this.AddValue({ title: "Letras", type: eFiltroLicenciaturaValues.letras, checked: false })
        this.AddValue({ title: "Fisica", type: eFiltroLicenciaturaValues.fisica, checked: false })

    }

    async Generate(data: string[][], parentProps: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
}