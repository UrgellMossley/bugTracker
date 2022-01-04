const User = require(`../models/User.js`)

exports.getIndex = (req,res,next)=>{
   res.render(`users/index`, {
        pageTitle: `Your Tickets`,
        path: `/`
    })
}

exports.getQueue = (req,res,next) =>{
    const {firstName} = req.user
    
    res.render(`users/my-queue`, {
        pageTitle: `${firstName}'s tickets`,
        path: `/your-tickets`,
        user: req.user
    })

}
