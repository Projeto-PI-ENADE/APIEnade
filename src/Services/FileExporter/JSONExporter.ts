const fs = require('fs');
const filePath = 'Files/'
import FileExporter from './FileExporter'

class JSONExporter extends FileExporter {

    constructor(data: Array<Object>) {
        super(data, 'json')
    }
    BuildData(values: any): any {
        class ModalidadeEnsino {
            tradicional: number;
            profossionalizanteTecnico: number;
            profissionalizante: number;
            magisterio: number;
            EJA: number;
            outro: number;
        }
        class Cor {
            branca: number;
            prete: number;
            amarela: number;
            parda: number;
            indigena: number;
            naoDeclarado: number;
        }
        class Sexo {
            feminino: number
            masculino: number
        }

        class Data_h {
            quantidade: number;
            sexo: Sexo;
            idade: Array<number>;
            renda: Array<number>;
            tipoEnsinoMedio: ModalidadeEnsino;
            cor: Cor;
        }

        let v = {
            Geral: {
                Notas: [
                    new Data_h(),
                    new Data_h(),
                    new Data_h(),
                ],
                Presenca: [
                    new Data_h(),
                    new Data_h(),
                ],
                Participantes: [
                    new Data_h(),
                ]
            }
        }

        return JSON.stringify(v)
    }
    async CreateFile(): Promise<void> {
        let buffer = this.BuildData(this.data)
        await fs.writeFileSync(filePath + this.FileName(), buffer, function (err) {
            if (err) return console.log(err);
        })
    }
}

export default JSONExporter