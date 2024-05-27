const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ideias_db', 'victoricoma', 'Gordinho123', {
    host: 'appideiasicomagrupoa.mysql.database.azure.com',
    dialect: 'mysql',
    ssl:true
})

try{
    sequelize.authenticate()
    console.log('Connectado ao servidor Azure MySQL!')
}catch(error){
    console.error(`Error MySQL: ${error}`)
}

module.exports = sequelize