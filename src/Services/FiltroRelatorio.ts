class IValues {
    title: string
    checked: boolean
}

abstract class INode {
    title: string;
    values: Array<IValues>;
    child: Array<INode>

    constructor() {
        this.values = new Array<IValues>()
        this.child = new Array<INode>()
        this.title = ''
    }

    AddChild(node: INode): void {
        this.child.push(node);
    }
    RemoveChild(node: INode): void {
        this.child.slice(this.child.indexOf(node), 1)
    }
    AddValue(value: IValues): void {
        this.values.push(value)
    }
    RemoveValue(value: INode): void {
        this.values.slice(this.child.indexOf(value), 1)
    }

}


class FiltroBacharelado extends INode {
    constructor() {
        super();
        this.title = 'FiltroBacharelado'
        this.AddValue({ title: "Administração", checked: false })
        this.AddValue({ title: "Administração Pública", checked: false })
        this.AddValue({ title: "Ciências Contábeis", checked: false })
        this.AddValue({ title: "Ciências Econômicas", checked: false })
        this.AddValue({ title: "Design", checked: false })
        this.AddValue({ title: "Direito", checked: false })
        this.AddValue({ title: "Jornalismo", checked: false })
        this.AddValue({ title: "Psicologia", checked: false })
        this.AddValue({ title: "Publicidade e Propaganda", checked: false })
        this.AddValue({ title: "Relações Internacionais", checked: false })
        this.AddValue({ title: "Secretariado Executivo", checked: false })
        this.AddValue({ title: "Serviço Social", checked: false })
        this.AddValue({ title: "Teologia", checked: false })
        this.AddValue({ title: "Turismo", checked: false })
    }


}

class FiltroLicenciatura extends INode {
    constructor() {
        super();
        this.title = 'FiltroLicenciatura'

    }
}

class FiltroTecnologo extends INode {
    constructor() {
        super();
        this.title = 'FiltroTecnologo'
        this.AddValue({ title: "Tecnologia em Comércio Exterior", checked: false })
        this.AddValue({ title: "Tecnologia em Design de Interiores", checked: false })
        this.AddValue({ title: "Tecnologia em Design de Moda", checked: false })
        this.AddValue({ title: "Tecnologia em Design Gráfico", checked: false })
        this.AddValue({ title: "Tecnologia em Gastronomia", checked: false })
        this.AddValue({ title: "Tecnologia em Gestão Comercial", checked: false })
        this.AddValue({ title: "Tecnologia em Gestão da Qualidade", checked: false })
        this.AddValue({ title: "Tecnologia em Gestão de Rec. Humanos", checked: false })
        this.AddValue({ title: "Tecnologia em Gestão Financeira", checked: false })
        this.AddValue({ title: "Tecnologia em Gestão Pública", checked: false })
        this.AddValue({ title: "Tecnologia em Logística", checked: false })
        this.AddValue({ title: "Tecnologia em Marketing", checked: false })
        this.AddValue({ title: "Tecnologia em Processos Gerenciais", checked: false })
    }
}

class FiltroCurso extends INode {
    constructor() {
        super()
        this.title = 'FiltroCurso'
        this.AddValue({ title: "Bacharelado", checked: false })
        this.AddValue({ title: "Licenciatura", checked: false })
        this.AddValue({ title: "Tecnologo", checked: false })
        this.AddChild(new FiltroBacharelado())
        this.AddChild(new FiltroLicenciatura())
        this.AddChild(new FiltroTecnologo())

    }
}

class FiltroNotas extends INode {

    constructor() {
        super();
        this.title = 'FiltroNotas'
        this.AddValue({ title: 'Por quantidade de alunos', checked: false })
        this.AddValue({ title: 'Por idade', checked: false })
        this.AddValue({ title: 'Por sexo', checked: false })
        this.AddValue({ title: 'Por renda familiar', checked: false })
        this.AddValue({ title: 'Modalidade de Ensino', checked: false })
    }

}

class FiltroAnos extends INode {
    constructor() {
        super()
        this.title = 'FiltroAnos'
        this.AddValue({ title: '2018', checked: false })
        this.AddValue({ title: '2017', checked: false })
        this.AddValue({ title: '2016', checked: false })
        this.AddValue({ title: '2015', checked: false })
        this.AddValue({ title: '2014', checked: false })
        this.AddValue({ title: '2013', checked: false })
        this.AddValue({ title: '2012', checked: false })
        this.AddValue({ title: '2011', checked: false })
        this.AddValue({ title: '2010', checked: false })
        this.AddValue({ title: '2009', checked: false })
    }
}


class FiltroPresenca extends INode {
    constructor() {
        super()
        this.title = 'FiltroPresenca'
        this.AddValue({ title: 'Por quantidade total de alunos', checked: false })
        this.AddValue({ title: 'Por idade', checked: false })
        this.AddValue({ title: 'Por sexo', checked: false })
    }
}

class FiltroAluno extends INode {
    constructor() {
        super()
        this.title = 'FiltroAluno'
        this.AddValue({ title: 'Por idade', checked: false })
        this.AddValue({ title: 'Por sexo', checked: false })
        this.AddValue({ title: 'Por cor', checked: false })
        this.AddValue({ title: 'Por modalidade de ensino', checked: false })
    }
}

class FiltroArquivo extends INode {
    constructor() {
        super()
        this.AddValue({ title: 'CSV', checked: false })
        this.AddValue({ title: 'XLSX', checked: false })
        this.AddValue({ title: 'JSON', checked: false })
    }
}

export default class Filtro extends INode {
    constructor() {
        super()
        this.AddChild(new FiltroAluno())
        this.AddChild(new FiltroArquivo())
        this.AddChild(new FiltroPresenca())
        this.AddChild(new FiltroAnos())
        this.AddChild(new FiltroNotas())
        this.AddChild(new FiltroCurso())
    }
}