import INode from './INode'

enum eFiltroPresencaValues {
    quantidade,
    idade,
    sexo
}

export default class FiltroPresenca extends INode {
    constructor() {
        super()
        this.title = 'FiltroPresenca'
        this.AddValue({ title: 'Por quantidade total de alunos', type: eFiltroPresencaValues.quantidade, checked: false })
        this.AddValue({ title: 'Por idade', type: eFiltroPresencaValues.idade, checked: false })
        this.AddValue({ title: 'Por sexo', type: eFiltroPresencaValues.sexo, checked: false })
    }
}