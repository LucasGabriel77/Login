const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('cadastro', 'root','senai',{
    dialect: "mysql",
    host: 'localhost'
})

sequelize.authenticate().then(()=>{
    console.log("conexão realizada com sucesso")
}).catch((err)=>{
    console.error("Falha na conexão",err)
})

module.exports = sequelize