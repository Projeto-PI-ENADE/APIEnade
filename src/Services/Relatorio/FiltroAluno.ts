import INode from './INode'

enum eFiltroAlunoValues {
    etnia,
    idade,
    sexo,
    modalidade
}

export default class FiltroAluno extends INode {
    constructor() {
        super()
        this.title = 'FiltroAluno'
        this.AddValue({ title: 'Por idade', type: eFiltroAlunoValues.idade, checked: false })
        this.AddValue({ title: 'Por sexo', type: eFiltroAlunoValues.sexo, checked: false })
        this.AddValue({ title: 'Por etnia', type: eFiltroAlunoValues.etnia, checked: false })
        this.AddValue({ title: 'Por modalidade de ensino', type: eFiltroAlunoValues.modalidade, checked: false })
    }
}