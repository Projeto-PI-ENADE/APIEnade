import IValues from './IValues'

export default abstract class INode {

    values: Array<IValues>;
    childs: Array<INode>

    constructor() {
        this.values = new Array<IValues>()
        this.childs = new Array<INode>()
    }
    abstract async Generate(data: Array<Array<string>>, parentProps: any): Promise<any>;

    AddChild(node: INode): void {
        this.childs.push(node);
    }
    RemoveChild(node: INode): void {
        this.childs.slice(this.childs.indexOf(node), 1)
    }
    AddValue(value: IValues): void {
        this.values.push(value)
    }
    RemoveValue(value: INode): void {
        this.values.slice(this.childs.indexOf(value), 1)
    }
}
