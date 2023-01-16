const Sequelize = require('sequelize');
const connection =  new Sequelize('database','user,'password',{

    host:'localhost',
    dialect:'mysql'

});


connection
    .authenticate()
    .then(()=>{
        console.log('Banco de Dados conectado com Sucessso!');
    })
    .catch((msgErro)=>{
        console.log('Erro ao conectar o banco de dados -- ' + msg);
    })

module.exports = connection;