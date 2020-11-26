import INode from './INode'

export default class Filtro extends INode {
    constructor() {
        super()
        this.title = 'FiltroOBJ'
        this.AddChild(new FiltroAluno())
        this.AddChild(new FiltroArquivo())
        this.AddChild(new FiltroPresenca())
        this.AddChild(new FiltroAnos())
        this.AddChild(new FiltroNotas())
        this.AddChild(new FiltroCurso())
    }
}