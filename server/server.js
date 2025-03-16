// if (process.env.NODE_ENV !== 'production'){
//   require('dotenv').config();
// }

var express = require('express');
//initialize express app
var app = express();
// require mongoose for mongoDB
var mongoose = require('mongoose');

var configurations = require('./configs/global');
var passport = require('passport');
var session = require('express-session');
var flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;


//import config,and passport
var cookieParser = require('cookie-parser')

const encrypt = require('bcryptjs');
const User = require("./models/user");
const Chatroom = require("./models/chatroom");
const Message = require("./models/message");


// const initializePassport = require('./passport-config');


  
// const port = 8080;
app.use(express.json());
app.use(cookieParser());



// initializePassport(
//     passport, 
//     email => User.find(user => user.email === email),
//     id => User.find(user => user.id === id)
// );

//startup express flash to show messages from sessions
app.use(flash());


// initialize session
// this has to go before passport initialization
app.use(session({
  name: User.username,
  secret: "Secret123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60,
  }
}));

app.use(passport.initialize());
// 
app.use(passport.session());

passport.serializeUser((user,done) => {
  console.log("serializing user.");
  done(null,user);
});

passport.deserializeUser((user,done) => {
  console.log('within De serialize..');
  done(null,user);
})


// Register Code
passport.use(
  'register',
  new LocalStrategy(
    {usernameField: "email", passwordField: "password", passReqToCallback: true},
    async (req,email,password,done) => {
      try {

        //check to make sure your email does not exist in the database
        let emailCheck = await User.findOne({ email });
        console.log(emailCheck);
        if(emailCheck != null){
          return done(null,false,{message: "Email already exists in", success: false, url: "", id:"", code: "ee"});
        }

        //hash password received from frontend with 10 salt rounds
        // let hashedPassword = await encrypt.hash(password,10);
        
        let user = new User({email: email, username: req.body.username, password: password, age: req.body.age});
        // commit data to DB
        await user.save();
        // call done and user should be logged in from here
        done(null,user,{message: "User registered successfully..."});
      }
      
      catch (error) {
        return done(error);
      }

    }
  )
);


// Set strategy to use
passport.use(
  'login',
  new LocalStrategy({usernameField: "email", passwordField: "password"}, async (email,password,done) => {

    try {
      let user = await User.findOne({ email });

      if(user == null){
        console.log('user is not found....');
        return done(null,false, {message: "User not found in Database!", success: false, url: "", id:"", code: "unf"});
      }

      if(password == user.password){
        return done(null,user, {message: "User found, and is going to be logged.."});
      }
      else if(password !== user.password){
        return done(null,false,{message: "Password did not match!", success: false, url: "", id:"", code: "npm"});
      }
    } 
    catch (error) {
      return done(error);
    }
  })
);


// passport.use(User.createStrategy());



// app.use(passport.authenticate('session'));

//configure strategy

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//mongoose connect
mongoose
.connect('mongodb+srv://carmacford:tW9UQ3bmwbRSZV3i@therealchat.koaj5.mongodb.net/')
.then(() => { console.log('connected to mongo DB YEYEYEYEYE');
})
.catch((err) => {console.log('Error:',err);s
});





// app.post("api/user/login", 
//     function(req,res,next) {
//         console.log("inside login post... Pre auth function.");
//         // call next function in line, which is the one below here. 'passport.authenticate()'
//         next();
//     },
//     passport.authenticate("local", {
//     failWithError: true,
//     successRedirect:'/profile',
//     failureRedirect: '/profile',
//     failureFlash: true,
//     failureMessage: "Invalid Credentials bitch ass hoe..."
// })
// );


// Routes
app.use("/api/user", require('./routes/user'));
app.use("/api/chatroom", require('./routes/chatroom'));
app.use("/api/message", require('./routes/message'));

app.listen(8080, () => {
    console.log(`Example app listening on port 8080`)
  })




