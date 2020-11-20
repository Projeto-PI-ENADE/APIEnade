import mongoose from '../db';
const Schema = mongoose.Schema;

//Documento geral do ALuno
export interface IDocumentoAluno
{
    sexo: string
    idade: number
    renda_fam: string
    trabalho: string
    tipo_ens_medio: string
    bolsa_estudo: string
    familiar_curso: string
    extraclasse: string
    razao_insti_sup: string
    grupo:string
    feedback:{
        dif_forma_geral: string
        dif_forma_especif: string
        ext_temp_prova: string
        clarez_prov_geral: string
        clarez_prov_espe: string
        tempo_gasto: string
        disc_contribu_form: number
        conteu_contr_atv: number
        retorno_curso: number
    }
    prova:{
        data_prova: Date,
        nota_bruta: number,
        tipo_presenca: number
    }
    curso:{
        area_curso: number,
        curso_estado: number,
        tipo_org_acad: number,
        modalidade_ensino: number,
    }
}



const DocumentAlunoSchema: mongoose.Schema = new mongoose.Schema({
    sexo: { type: String, required: true },
    idade: { type: Number, required: true },
    grupo:{type:String, required:true},
    renda_fam: { type: String, required: true },
    trabalho: { type: String, required: true },
    bolsa_estudo: { type: String, required: true },
    tipo_ens_medio: { type: String, required: true },
    familiar_curso: { type: String, required: true },
    extraclasse: { type: String, required: true },
    razao_insti_sup: { type: String, required: true },
    prova:{
        ano_prova: { type: Date, required: true },
        nota_bruta: { type: Number, required: true },
        tipo_presenca: { type: Number, required: true }
    },
    curso:{
        area_curso: { type: Number, required: true },
        curso_estado: { type: Number, required: true },
        tipo_org_acad: { type: Number, required: true },
        modalidade_ensino: { type: Number, required: true },
    },
    feedback:{
        dif_forma_geral: { type: String, required: true },
        dif_forma_especif: { type: String, required: true },
        ext_temp_prova: { type: String, required: true },
        clarez_prov_geral: { type: String, required: true },
        clarez_prov_espe: { type: String, required: true },
        tempo_gasto: { type: String, required: true },
        disc_contribu_form: { type: Number, required: true },
        conteu_contr_atv: { type: Number, required: true },
        retorno_curso: { type: Number, required: true },
    },
})



export default mongoose.model('AlunoFull', DocumentAlunoSchema);