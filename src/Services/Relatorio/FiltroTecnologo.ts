import INode from './INode'

enum eFiltroTecnologoValues {
    comercioExterior,
    designInteriores,
    designModa,
    designGrafico,
    gastronomia,
    gestaoComercial,
    gestaoQualidade,
    gestaoRecHumanos,
    gestaoFinanceira,
    gestaoPublica,
    gestaoLogistica,
    gestaoMarketing,
    processosGerenciais
}

export default class FiltroTecnologo extends INode {
    constructor() {
        super();
        this.title = 'FiltroTecnologo'
        this.AddValue({ title: "Tecnologia em Comércio Exterior", type: eFiltroTecnologoValues.comercioExterior, checked: false })
        this.AddValue({ title: "Tecnologia em Design de Interiores", type: eFiltroTecnologoValues.designInteriores, checked: false })
        this.AddValue({ title: "Tecnologia em Design de Moda", type: eFiltroTecnologoValues.designModa, checked: false })
        this.AddValue({ title: "Tecnologia em Design Gráfico", type: eFiltroTecnologoValues.designGrafico, checked: false })
        this.AddValue({ title: "Tecnologia em Gastronomia", type: eFiltroTecnologoValues.gastronomia, checked: false })
        this.AddValue({ title: "Tecnologia em Gestão Comercial", type: eFiltroTecnologoValues.gestaoComercial, checked: false })
        this.AddValue({ title: "Tecnologia em Gestão da Qualidade", type: eFiltroTecnologoValues.gestaoQualidade, checked: false })
        this.AddValue({ title: "Tecnologia em Gestão de Rec. Humanos", type: eFiltroTecnologoValues.gestaoRecHumanos, checked: false })
        this.AddValue({ title: "Tecnologia em Gestão Financeira", type: eFiltroTecnologoValues.gestaoFinanceira, checked: false })
        this.AddValue({ title: "Tecnologia em Gestão Pública", type: eFiltroTecnologoValues.gestaoPublica, checked: false })
        this.AddValue({ title: "Tecnologia em Logística", type: eFiltroTecnologoValues.gestaoLogistica, checked: false })
        this.AddValue({ title: "Tecnologia em Marketing", type: eFiltroTecnologoValues.gestaoMarketing, checked: false })
        this.AddValue({ title: "Tecnologia em Processos Gerenciais", type: eFiltroTecnologoValues.processosGerenciais, checked: false })
    }
}

