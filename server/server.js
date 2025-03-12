if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}


//import config,and passport
var cookieParser = require('cookie-parser')
var express = require('express');
var mongoose = require('mongoose');
var configurations = require('./configs/global');
var passport = require('passport');
var session = require('express-session');
var flash = require('express-flash');
var app = express();
var passport = require('passport');
const User = require("./models/user");
const initializePassport = require('./passport-config');
const Secret = 'Secret123';


  
// const port = 8080;
app.use(express.json());


app.use(cookieParser());
//mongoose connect
mongoose
.connect('mongodb+srv://carmacford:tW9UQ3bmwbRSZV3i@therealchat.koaj5.mongodb.net/')
.then(() => { console.log('connected to mongo DB YEYEYEYEYE');
})
.catch((err) => {console.log('Error:',err);s
});



initializePassport(passport, 
  email => User.find(user => user.email === email),
  id => User.find(user => user.id === id)
  );
//startup express flash
app.use(flash());
app.use(session({
  secret: Secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());


// Link to appropriate route 
app.use("/api/user", require('./routes/user'));



// app.get("/api/user", (request,response) => {

//     // res.json({message: "Hello server is being used..."});
//      response.send({message: "Hello server is being used..."});
// });




app.listen(8080, () => {
    console.log(`Example app listening on port 8080`)
  })




