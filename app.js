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
//syncs the session data to our db
myStore.sync();


app.use(async (req, res, next) => {
    try {
        //dummy user, when auth/log in is developed we can select a user from db
        const user = await User.findAll()
           req.user = user[0]
        next();

    } catch (error) {
        console.log(error);
        
    }
})
//setup Sequelize association
User.hasMany(Case);
Queue.belongsTo(User);
Case.belongsToMany(User, {through: Queue});

//middleware handles all userRoutes
app.use(userRoutes)

//middleware for our error page
app.use((req,res,next)=>{
    res.status(404).render(`404`,{pageTitle:`404`})
})
//initialise our database/app and start event listener for our chosen port
const dbInit = async() => {
        try {
            //Sequelize query to go through Db to find all users
            const user = await User.findAll()
            //Use destructuring to store length of the array in a variable
            let { length } = user
            //conditional. If the array is empty create dummy user || synchronise the db
            try {
                if (length < 1) {
                    return User.create({ firstName: `George`, surname: `Edem`, email: `effiom124@bmail.com` });
                } else {
                    await sequelize.sync()
                }
            } catch (error) {
                console.log(error);
            }
            //Create an event listner on port 3000
            return app.listen(3000);
          } catch (error) {
            console.log(error)
        }

};

dbInit();