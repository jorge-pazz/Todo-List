const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectionDB = require('./database/database'); 

const tasksController = require('./tasks/tasksController');

const modelTasks = require('./tasks/ModelTask');




//MOTOR EJS
app.set('view engine','ejs');

//BODY PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//STATIC FILES
app.use(express.static('public'));


//CONTROLLER
app.use("/", tasksController);


//ROUTER
app.get("/", (req,res)=>{


    modelTasks
        .findAll({
            raw:true, 
            order:[['id','DESC']]
        })
        .then((tasks)=>{
            res.render("index",{
                tasks: tasks,
            });
        })
        .catch((msgErro)=>{
            console.log('Erro ao listar as tarefas -- ' + msgErro);
        })

    

});


//SERVER
app.listen(8080, (msgErro)=>{

    if(msgErro){
        console.log('Erro ao conectar o SERVIDOR! -- ' + msgErro);
    }else{
        console.log('Servidor conectado com SUCESSO')
    }

});