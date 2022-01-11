const User = require(`../models/User.js`)
const Queue = require(`../models/Queues.js`)
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
        try {
            let userQueue = await testUser.getQueue();
           if (!userQueue){
                userQueue = []
            }
        } catch (error) {
            console.log(error)
        }
         
        //render dynamic template with passed in db data
        res.render(`users/my-queue`, {
            pageTitle: `${testUser.firstName}'s tickets`,
            path: `/your-tickets`,
            user: testUser,
            queue: userQueue
        });
    } catch (error) {
        console.log(error);
    };
};
