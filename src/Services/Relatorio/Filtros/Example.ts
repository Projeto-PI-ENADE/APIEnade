import { FiltroArquivo, eFiltroArquivoValues } from './FiltroArquivo'
import FiltroAnos from './FiltroAnos'
import FiltroCurso from './FiltroCurso'
import { FiltroNotas, eFiltroOpcoes } from './FiltroNotas'
import { FiltroPresenca } from './FiltroPresenca'
import INode from '../INode'

let arq: INode = new FiltroArquivo();
arq.AddValue({ title: 'CSV', type: eFiltroArquivoValues.CSV, checked: true });
arq.AddValue({ title: 'XLSX', type: eFiltroArquivoValues.XLSX, checked: true });

let ano: INode = new FiltroAnos();
ano.AddValue({ title: '2018', type: 2018, checked: true });
ano.AddValue({ title: '2010', type: 2010, checked: true });



let cur: INode = new FiltroCurso();
cur.AddValue({ title: "Medicina Veterinaria", type: 5, checked: true });
cur.AddValue({ title: "Odontologia", type: 6, checked: true });

let cur2: INode = new FiltroCurso();
cur2.AddValue({ title: "Administração", type: 1, checked: true });
cur2.AddValue({ title: "Direito", type: 2, checked: true });


let fno: INode = new FiltroNotas();
fno.AddValue({ title: 'Por quantidade de alunos', type: eFiltroOpcoes.quantidade, checked: true })
fno.AddValue({ title: 'Por idade', type: eFiltroOpcoes.idade, checked: true })
fno.AddValue({ title: 'Por sexo', type: eFiltroOpcoes.sexo, checked: true })
fno.AddValue({ title: 'Por renda familiar', type: eFiltroOpcoes.renda, checked: true })
fno.AddValue({ title: 'Por modalidade de ensino', type: eFiltroOpcoes.modalidade, checked: true })
fno.AddValue({ title: 'Por etnia', type: eFiltroOpcoes.etnia, checked: true })

let fpr: INode = new FiltroPresenca();
fpr.AddValue({ title: 'Por quantidade de alunos', type: eFiltroOpcoes.quantidade, checked: true })
// fpr.AddValue({ title: 'Por idade', type: eFiltroOpcoes.idade, checked: true })
// fpr.AddValue({ title: 'Por sexo', type: eFiltroOpcoes.sexo, checked: true })
// fpr.AddValue({ title: 'Por renda familiar', type: eFiltroOpcoes.renda, checked: true })
// fpr.AddValue({ title: 'Por modalidade de ensino', type: eFiltroOpcoes.modalidade, checked: true })
// fpr.AddValue({ title: 'Por etnia', type: eFiltroOpcoes.etnia, checked: true })


cur2.AddChild(fno)

cur.AddChild(fpr)
ano.AddChild(cur)
//ano.AddChild(cur2)
arq.AddChild(ano)

export default arq