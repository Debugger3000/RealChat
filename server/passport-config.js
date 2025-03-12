var localStrategy = require('passport-local').Strategy;
const User = require("./models/user");

//startup passport 
function initializePassport(passport, getUserById){
    // main authentication method. checks email and password 
    const authenticateUser = async (email, password, done) => {
        console.log('in passport authenticate function');
        try {
            const user = await User.findOne({email: email, password: password});
            //check the email to see if it matches
            if(!user){
                console.log('in bad email');
                return done(null, false, { message: 'No user with that email.'});
            }
            // check if the password matches the db (add bcrypt at some point for more secure password storage...)
            if (password === user.password){
                console.log('in good password');
                return done(null, user);
            } 
        } 
        catch (err){
            return done(err);
        }

    }
    //setup a local strategy to handle login authentication
    passport.use(new localStrategy({usernameField: 'email' }, authenticateUser));


    //serialize the user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Deserialize the user
    passport.deserializeUser(async (id, done) => {
        return done(null, getUserById(id));
    });

}


module.exports = initializePassport;


