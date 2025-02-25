const express = require('express')
const app = express()
const cors = require('cors')
const conn = require('./db/conn')
const User = require('./model/User')
const bcrypt = require('bcrypt')

const PORT = 3000
const hostname = 'localhost'

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.post('/logar',  async (req,res)=>{
    const login = req.body
    console.log(login)
    try {
        const pesq = await User.findOne({where: {email : login.email}, raw : true})
        console.log(pesq)
        
        if (pesq === null) {
            console.log('Usuario não encontrado no banco')
            res.status(200).json({message : 'Usuario não encontrado no banco'})
        } else if (pesq.email = login.email) {
            bcrypt.compare(login.senha, pesq.senha, (err, result)=>{
                if (err) {
                    console.log("erro em verificar a criptografia")
                    res.status(500).json({ message: "erro ao verificar a criptografia" })
                } else if (result) {
                    console.log('senha incorreta')
                    res.status(200).json({message : 'login com sucesso'})
                } else {
                    console.log('senha incorreta')
                    res.status(404).json({message : 'Senha incorreta, Tente novamente'})
                }
            })
        } else {

        }
    } catch (err) {
        console.error('Erro ao consultar Usuario no banco', err)
        res.status(500).json({message : 'Erro ao consultar '})
    }

    
})
app.post('/cadastrar',  (req,res)=>{
    const cad = req.body
    bcrypt.hash(cad.senha, 10, async(err, hash) => {
        if (err) {
            console.log("erro ao gerar o hash!")
            res.status(500).json({ message: "erro ao criptografar a senha!" })
        }
        try {
            const grav = await User.create(
            {nome: cad.nome, email: cad.email, senha: hash })
            console.log(grav)
            res.status(200).json(grav)
        } catch (err) {
            console.error("Erro ao gravar os dados!", err)
            res.status(500).json({ message: "Erro ao gravar os dados!" })
        }

    })
})

app.get('/', (req,res)=>{
    res.status(200).json({message : 'Servidor Ativo!'})
})

conn.sync().then(()=>{
        app.listen(PORT, hostname, ()=>{
            console.log(`Servidor rodando em ${hostname} : ${PORT}`)
        })
    }
).catch((err)=>{
    console.error('Falha na Conexão')
})
