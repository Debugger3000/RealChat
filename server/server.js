
var express = require('express');

//import config and mongoose
var configurations = require('./configs/global');
var mongoose = require('mongoose');



var app = express();
// const port = 8080;
app.use(express.json());



// Link to appropriate route 
app.use("/api/user", require('./routes/user'));


//mongoose connect
mongoose
.connect('mongodb+srv://carmacford:tW9UQ3bmwbRSZV3i@therealchat.koaj5.mongodb.net/')
.then(() => { console.log('connected to mongo DB YEYEYEYEYE');
})
.catch((err) => {console.log('Error:',err);

});




// app.get("/api/user", (request,response) => {

//     // res.json({message: "Hello server is being used..."});
//      response.send({message: "Hello server is being used..."});
// });




app.listen(8080, () => {
    console.log(`Example app listening on port 8080`)
  })