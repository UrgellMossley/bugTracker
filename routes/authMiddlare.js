//Simple middlewares to provide modular control over routes

//import model modules
const Message = require("../models/Message");
const Case = require(`../models/Case`);
const User = require("../models/User");

//Simple script using is isAuthenticated() method provided by Passport framework (added onto session data) to confirm users are authentifcated or not
const checkAuthentificated = (req, res, next) => {
    const authString = req.isAuthenticated() ? `Logout` : `Login`;

    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        //render an error message if necessary
        res.status(401).render(`errors/401`, { pageTitle: `error 401`, auth: authString });
    }

}

const isAdmin = async (req,res,next)=>{
   const authString = req.isAuthenticated() ? `Logout` : `Login`;

    if (req.isAuthenticated() && req.user.isAdmin){
        //grab user from request 
        const admin = req.user;
        
        try {
            //Use model query that will allow us to search for the case no and confirm that the righ user is accessing this data 
            const allCases = await Case.findAll();
            if (!allCases) allCases = [];
            const caseArr = (allCases.map(element => element.dataValues));
            
            res.render(`admin/admin-panel`, {
                pageTitle: `admin panel`,
                 auth: authString,
                 adminData: admin,
                 caseArr: caseArr
                });
            
        } catch (error) {
            next(error);
        };
        
    } else {
        next();
    }
}

module.exports.checkAuthentificated = checkAuthentificated;
module.exports.isAdmin = isAdmin;