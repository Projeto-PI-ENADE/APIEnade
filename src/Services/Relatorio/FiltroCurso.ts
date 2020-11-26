import INode from './INode'
import FiltroBacharelado from './FiltroBacharelado'
import FiltroLicenciatura from './FiltroLicenciatura'
import FiltroTecnologo from './FiltroTecnologo'

enum eFiltroCursoValues {
    bacharelado,
    licenciatura,
    tecnologo
}

export default class FiltroCurso extends INode {
    constructor() {
        super()
        this.title = 'FiltroCurso'
        this.AddValue({ title: "Bacharelado", type: eFiltroCursoValues.bacharelado, checked: false })
        this.AddValue({ title: "Licenciatura", type: eFiltroCursoValues.licenciatura, checked: false })
        this.AddValue({ title: "Tecnologo", type: eFiltroCursoValues.tecnologo, checked: false })
        this.AddChild(new FiltroBacharelado())
        this.AddChild(new FiltroLicenciatura())
        this.AddChild(new FiltroTecnologo())

    }
}