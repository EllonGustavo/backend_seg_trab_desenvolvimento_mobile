const express = require('express')
require('dotenv').config()
const InicializaMongoServer = require('./config/db')

const RotaCidades = require('./routes/cidades')

const PORT = process.env.PORT

const app = express()

InicializaMongoServer()

app.disable('x-powered-by')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH')
    next()
})

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        messagem: 'API 100% funcional'
    })
})

app.use('/cidades',RotaCidades)

app.use(function(req,res){
    res.status(404).json({mensagem:`a rota ${req.originalUrl} não existe`})
})

app.listen(PORT,(req,res)=>{
    console.log(`servidor iniciado na porta ${PORT}`)
})