const User = require(`../models/User.js`)
const Queue = require(`../models/Queues.js`);
const Case = require("../models/Case.js");
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
         
        console.log(testUser.id)
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
        console.log(error);
    };
 
};
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
                let userCase = await Case.create({
                    caseDescription: caseDescription,
                    title: caseTitle,
                    priority: priority,
                    UserId: testUser.id
                })
                await Queue.create({
                    UserId: userCase.UserId,
                    caseNo: userCase.caseNo
                })
                res.redirect(`/my-queue`)
            } catch (error) {
                console.log(error)
            }
            
        }
  