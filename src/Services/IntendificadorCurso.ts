
interface ITipoCurso
{
    id_curso:number
    nome_curso:string
}
 
//    const index = Object.keys(cursos2018).find(key => key == pos)


export default {

    async IndentificarPorID(ano:string)
    {
        const url = './data/cursos_'+ano;
        const file = await import(url);
        return file;
    },

    async IndentificarPorTipo(ano:string)
    {
        const url = './data/cursos_'+ano+'_por_tipo.json';
        const file = await import(url);
        return file;
    }




}








