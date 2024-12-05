
const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")
// const init = require("./init.js")
const methodOverride = require("method-override");

//middlewares
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
main().then(()=>{
    console.log("database connection made successfully");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

//routes
app.get("/chats", async (req,res)=>{
  let chats = await Chat.find();
//   console.log(chats);
  res.render("index.ejs",{chats});
})

//new route
app.get("/chats/new",async(req,res)=>{
   
    res.render("new.ejs");
})

//create route
app.post("/chats",async(req,res)=>{
    let {from,msgs,to} = req.body;
    //inserting new comer data into database:jo data hmne chats/new page pe liya ab usko database me insert kr rhe
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msgs,
        create_at:new Date()
    }).save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    // console.log(newChat);
    res.redirect("/chats");
})

//edit route

app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat =  await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//Update Route

app.put("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let { msgs:newMsg}= req.body;
    // console.log(newMsg);
   
    let updateChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    // console.log(updateChat);
    res.redirect("/chats");
    // res.send("working successfully");
})

//Delete Route

app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    console.log("this is root");
    res.send("Hi, I am root");
})
app.listen(port,()=>{
    console.log(`listning on port ${port}`);
})

//chats will have :(id,from,to,message,created_at) its like a wp