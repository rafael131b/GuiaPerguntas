const express=require("express");
const res = require("express/lib/response");
const bodyParser=require("body-parser")
const Pergunta=require("./database/Pergunta")
const Resposta=require("./database/Resposta")

  //conexão

const connection=require("./database/database")

//database
connection.authenticate()
.then(()=>{
    console.log("conexão feita com o banco  de dados")
}).catch((msgErro)=>{
    console.log(msgErro)
})

// const res = require("express/lib/response");
const app=express();



app.set("view engine","ejs")
app.use(express.static("public"))
//body PARSER
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
//ROTAS
app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true,order:[
        ["id","desc"]
    ]}).then(perguntas=>{
        res.render("index",{
       perguntas:perguntas,
      
        });
    })
  
  
})
app.get("/ask",(req,res)=>{
    res.render("ask")
})
app.post("/salvarpergunta",(req,res)=>{
    var titulo=req.body.titulo;
    var descricao=req.body.descricao
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");
    })
})

app.get("/pergunta/:id",(req,res)=>{
    var id=req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta=>{
        if(pergunta!=undefined){
            
            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order:[
                    ["id","DESC"]
                ]
            }).then(respostas=>{
                //pergunta encontrada
            res.render("pergunta",{
                pergunta:pergunta,
                respostas:respostas
            })   
            })
            
            
        }else{//pergunta nao  encontrada
            res.redirect("/")
        }
    })

})

app.post("/responder",(req,res)=>{
    var corpo=req.body.corpo
    var perguntaId=req.body.pergunta

    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    })

})
app.listen(8080,()=>{console.log("Aplicação Rodando com sucesso")
})