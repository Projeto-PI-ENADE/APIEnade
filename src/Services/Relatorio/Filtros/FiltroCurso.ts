import INode from '../INode'
import { ClassificarPorAno } from '../../IntendificadorCurso'

export default class FiltroCurso extends INode {

    constructor() {
        super();
        this.title = 'FiltroBacharelado'
    }

    async Generate(data: string[][], parentProps: any): Promise<any> {
        const vals = this.values.filter((v) => { v.checked === true })
        const c = await new ClassificarPorAno(Number(parentProps["ano"])).Classificate()

        for await (const v of this.values) {
            if (Object.keys(c).includes(String(v.type))) {

                console.log("Curso", v.title, "tem", this.child.length, "filhos: ")
                this.child.map(v => console.log(v.title))
                console.log(" ")


                data.push([""])
                data.push([v.title])

                parentProps["curso"] = v.type;
                for await (const c of this.child) {
                    await c.Generate(data, parentProps)
                }

            }
            else {
                console.log(`Curso: ${v.type} não está presente em ${parentProps["ano"]}`);
            }

        }

    }

}

