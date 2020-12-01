import IValues from './IValues'

export default abstract class INode {
    title: string;
    values: Array<IValues>;
    child: Array<INode>

    constructor() {
        this.values = new Array<IValues>()
        this.child = new Array<INode>()
        this.title = ''
    }
    abstract async Generate(data: Array<Array<string>>, parentProps: any): Promise<any>;
    AddChild(node: INode): void {
        this.child.push(node);
    }
    RemoveChild(node: INode): void {
        this.child.slice(this.child.indexOf(node), 1)
    }
    AddValue(value: IValues): void {
        this.values.push(value)
    }
    RemoveValue(value: INode): void {
        this.values.slice(this.child.indexOf(value), 1)
    }

}
