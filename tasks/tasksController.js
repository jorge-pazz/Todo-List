const { raw } = require('body-parser');
const express = require('express');
const { NUMBER } = require('sequelize');
const router = express.Router();
const ModelTask = require('./ModelTask');

router.post("/save",(req,res)=>{

    let name = req.body.name;
    let done = req.body.done;

    if(done == undefined){
        done = 0;
    }

    if(name == ''){
        res.redirect('/');
    }else{

   
    console.log(name);
    

   ModelTask
        .create({
            nome: name,
            concluido: done
        })
        .then(()=>{
            res.redirect('/');
        })
        .catch((msgErro)=>{
            console.log('Erro ao cadastrar tarefa -- ' + msgErro);
        })
    }
});


router.post("/delete",(req,res)=>{

    let id = req.body.id;

    ModelTask
        .destroy({
            where:{
                id:id
            }
        })
        .then(()=>{
            console.log('TAREFA EXCLUIDA COM SUCESSO');
            res.redirect('/');
        })
        .catch((msgErro)=>{
            console.log('Erro ao excluir tarefa --- ' + msgErro);
        })

   

});


router.get('/update/:id',(req,res)=>{

    let id = req.params.id;

    if(isNaN(id)){

        res.redirect('/');

    }else{
        

        ModelTask
        .findAll({
            raw:true,
            where:{
                id: id
            }
        })
        .then((tasks)=>{

            res.render('update',{tasks:tasks})


        })
        .catch((msgErro)=>{

            console.log('Erro ao realizar consulta para UPDATE --- ' + msgErro);

        })
    }

   


});


router.post('/updateSave',(req,res)=>{

    let id = req.body.id;
    let nome = req.body.nome;
    let done = req.body.done;

    if(done == 0){
        done = 1;
    }else{
        done = 0;
    }
   // console.log('AQUI VAI O ID E DONE ---- ' + id + ' ===== ' + done)
    // res.redirect('/');


  ModelTask
        .update({nome:nome,concluido:done},{
            where:{
                id:id
            }
        })
        .then(()=>{
            console.log('AQUI VAI O ID E DONE ---- ' + id + done)
            res.redirect('/');
        })
        .catch()


})

module.exports = router;
