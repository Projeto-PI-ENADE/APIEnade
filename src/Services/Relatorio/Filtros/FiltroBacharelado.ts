import INode from '../INode'

enum eFiltroBachareladoValues {
    administracao = 1,
    direito = 2,
    cienciasEconomicas = 13,
    psicologia = 18,
    cienciasContabeis = 22,
    design = 26,
    turismo = 29,
    servicoSocial = 38,
    secretariadoExecutivo = 67,
    relacoesInternacionais = 81,
    administraçãoPublica = 100,
    teologia = 101,
    jornalismo = 803,
    publicidadePropaganda = 804,
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

export {
    eFiltroBachareladoValues,
    FiltroBacharelado
}