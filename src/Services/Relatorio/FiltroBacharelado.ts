import INode from './INode'

enum eFiltroBachareladoValues {
    administracao,
    administraçãoPublica,
    cienciasContabeis,
    cienciasEconomicas,
    design,
    direito,
    jornalismo,
    psicologia,
    publicidadePropaganda,
    relacoesInternacionais,
    secretariadoExecutivo,
    servicoSocial,
    teologia,
    turismo,
}

export default class FiltroBacharelado extends INode {
    constructor() {
        super();
        this.title = 'FiltroBacharelado'
        this.AddValue({ title: "Administração", type: eFiltroBachareladoValues.administracao, checked: false })
        this.AddValue({ title: "Administração Pública", type: eFiltroBachareladoValues.administraçãoPublica, checked: false })
        this.AddValue({ title: "Ciências Contábeis", type: eFiltroBachareladoValues.cienciasContabeis, checked: false })
        this.AddValue({ title: "Ciências Econômicas", type: eFiltroBachareladoValues.cienciasEconomicas, checked: false })
        this.AddValue({ title: "Design", type: eFiltroBachareladoValues.design, checked: false })
        this.AddValue({ title: "Direito", type: eFiltroBachareladoValues.direito, checked: false })
        this.AddValue({ title: "Jornalismo", type: eFiltroBachareladoValues.jornalismo, checked: false })
        this.AddValue({ title: "Psicologia", type: eFiltroBachareladoValues.psicologia, checked: false })
        this.AddValue({ title: "Publicidade e Propaganda", type: eFiltroBachareladoValues.publicidadePropaganda, checked: false })
        this.AddValue({ title: "Relações Internacionais", type: eFiltroBachareladoValues.relacoesInternacionais, checked: false })
        this.AddValue({ title: "Secretariado Executivo", type: eFiltroBachareladoValues.secretariadoExecutivo, checked: false })
        this.AddValue({ title: "Serviço Social", type: eFiltroBachareladoValues.servicoSocial, checked: false })
        this.AddValue({ title: "Teologia", type: eFiltroBachareladoValues.teologia, checked: false })
        this.AddValue({ title: "Turismo", type: eFiltroBachareladoValues.turismo, checked: false })
    }


}
