exports.getIndex = (req,res,next)=>{
   res.render(`users/index`, {
        pageTitle: `Your Tickets`,
        path: `/`
    })
}

