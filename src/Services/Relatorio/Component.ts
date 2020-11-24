import INode from './INode'
interface IComponent {
    Generate(filter: INode)
}

class NotaGen implements IComponent {
    Generate(filter: INode) {
        let data = [
            ['0-20'],
            ['20-40'],
            ['40-60'],
            ['60-80'],
            ['80-100']
        ]
        //FEÃO 
        filter.values.filter((v) => { v.checked === true }).map((f) => {
            if (f.title === 'Por idade') {
                //data[0].push
            }
        });

    }

}