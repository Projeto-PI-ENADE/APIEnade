import { Mongoose } from 'mongoose';
import mongoose from '../db';
const Schema = mongoose.Schema;

export interface IPresenca
{
    ano_prova:Date,
    tipo_presenca:number
}

const PresenceSchema = new Schema({
    ano_prova:{type:Date, required:true},
    tipo_presenca:{type:Number, required:true}
});


export default mongoose.model('PresAnalise', PresenceSchema, 'PresAnalise');