//import express module
const express = require(`express`);

//store express module in app constant variable
const app = express();

//imports path module which allows for static file sharing
const path = require(`path`);

//import inizialtion of sequelize from util dir
const sequelize = require(`./util/database.js`);

//import module that allows us to create session middleware
const session = require(`express-session`);

//import module that allows us to instantiate Sequelize with session store
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);


//import uuid4 for id generation
const { uuid } = require('uuidv4');

//import User model
const User = require(`./models/User.js`)
//import Queue model
const Queue = require(`./models/Queues.js`)
//import extended model for cases
const Case = require(`./models/Case.js`)
//import Message model
const  Message = require(`./models/Message`)
const passport =  require(`passport`)
//import passport configuration module to use in main app
require(`./util/passport`);

//body parser allowing us to route files and access requests etc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serve our static files, allows us to traverse public dir
app.use(express.static(path.join(__dirname, `public`)));

//Set our view engine as ejs
app.set(`view engine`, `ejs`);

//Determines where we are looking for our views
app.set(`views`,`views`);

//import router modules fron routes duirectory
const userRoutes = require(`./routes/users.js`);

//set up instance of Sequelise store which can be synced when nneded
const myStore = new SequelizeStore({
    db: sequelize,
});
//middleware to define session data and cookie options
app.use(
    session({
        cookie:{
            //set max age to one day, after cookie will expire
            maxAge: 1000 * 60 * 60 * 24,
            //As per docs, this will be considerated a path seperator, and filters through subdomains i.e. /my-queue etc
            path: `/`
        },
        //function needed to be passed in so that we can gen UUID for cookie ID
        genid: function genId(req) {
            return uuid()
        },
        secret: "bugtracker",
        store: myStore,
        //as per express session docs this must be false as connect-session-sequelize uses touch method
        resave: false,
        //no SSL implementation as of yet
        proxy: false, 
    })
);

app.use(passport.initialize());
app.use(passport.session());

//syncs the session data to our db
myStore.sync();

//setup Sequelize association
User.hasMany(Case);
Queue.belongsTo(User);
Case.belongsToMany(User, {through: Queue});
Case.hasMany(Message)
Message.belongsTo(Case)

//middleware handles all userRoutes
//middleware for our error page
app.use(userRoutes)
app.use((req, res, next) => {
    res.status(404).render(`404`, { pageTitle: `404` })
})

//initialise/sync our database/app and start event listener for our chosen port
const dbInit = async () => {
    try {     
  
        await sequelize.sync()
        
    } catch (error) {
        console.log(error)
    }
//Create an event listner on port 3000
  return app.listen(3000);
};

dbInit();