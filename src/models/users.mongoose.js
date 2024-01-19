import mongoose from "mongoose"
import { randomUUID } from "node:crypto"

const collection = 'usuarios'

const schema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    Email: { type: String, unique: true, required: true },
    Password: { type: String, required: true },
    Nombre: { type: String, required: true },
    Apellido: { type: String, required: true },
}, {
    strict: 'throw',
    versionKey: false
})

export const usuariosManager = mongoose.model(collection, schema)