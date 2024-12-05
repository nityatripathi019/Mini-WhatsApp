const mongoose = require("mongoose");
const Chat = require("./models/chat");

main().then(()=>{
    console.log("db connected successfully");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//inserting new chat  sample data
// let chat1 = new Chat({
//     from:"Diya Tripathi",
//     to:"Pragya Tripathi",
//     msg:"hello dii kya haal chal sb bdhiya ..aur kaisi chl rhi h sahayki",
//     create_at: new Date()
// });
// chat1.save().then((res)=>{
//    console.log(res);
// }).catch((err)=>{
//    console.log(err);
// })

// Chat.insertMany([
//     {
//         from:"priya",
//         to:"supriya",
//         msg:"abe notes bhej de yrr",
//         create_at:new Date()
//     },
//     {
//         from:"Diya Tripathi",
//         to:"Virat Kohli",
//         msg:"Hello sir i am huge fan of yours sir bss zindagi me ek baar milna h aapse",
//         create_at: new Date()
//     }
// ]).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// module.exports = Chat;

// new way
let allchats = [
    {
        from:"ajay",
        to:"prashant",
        msg:"chl ghoom k aate",
        create_at: new Date()
    },
    {
        from:"rohan",
        to:"jaiswal",
        msg:"bhai k century maari h yrr mja aa gya aussie k to chakke chuda diye",
        create_at: new Date()
    },
    {
        from:"rahul dravid",
        to:"rohit sharma ",
        msg:"bhai dekha garden me ghoomne wale ldko ne kmaal kr diya",
        create_at: new Date()
    },
    {
        from:"virat kohli",
        to:"gautam gambhir",
        msg:"gaaba k baad perth ka toota ghamand",
        create_at: new Date()
    },
    {
        from:"rcb fans",
        to:"rcb management",
        msg:"gadho ki fauj bhari h..bhai ganja fuk k auction me baithe the kya",
        create_at: new Date()
    },
];
Chat.insertMany(allchats);

