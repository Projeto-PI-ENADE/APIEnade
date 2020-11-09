interface IRank
{
    quantidade_elementos:number;
    percentual:number;
}


class Ranking
{
    grupo:string;
    rank:Array<IRank>
    

    constructor(str:string)
    {
        this.grupo = str;
        this.rank = new Array<IRank>();
    }

    public CalculaRankNotas(list:Array<any>):void
    {
        var a = 0,b = 0,c = 0,d = 0, e = 0;
        list.forEach(element => {
            if(element.nota_bruta >= 0 && element.nota_bruta <= 20)
            {
                a++;
            }
            else if(element.nota_bruta > 20 && element.nota_bruta <= 40)
            {
                b++
            }
            else if(element.nota_bruta > 40 && element.nota_bruta <= 60)
            {
                c++;
            }
            else if(element.nota_bruta > 60 && element.nota_bruta <= 80)
            {
                d++;
            }
            else
            {
                e++;;
            }
        });

        var total = a + b + c + d + e;
        this.rank.push({quantidade_elementos:a, percentual:(100 * a)/total});
        this.rank.push({quantidade_elementos:b, percentual:(100 * b)/total});
        this.rank.push({quantidade_elementos:c, percentual:(100 * c)/total});
        this.rank.push({quantidade_elementos:d, percentual:(100 * d)/total});
        this.rank.push({quantidade_elementos:e, percentual:(100 * e)/total});
    }

}


export default Ranking;