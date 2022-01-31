//import modules from db and also util folder to allow us to send emails 
const User = require(`../models/User.js`)
const Queue = require(`../models/Queues.js`);
const Case = require("../models/Case.js");
const Message = require(`../models/Message.js`)
const Transporter = require(`../util/email.js`)
const genPassword = require(`../util/passwordUtils`).genPassword;
const passport = require(`passport`);
const { isAdmin } = require("../routes/authMiddlare.js");
require(`../util/passport`);


//render index page
exports.getIndex = (req,res,next)=>{

   res.render(`users/index`, {
        pageTitle: `Your Tickets`,
        path: `/`,
       auth: req.isAuthenticated() ? `Logout` : `Login`


    })
}
//middleware to render stored db data for a chosen user
exports.getQueue = async(req,res,next) =>{

    //store test user in a variable and use magic method to query associated Tickets
    try {
        const user = await req.user;
        const userCases = await user.getCases()
         
        if (!userCases){
            userCases = []
        }
        //render dynamic template with passed in db data
        res.render(`users/my-queue`, {
            pageTitle: `${user.firstName}'s tickets`,
            path: `/your-tickets`,
            user: user,
            cases: userCases,
            auth: req.isAuthenticated() ? `Logout` : `Login`


        });
    } catch (error) {
        next(error);
    };
 
};
exports.getCase = async (req, res, next) => {
    try {
      //Use model query that will allow us to search for the case no and confirm that the righ user is accessing this data 
      const searchedCase = await Case.findOne({
            where: {
                //req.params is passed through our anchor tag
                caseNo: req.params.caseNo    
            }
        })
        const allMessages = await Message.findAll({
            where: {
                CaseCaseNo: req.params.caseNo
            }

      })
        if (!allMessages){
            allMessages = []
        }
        const { caseNo, caseDescription, title, priority, status, updatedAt} = searchedCase.dataValues
        //render a dynamic template passing in the data from our database
        res.render(`users/view-case`,{
            pageTitle: `Case ${caseNo}`,
            caseNo: caseNo,
            caseDesc: caseDescription,
            caseTitle: title,
            caseMessages: allMessages,
            casePriority: priority,
            caseStatus: status,
            caseUpated: updatedAt,
            admin: req.user.isAdmin,
            auth: req.isAuthenticated() ? `Logout` : `Login`

        })
    } catch (error) {
        console.log(error)
        next(error)
    }

}


//middleware to for /create-case route which creates a case and adds it to a queue for a user
exports.postCase = async (req, res, next) => {
    //grab user from request 
    const user = await req.user;
    //use destructuring to pull variables out of request body passed in from Form POST request in template
    const { caseTitle,caseDescription,priority } = req.body
    //Error handling, sets queue to empty arr if any issues
    const userQueue = await Queue.findAll({where:{
        userId: user.id
    }})
    //TryCatch block which handles case creation methods, using Models defined in models dir
            try {
                if (!userQueue){
                      userQueue = []  
                }
                //creates a case and stores in a variable
                let userCase = await Case.create({
                    caseDescription: caseDescription,
                    title: caseTitle,
                    priority: priority,
                    UserId: user.id
                })
                //adds select data from case variable to Queue model for use later
                await Queue.create({
                    UserId: userCase.UserId,
                    caseNo: userCase.caseNo
                })
                //redirect to the page with updated data
                res.redirect(`/my-queue`)
            } catch (error) {
                next(error)
            }
            
        }
  
//middleware to allow users to post messages, at this time this also alerts via email
exports.postMessage = async (req,res,next)=>{
  
   const {message,caseNo,facingValue} = req.body
   
   try {
       //Queries to id which case and user we are sending data from.
       const selectedCase = await Case.findAll({where:{caseNo: caseNo}})
       const caseOwner = await User.findAll({
           where: {
               id: selectedCase[0].dataValues.UserId
           }
       });
       const normalisedUser = caseOwner[0].dataValues
    //middleware to create a Message object in our db
     await Message.create({
        messages: message,
        CaseCaseNo: caseNo,
        facing: facingValue    
    });
    //passing in the information from message and case/user queries into the email which are sent out
    await Transporter.sendMail({
        from: "sender@server.com",
        to: "effiom123@gmail.com",
        subject: `New message from case: ${caseNo}`,
        text: message,
        html: `<h1>Hi ${normalisedUser.firstName}</h1>
        <h2>You have a new update from case ${caseNo}</h2>
        <p>"${message}"</p>
        <p>Please click: <a href="http://localhost:3000/case/${caseNo}">here</a>, to see the latest updates</p>`

    })

    res.redirect(`/my-queue`);

} catch (error) {
       console.log(error)
       next(error)
   }

}
//get request for login page
exports.getLogin =(req,res,next)=>{

    res.render(`users/login-form`,{
        pageTitle: `Login!`,
        path: `users/login`,
        auth: req.isAuthenticated() ? `Logout` : `Login`,
        errorMsg: false

    });
}
//get request middleware that serves up registration form for new users
exports.getRegister = (req, res, next) => {

    res.render(`users/register-form`, {
        pageTitle: `Register!`,
        path: `/register-form`,
        auth: req.isAuthenticated() ? `Logout` : `Login`

    });
}

exports.getLoggedIn = async (req,res,next) =>{

    res.render(`users/login-redirect`,{
        pageTitle: `log in successful`,
        user: await req.user,
        auth: req.isAuthenticated() ? `Logout` : `Login`
    })
}

exports.getLogout = (req,res,next)=>{
    req.logout();
    res.redirect(`/`);
};

exports.postRegister = async (req, res, next) => {
    const { username, email, firstName, surname, password } = req.body;
    const saltHash = genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    try {
        //use sequelize magic function to generate a new user with passed in information
         await User.create({
            username: username,
            email: email,
            firstName: firstName,
            surname: surname,
            hash: hash,
            salt: salt,
            admin: true
        });
        res.redirect(`users/login-form`);
    } catch (error) {
        console.log(error);
        next(error);
    }
    
}
exports.getLoginFailure = (req,res,next) =>{
    res.render(`users/login-form`, {
        pageTitle: `Login!`,
        path: `users/login`,
        errorMsg: true,
        auth: req.isAuthenticated() ? `Logout` : `Login`

    });
}
//post request that validates login, derived from our password config file 
exports.postLogin = (req, res, next) => {
    //function that returns failure bool or user and passes that user with request to next middleware
   passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/logged-in' });
}