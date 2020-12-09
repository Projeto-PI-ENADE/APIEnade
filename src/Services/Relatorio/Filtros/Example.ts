import { FiltroArquivo, eFiltroArquivoValues } from './FiltroArquivo'
import FiltroAnos from './FiltroAnos'
import FiltroCurso from './FiltroCurso'
import { FiltroNotas, eFiltroOpcoes } from './FiltroNotas'
import { FiltroPresenca } from './FiltroPresenca'
import INode from '../INode'

let arq: INode = new FiltroArquivo();
arq.AddValue({ nome: 'CSV', id: eFiltroArquivoValues.CSV });
arq.AddValue({ nome: 'XLSX', id: eFiltroArquivoValues.XLSX });

let ano: INode = new FiltroAnos();
ano.AddValue({ nome: '2018', id: 2018 });
ano.AddValue({ nome: '2010', id: 2010 });



let cur: INode = new FiltroCurso();
cur.AddValue({ nome: "Medicina Veterinaria", id: 5 });
cur.AddValue({ nome: "Odontologia", id: 6 });

let cur2: INode = new FiltroCurso();
cur2.AddValue({ nome: "Administração", id: 1 });
cur2.AddValue({ nome: "Direito", id: 2 });


let fno: INode = new FiltroNotas();
fno.AddValue({ nome: 'Por quantidade de alunos', id: eFiltroOpcoes.quantidade })
fno.AddValue({ nome: 'Por idade', id: eFiltroOpcoes.idade })
fno.AddValue({ nome: 'Por sexo', id: eFiltroOpcoes.sexo })
fno.AddValue({ nome: 'Por renda familiar', id: eFiltroOpcoes.renda })
fno.AddValue({ nome: 'Por modalidade de ensino', id: eFiltroOpcoes.modalidade })
fno.AddValue({ nome: 'Por etnia', id: eFiltroOpcoes.etnia })

let fpr: INode = new FiltroPresenca();
fpr.AddValue({ nome: 'Por quantidade de alunos', id: eFiltroOpcoes.quantidade })
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