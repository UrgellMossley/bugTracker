//import modules from db and also util folder to allow us to send emails 
const User = require(`../models/User.js`)
const Queue = require(`../models/Queues.js`);
const Case = require("../models/Case.js");
const Message = require(`../models/Message.js`)
const Transporter = require(`../util/email.js`)
//render index page
exports.getIndex = (req,res,next)=>{
   res.render(`users/index`, {
        pageTitle: `Your Tickets`,
        path: `/`
    })
}
//middleware to render stored db data for a chosen user
exports.getQueue = async(req,res,next) =>{
    //store test user in a variable and use magic method to query associated Tickets
    try {
        const testUser = await req.user;
        const userCases = await testUser.getCases()
         
        if (!userCases){
            userCases = []
        }
        //render dynamic template with passed in db data
        res.render(`users/my-queue`, {
            pageTitle: `${testUser.firstName}'s tickets`,
            path: `/your-tickets`,
            user: testUser,
            cases: userCases,
        });
    } catch (error) {
        next(error);
    };
 
};
exports.getCase = async (req, res, next) => {
    //grab user from request 
    const testUser = await req.user;
    try {
      //Use model query that will allow us to search for the case no and confirm that the righ user is accessing this data 
      const searchedCase = await Case.findAll({
            where: {
                //req.params is passed through our anchor tag
                caseNo: req.params.caseNo,
                UserId: testUser.id            
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
        const { caseNo, caseDescription, title, priority, status, updatedAt} = searchedCase[0].dataValues
        //render a dynamic template passing in the data from our database
        res.render(`users/view-case`,{
            pageTitle: `Case ${caseNo}`,
            caseNo: caseNo,
            caseDesc: caseDescription,
            caseTitle: title,
            caseMessages: allMessages,
            casePriority: priority,
            caseStatus: status,
            caseUpated: updatedAt
        })
    } catch (error) {
        console.log(error)
        next(error)
    }

}


//middleware to for /create-case route which creates a case and adds it to a queue for a user
exports.postCase = async (req, res, next) => {
    //grab user from request 
    const testUser = await req.user;
    //use destructuring to pull variables out of request body passed in from Form POST request in template
    const { caseTitle,caseDescription,priority } = req.body
    //Error handling, sets queue to empty arr if any issues
    const userQueue = await Queue.findAll({where:{
        userId: testUser.id
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
                    UserId: testUser.id
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
    /
    res.redirect(`/my-queue`);

} catch (error) {
       console.log(error)
       next(error)
   }

}