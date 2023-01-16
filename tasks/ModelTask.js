const Sequelize =  require('sequelize');
const connectionDB = require('../database/database');
const modelTasks =  connectionDB.define('tasks',{

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },

    concluido:{
        type: Sequelize.STRING,
        allowNull: false
    }


});

modelTasks
    .sync({force:false})
    .then(()=>{
        console.log('Criado com sucesso o model TASKS');
    })
    .catch((msgErro)=>{
        console.log('Erro ao criar model Tasks -- ' + msgErro);
    })

module.exports = modelTasks;    