import INode from './INode'

enum eFiltroNotasValues {
    quantidade,
    idade,
    sexo,
    renda,
    modalidade
}

export default class FiltroNotas extends INode {

    constructor() {
        super();
        this.title = 'FiltroNotas'
        this.AddValue({ title: 'Por quantidade de alunos', type: eFiltroNotasValues.quantidade, checked: false })
        this.AddValue({ title: 'Por idade', type: eFiltroNotasValues.idade, checked: false })
        this.AddValue({ title: 'Por sexo', type: eFiltroNotasValues.sexo, checked: false })
        this.AddValue({ title: 'Por renda familiar', type: eFiltroNotasValues.renda, checked: false })
        this.AddValue({ title: 'Modalidade de Ensino', type: eFiltroNotasValues.modalidade, checked: false })
    }

}