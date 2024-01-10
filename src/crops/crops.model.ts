import * as mongoose from 'mongoose'
export const cropSchema = new mongoose.Schema({
    name: { type:String, required:true },
    plantingField: { type:String, required:true },
    harvestingDate: { type:Date, required:true },
    cropType: { type:String, required:true },
    plantingDate: { type:Date, required:true },
})

export interface Crop extends mongoose.Document {
     id: number
     name: string
     plantingField: string
     harvestingDate: Date
     cropType: string
     plantingDate: Date
}
