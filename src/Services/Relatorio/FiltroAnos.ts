import INode from './INode'

export default class FiltroAnos extends INode {
    constructor() {
        super()
        this.title = 'FiltroAnos'
        this.AddValue({ title: '2018', type: 2018, checked: false })
        this.AddValue({ title: '2017', type: 2017, checked: false })
        this.AddValue({ title: '2016', type: 2016, checked: false })
        this.AddValue({ title: '2015', type: 2015, checked: false })
        this.AddValue({ title: '2014', type: 2014, checked: false })
        this.AddValue({ title: '2013', type: 2013, checked: false })
        this.AddValue({ title: '2012', type: 2012, checked: false })
        this.AddValue({ title: '2011', type: 2011, checked: false })
        this.AddValue({ title: '2010', type: 2010, checked: false })
        this.AddValue({ title: '2009', type: 2009, checked: false })
    }
}