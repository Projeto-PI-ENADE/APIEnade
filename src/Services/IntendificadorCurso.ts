import * as cursos2018 from './data/cursos_2018.json';


interface IDadosCurso
{
    curso_id:number,
    nome_curso:string,
    count:number
}

interface IEntrada
{
    curso_id:number,
    count:number
}


export default function DataDocumentCursos(list:Array<IEntrada>):Array<IDadosCurso>
{
    let data =  new Array<IDadosCurso>();
    console.log(cursos2018);
    list.forEach(element => {
        const pos = element.curso_id.toString(); 
        const index = Object.keys(cursos2018).find(key => key == pos)
        console.log(index);
        let temp:IDadosCurso = 
        {
            curso_id:element.curso_id,
            count:element.count,
            nome_curso: cursos2018[index],
        }
        console.log(temp);
        data.push(temp)
    });
    return data;
}









