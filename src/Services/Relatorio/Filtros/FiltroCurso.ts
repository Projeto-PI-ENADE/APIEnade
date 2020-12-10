import INode from '../INode'
import { ClassificarPorAno } from '../../IntendificadorCurso'

export default class FiltroCurso extends INode {



    async Generate(data: string[][], parentProps: any): Promise<any> {

        const c = await new ClassificarPorAno(Number(parentProps["ano"])).Classificate()

        for await (const v of this.values) {
            if (Object.keys(c).includes(String(v.id))) {


                data.push([' '])
                data.push([v.nome])

                parentProps["curso"] = v.id;
                for await (const c of this.childs) {
                    await c.Generate(data, parentProps)
                }

            }
            else {
                console.log(`Curso: ${v.id} não está presente em ${parentProps["ano"]}`);
            }

        }

    }

}

