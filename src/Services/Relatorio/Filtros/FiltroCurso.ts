import INode from '../INode'
import FiltroBacharelado from './FiltroBacharelado'
import FiltroLicenciatura from './FiltroLicenciatura'
import { FiltroTecnologo } from './FiltroTecnologo'

enum eFiltroCursoValues {
    bacharelado,
    licenciatura,
    tecnologo
}

class FiltroCurso extends INode {
    filtroBacharelado: FiltroBacharelado;
    filtroLicenciatura: FiltroLicenciatura;
    filtroTecnologo: FiltroTecnologo;
    constructor() {
        super()
        this.title = 'FiltroCurso'
        this.AddValue({ title: "Bacharelado", type: eFiltroCursoValues.bacharelado, checked: false });
        this.AddValue({ title: "Licenciatura", type: eFiltroCursoValues.licenciatura, checked: false });
        this.AddValue({ title: "Tecnologo", type: eFiltroCursoValues.tecnologo, checked: false });

        this.filtroBacharelado = new FiltroBacharelado();
        this.filtroLicenciatura = new FiltroLicenciatura();
        this.filtroTecnologo = new FiltroTecnologo();

        this.AddChild(this.filtroTecnologo);
        this.AddChild(this.filtroBacharelado);
        this.AddChild(this.filtroLicenciatura);

    }

    async Generate(data: Array<Array<any>>, parentProps: any): Promise<any> {

    }
}

export {
    eFiltroCursoValues,
    FiltroCurso
}