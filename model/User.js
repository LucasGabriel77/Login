const{DataTypes} = require('sequelize')
const db = require('../db/conn')

const User = db.define('users',{
    nome:{
        type:DataTypes.STRING(100)
    },
    email:{
        type:DataTypes.STRING(200)
    },
    senha:{
        type:DataTypes.STRING(100)
    },

},{
    updatedAt: false,
    createdAt: false 
})

// User.sync({force:true})

module.exports = User 