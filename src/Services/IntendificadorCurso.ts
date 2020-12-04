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


//Object.keys(data).find(key => key === value);

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

class ClassificarLocal extends Classificador
{
    ano:Number;
    constructor(ano:Number)
    {
        super();
        this.ano = ano;
    }


    public async Classificate() {
       const resposta = []
       const file = await import('./Locais/locais_de_aplicacao.json');
       file.forEach(element => {
           if(element.ano == this.ano)
           {
               resposta.push(element)
           }
       });
        return resposta;
    }
    
}

export{
    Indentificador,
    ClassificarPorTipo,
    ClassificarPorAno,
    ClassificarLocal
}






