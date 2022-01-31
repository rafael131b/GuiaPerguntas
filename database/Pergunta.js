const  Sequelize=require("sequelize")
const connection=require("./database")


const Pergunta=connection.define("perguntas",{
    titulo:{
        type:Sequelize.STRING,
        allowNull:false

    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false
    }

})


Pergunta.sync({force:false}).then(()=>{
    console.log("Tebela criada com sucesso")
}).catch((msgErro)=>{
    console.log(msgErro+"Tabela não pode ser criada")
})

module.exports=Pergunta;