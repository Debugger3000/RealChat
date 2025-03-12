
const User = require('../models/user');
const passport = require('passport');
const express = require('express');
//main router to 
const userRoutes = express.Router();

// --------------------------------------------------------------

//handle user account posts when path is just '/api/user'

//GET - when path is '/api/user'
userRoutes.get("/", async (req,res,next) => {

        let users = await User.find();
        return res.status(200).json(users);
});

//GET - get a specific user by id
userRoutes.get("/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//POST - for creating a new user...
// - path is 'api/user/new'
userRoutes.post("/new", async (req,res,next) => {
    //create new user and put request body into it
    //const userData = userSchemaObject.parse(req.body);
    //let newUser = await User.create(userData);

    // teacher method
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        country: req.body.country,
        gender: req.body.gender
    });
    console.log('hehehe inside post USER...');
    res.redirect('/login');
    await newUser.save();
    res.end();

    //prob route to log user in, and initialize cookies....


})

//POST - for logging in an existing user...
// path is just '/api/user'

//new post route added for login commented out previous
//but this route is currently not working not sure why

userRoutes.post('/login', passport.authenticate('local', {
    successRedirect:'/profile',
    failureRedirect: '/profile',
    failureFlash: true,
    failureMessage: true
}));


/* userRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // check if password is correct
        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.json({ msg: 'User logged in successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

,(req, res) =>{

    res.redirect('/');


}); */




module.exports = userRoutes;

