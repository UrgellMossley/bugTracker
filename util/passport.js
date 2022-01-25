//configures passport local strategy used for authehntification
//imports of models/modules and variable declarations
const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const User = require(`../models/User`);
const validPassword = require(`../util/passwordUtils`).isValidPassword

//function which verifies that a user exists and that password is valid
const verifyCallback = async (username, password, done) =>{
    try {
        //sequelize method that finds a user with the passed in username
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        //if user does not exist return false which will cause error to be handled
        if (!user) { return done(null, false) }
        //uses defined function to validate the password passed in on form
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    } catch (error) {
        done(error)
    }
}

//defines the strategy used by passport framework
const stategy = new LocalStrategy(verifyCallback);

passport.use(stategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done)  => {
    try {
      const user =  await User.findByPk(userId);
      return done(null, user);
    } catch (error) {
        done(err)
    }
});