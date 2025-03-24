
const User = require('../models/user');
const passport = require('passport');
const express = require('express');
const encrypt = require('bcryptjs');
//main router to 
const userRoutes = express.Router();

// --------------------------------------------------------------


userRoutes.post("/test", function(req,res) {
    console.log("test api route was hit !!!");
    console.log("message from the front:", req.body.message);
    res.status(200).json({message: "Test api route is working real well !!!."});
  });


//handle user account posts when path is just '/api/user'

//GET - when path is '/api/user'
userRoutes.get("/", async (req,res,next) => {

    let users = await User.find();
    console.log("GET Request received, and is working !")
    return res.status(200).json(users);
});

//GET - a users friends


//GET - get a specific user by id
userRoutes.get("/me", async (req, res) => {
    console.log("req user", req.user);

    // send back user data for themselves by grabbing their user data from 'req.user'
    res.status(200).json({user: req.user});
});


// DELETE a user 
userRoutes.delete("/:id", async (req,res) => {
    console.log("within delete user...");
    try {
        //grab id from url path with 'req.params.id'
        const result = await User.findByIdAndDelete(req.params.id);
        console.log("result: ", result);

        if(result){
            res.status(200).json({message: "Item was deleted !"});
        }
        else{
            res.status(500).json({message: "Error occurred while deleting the item!"});
        }
    }
    catch (error) {
        console.log("error occurred while running delete!");
        console.log("Caught the Error: ", error);
    }
})



// -----------------------------------------------------------------------------------------

// REGISTER - a new user
userRoutes.post(
    "/new",
    function(req,res,next) {
        console.log("inside register POST... Pre auth function.");
        passport.authenticate("register", async (err,user,info) =>{

            console.log("err",err);
            console.log("user",user);
            console.log("info: ",info);

            // dont login, or run register code for this register attempt
            if(!user){
                
                if(info.code == "ee"){
                    res.status(200).send(info);
                    console.log("response sent: email already exists!!!");
                    // next();
                }
            }
            // error happened during register authentication
            else if(err){
                res.status(500).send({message:"Register Error",success: false, url: "", id: "", code: "Register Error"});
            }
            // if user exists then auth is fine, so we log the user in...
            else{
                req.login(user, async (error) => {
                    console.log("register error....",error);
                    console.log("User logged in !");
                    // return res.redirect('profile');
                    next();
                });
                
                // res.status(200).send({message: "Hello, register auth works !!!", success: true, url: "/profile", id: req.user.id, code:"success"});
            }
        })(req,res,next);
    },
    (req,res,next) => {
        console.log('is auth: ', req.isAuthenticated());
        try {
            if(req.user){
                console.log("User created ! Sending back response.");
                res.status(200).send({message: "Hello, register auth works !!!", success: true, url: "/home", id: req.user.id, code:"success"});
            }
            else{
                console.log("register un-successful !");
                res.status(200).send({message: "register unsuccessful!",success: false, url: "", id: "", code: "bad register"});
            }
        }
        catch (error) {
            console.log(error);
            res.status(200).send({message: "Error: register bad + Error!",success: false, url: "", id: "", code: "bad register Error"});
        }
    }
);

// LOGIN - login an existing user
userRoutes.post(
    "/login", 
    function(req,res,next) {
        console.log("inside login post... Pre auth function.");
        // call next function in line, which is the one below here. 'passport.authenticate()'
        // next();

        passport.authenticate("login", async (err,user,info) =>{

            console.log("err",err);
            console.log("user",user);
            console.log("info: ",info);

            // dont login, or run register code for this register attempt
            if(!user){
                // user not found
                if(info.code == "unf"){
                    res.status(200).send(info);
                    console.log("response sent: user not found");
                    // next();
                }
                // no password match
                else if(info.code == "npm"){
                    res.status(200).send(info);
                    console.log("response sent: password did not match");
                }
            }
            // error happened during login authentication
            else if(err){
                res.status(500).send({message:"Login Error",success: false, url: "", id: "", code: "Login Error"});
            }
            // user found so we log them in and go to next function to send response
            else{
                req.login(user, async (error) => {
                    console.log("login error....",error);
                    // return res.redirect('profile');
                    next();
                });
            }

        })(req,res,next);
    },
    (req,res,next) => {
        console.log('is auth: ', req.isAuthenticated());
        try {
            if(req.user){
                console.log("User created ! Sending back response.");
                res.status(200).send({message: "Login was successful", success: true, url: "/home", id:req.user.id, code: "sl"});
            }
            else{
                console.log("login un-successful !");
                res.status(200).send({message:"Login unsuccessful",success: false, url: "", id: "", code: "Login Bad"});

            }
        }
        catch (error) {
            console.log(error);
            res.status(200).send({message:"Login Error",success: false, url: "", id: "", code: "Login Error"});
        }
    }
);



// Logout route...
userRoutes.post('/logout', (req, res, next) => {
    console.log("logout has been called....");
  req.logout(function(err) {
    console.log("logout has been called and ran...");
    if (err) { return next(err); }
    res.status(200).json({message: "Logout received..."})
  });
});


// isAuthenticated -  check is user is authenticated
userRoutes.post('/isGood', (req,res,next) => {
    console.log("Is auth route has been called...");
    try {
        console.log('request object: ',req.isAuthenticated());
        // res.status(200).json({isAuth: true});
        if(req.isAuthenticated()){
            res.status(200).json({isAuthenticated: true});
        }
        else{
            res.status(200).json({isAuthenticated: false});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
   
});

// send friend request
userRoutes.post('/friend/request/:username', async (req, res) => {
    try {
        // res.status(200).json({ msg: 'servers not fucked' });
        const user = await User.findById(req.user._id);
        const friend = await User.findOne({username: req.params.username});


        if(user.id === friend.id){
            return res.status(404).json({ msg: 'Cannot add yourself...' });
        }

        if (!friend) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (friend.friendRequests.includes(user.id)) {
            return res.status(400).json({ msg: 'Friend already added.' });
        }

        friend.friendRequests.push(user.id);
        await friend.save();

        res.status(200).json({ msg: 'Friend request sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// accept friend request
userRoutes.post('/friend/accept/:id', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const friend = await User.findById(req.params.id);

        if (!friend) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.friendRequests.includes(friend.id)) {
            return res.status(400).json({ msg: 'No friend request from this user' });
        }

        user.friends.push(friend.id);
        user.friendRequests = user.friendRequests.filter(id => id.toString() !== friend.id.toString());
        await user.save();

        friend.friends.push(user.id);
        await friend.save();

        res.status(200).json({ msg: 'Friend request accepted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// get friends list
userRoutes.get('/friend/getList', async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('friends', 'username');
        res.status(200).json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// get friend requests
userRoutes.get('/friend/request', async (req, res) => {
    try {
        //const user = await User.findById(req.user.id).populate('friendRequests', 'username');
        const user = await User.find({ _id: { $in:req.user.friendRequests }});

        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// reject friend request
userRoutes.post('/friend/reject/:id', async (req, res) => {
    console.log("friend rejection hit..");
    try {
        const friendId = req.params.id;

        const userId = req.user._id;

        const user = await User.findById(userId);

        console.log(friendId);
        console.log(userId);
       
        // const friend = await User.findById(req.params.id);

        // if (!friend) {
        //     return res.status(404).json({ msg: 'User not found' });
        // }

        // if (!user.friendRequests.includes(friend.id)) {
        //     return res.status(400).json({ msg: 'No friend request from this user' });
        // }

        const friendRequests = user.friendRequests.filter((id) => id.toString() !== friendId.toString());

        console.log(friendRequests);

        await User.updateOne({_id: userId}, {$set: {friendRequests: friendRequests}});   

        res.status(200).json({ msg: 'Friend request rejected' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = userRoutes;

