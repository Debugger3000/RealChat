// if (process.env.NODE_ENV !== 'production'){
//   require('dotenv').config();
// }




const Message = require('./models/message');
const { grabNonSenderId, updateNotifications } = require('./middleware/web-socket');

const cors = require('cors');
var express = require('express');
// Websocket imports
const createServer = require('http');
const Server = require('socket.io');
//initialize express app
var app = express();

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });  // This loads .env.production if NODE_ENV=production
console.log(`./.env.${process.env.NODE_ENV}`);
console.log(process.env.NODE_ENV);


// pre flight ???
app.options('https://tysonk.com', cors());

// Enable CORS for all origins (for testing)
// app.use(cors());

// Or for specific domains (for production)
app.use(cors({
  origin: ['https://realchatclient.onrender.com','http://localhost:8080','http://localhost:4200','https://tysonk.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204, // Handle preflight requests with status 204 (no content)
}));



// connect IO to express app
const httpServer = createServer.createServer(app); 

const io = new Server.Server(httpServer, {
  cors: {
    origin: ["http://localhost:4200", "https://realchatclient.onrender.com", "https://tysonk.com"]
  }
});

// function feedSocket(socket) {

// }

// let socket = null;






// Probably route callbacks to a websocket file here
io.on("connection", (socket) => {
  // ...
  console.log("Someone Connected..");
  console.log("Socket id:", socket.id);
  // set a global socket so we can use this socket within functions...

  // make user join a room so we can track each user, and refer to them by sending to their 'room' which is just their socket ID
  // socket.join(socket.id);

  

  // listen for initial data
  socket.on("credentials-pass", (userId) => {
    //set room to users ID
    console.log(`User with socket ID ${socket.id} just joined the room ${userId}`);
    socket.join(userId);
  });

  // disconnect listener
  socket.on("disconnect", (reason) => {
    // ...
    console.log("disconnect reason: ", reason);
  });

  //send on connection
  socket.emit("initial-connect", "Sending to client from server through websocket TEST...", socket.id);


  // Main listener from client for messages
  socket.on("message-form", async (payload) => {

    //give data to route to update model
    console.log("message-form socket event was hit from client with: ", payload);

    //var clients = io.clients();
    // console.log('clients connected via sockets: ', clients);

    // grab other user id in that chatroom
    const secondUserId = await grabNonSenderId(payload.userId,payload.chatRoomId);

    console.log("second users ID: ",secondUserId);

    // Create new message document and save into database...
    const newMessage = new Message({
      chatroomId: payload.chatRoomId,
      username: payload.username,
      userId: payload.userId,
      content: payload.message
    });
    await newMessage.save();


    // update notifs for both people ?
    await updateNotifications(payload.userId, payload.chatRoomId);


    //emits to the other user in the chatroom and the sender as well
    // socket.in(secondUserId).emit('message-update', payload.chatRoomId);

    // emit to this sender
    socket.emit('message-update', payload.chatRoomId)

    // emit to the other user in their own ID room
    io.in(secondUserId).emit('message-update', payload.chatRoomId, secondUserId);

    // send back to user in the other room as well...

    // send chatroomID back to user, so it lets client know that it needs to update that chatroom or store notifications
    // io.emit("message-update", "Letting user know that a message was given and should update their messages for the chatroom id", payload.chatRoomId);

  });


  // 
  // to individual socketid (private message)
  // io.to(socketId).emit(/* ... */);
  
});


//

// Look for disconnect 
io.on("disconnect", (socket) => {
  console.log("Someone disconnected..");
  console.log("Socket id:", socket.id);
})









// io.on("connect", (data) => {
//   console.log("data from client side: ",data);
// });

// socket for each user ?
// OR socket for each chatroom ?






// require mongoose for mongoDB
var mongoose = require('mongoose');

var configurations = require('./configs/global');
var passport = require('passport');
var session = require('express-session');
var flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const encrypt = require('bcryptjs');




//import config,and passport
var cookieParser = require('cookie-parser')


// const corsOptions = {
//   origin: ['http://localhost:4200'],
//   credentials: true,
//   "preflightContinue": true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
//   optionsSuccessStatus: 200
// }
  

// app.use(cors({origin: ['http://localhost:4200'], credentials:true, optionsSuccessStatus: 200}));
app.use(express.json());
app.use(cookieParser());


// Websocket Initialization
// 





//startup express flash to show messages from sessions
app.use(flash());


// SESSIONS
// ----------------------------------------------------------------------------------------------------------
// initialize session
// this has to go before passport initialization
app.use(session({
  name: "RealChatUser",
  secret: "Secret123",
  resave: false,
  saveUninitialized: false,
  
  
  cookie: {
    domain: process.env.NODE_ENV === 'development' ? undefined : 'tysonk.com',
    sameSite: 'None',
    secure: true,
    httpOnly: true,
    maxAge: 60000 * 60,
    // path: '/',
  }
}));



// app.use(session({
//   name: "RealChatUser",
//   secret: "Secret123",
//   resave: false,
//   saveUninitialized: false,
// }));



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
// --------------------------------------------------------------------------------------------------------------------------------


console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
  console.log("environment is: ",process.env.ENVIRONMENT_CURRENT);
}
else{
  console.log("environment is: ", process.env.ENVIRONMENT_CURRENT);

}

//mongoose connect
mongoose
.connect(process.env.NODE_ENV === 'development' ? process.env.MONGO_CONNECTION : process.env.MONGO_CONNECTION)
.then(() => { console.log('connected to mongo DB YEYEYEYEYE');
})
.catch((err) => {console.log('Error:',err);
});


// Routes
app.use("/api/user", require('./routes/user'));
app.use("/api/chatroom", require('./routes/chatroom'));
app.use("/api/message", require('./routes/message'));
app.use("/api/friend", require('./routes/friend'));

// app.listen(8080, () => {
//     console.log(`Example app listening on port 8080`)
//   })

httpServer.listen(8080,() => {
  console.log(`Example app listening on port 8080`);
});


// function socketToClient() {

//   setTimeout(() => {
//     console.log("socketToClient function has been run....");
//     sock.emit("tester","sending custom message to client...");

//   },5000)
  

// }

// socketToClient();

// module.exports = { 
  
// socketToClient: socketToClient

// }

// module.exports = io;
  




