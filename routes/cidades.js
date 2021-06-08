const express = require('express')
const router = express.Router()
const Cidade = require('../model/cidade')
const { check, validationResult } = require('express-validator')

router.get('/', async (req, res) => {
    try {
        const cidades = await Cidade.find()
        res.json(cidades)
    } catch (err) {
        res.status(500).send({
            erros: [{ message: 'Não foi possivel obter as cidades' }]
        })
    }
})

const validaCidade = [
    check('nome', 'Nome da cidade é obrigatório').not().isEmpty(),
    check('CEP', 'O CEP não pode ser vazio').not().isEmpty()
]
router.post('/', validaCidade, async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({
            errors: erros.array()
        })
    }

    const { nome, CEP } = req.body

    let cidadeNome = await Cidade.findOne({ nome })
    if (cidadeNome) {
        return res.status(200).json({
            errors: [{ message: 'Ja existe uma cidade com o nome informado!' }]
        })
    }

    let cidadeCEP = await Cidade.findOne({ CEP })
    if (cidadeCEP) {
        return res.status(200).json({
            errors: [{ message: 'Ja existe uma cidade com o CEP informado!' }]
        })
    }

    try {
        let cidade = new Cidade(req.body)
        await cidade.save()
        res.send(cidade)
    } catch (err) {
        return res.status(500).json({
            errors: [{ message: `Erros ao salvar a cidade: ${err.message}` }]
        })
    }
})

router.delete('/:id', async (req, res) => {
    await Cidade.findByIdAndDelete(req.params.id)
        .then(cidade => {
            res.send({ message: `Cidade ${cidade.nome} removida!!!` })
        }).catch(err => {
            return res.status(500).send({
                errors: [{ message: `Não foi possivel apager a cidade de id: ${req.params.id}` }]
            })
        })
})

router.put('/',validaCidade,async(req,res)=>{
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({
            errors: erros.array()
        })
    }

    let dados = req.body
    await Cidade.findByIdAndUpdate(req.body._id,{
        $set:dados
    },{new:true})
    .then(cidade=>{
        res.send({message:`cidade ${cidade.nome} alterada com sucesso`})
    }).catch(err=>{
        return res.status(500).send({
            errors:[{message:`Não foi possivel alterar a cidade com id: ${req.body._id}`}]
        })
    })
})

module.exports = router