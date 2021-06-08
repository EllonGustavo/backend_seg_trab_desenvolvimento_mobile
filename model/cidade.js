const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CidadeSchema=mongoose.Schema({
    nome:{type:String, unique:true},
    CEP:{type:Number, unique:true},
    teritorio:{type:Number},
    qntHabitantes:{type:Number},
    descricao:{type:String}
},{timestamps:true})

module.exports = mongoose.model('Cidade',CidadeSchema)