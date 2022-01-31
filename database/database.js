const Sequelize=require("sequelize");
const connection=new Sequelize("guiaperguntas","root","Agridoce@10",{
    host:"localhost",
    dialect:"mysql"
})

module.exports=connection