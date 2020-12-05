import FileExporter from './FileExporter'

abstract class TableExporter extends FileExporter {
    BuildData(values: [[]]): any {
        let tmp_data = []

        let header = ['', '', 'Sexo', '', 'Idade', '', '', '', '', '', '', '', '', '', 'Renda', '', '', '', '', '', '', 'Tipo Ensino Médio', '', '', '', '', '', 'Cor', '', '', '', '', '']
        let header2 = [
            '', 'Quantidade',
            'Feminino', 'Masculino',
            '0 - 15', '16 - 24', '25 - 33', '34 - 42', '43- 51', '52 - 60', '61 - 69', '70 - 78', '79 - 87', '88 - ?',
            '0 - 1.5', '1.5 - 3', '3 - 4.5', '4.5 - 6', '6 - 10', '10 - 30', '30 - ?',
            'Tradicional', 'Profissionalizante Tecnico', 'Profissionalizante', 'Magisterio', 'EJA', 'Outro',
            'Branca', 'Preta', 'Amarela', 'Parda', 'Indigena', 'Não Declarado']

        tmp_data.push(header)
        tmp_data.push(header2)
        for (let i = 0; i < values.length; i++) {
            tmp_data.push(values[i])
        }
        return tmp_data
    }
}

export default TableExporter
