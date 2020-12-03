//metodo que classifica os JSONS
abstract class Classificador
{
    public abstract Classificate();
}

//Classe que recebe um algoritmo para indentificar os jsons
class Indentificador
{
    index:Classificador;

    constructor(algoritmo:Classificador)
    {
        this.index = algoritmo;
    }

    public GetIndentificadores()
    {
        return this.index.Classificate();
    }

}

enum ECategoria
{
    Licenciatura,Bacharelado,Tecnologo
}


//Classificar usando o Tipo do curso como separador
class ClassificarPorTipo extends Classificador
{
    ano:Number;
    constructor(ano:Number)
    {
        super();
        this.ano = ano;
    }
    
    public async Classificate(){
        try
        {
            const url = './data/cursos_'+this.ano+'_por_tipo';
            const file = await import(url);
            return file;
        }catch(error)
        {
            return {Message:"Erro ao importar arquivo", Erro:error};
        }
    }
}

class ClassificarPorAno extends Classificador
{

    ano:Number;
    constructor(ano:Number)
    {
        super();
        this.ano = ano;
    }

    public async Classificate() {
        try
        {
            const url = './data/cursos_'+this.ano;
            const file = await import(url);
            return file;
        }catch(error)
        {
            return {Message:"Erro ao importar arquivo", Erro:error};
        };
    }
    
}


export{
    Indentificador,
    ClassificarPorTipo,
    ClassificarPorAno
}






