const Message = require("../models/Message");

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
        const { caseNo, caseDescription, title, priority, status, updatedAt } = searchedCase[0].dataValues

        const caseMessages = await Message.findAll({
            where: {
                CaseCaseNo: caseNo
            }
        })
        if (!caseMessages) caseMessages = [];
        console.log(caseMessages,`dsfdffdfd`)
        
        //render a dynamic template passing in the data from our database
        res.render(`users/view-case`, {
            pageTitle: `Case ${caseNo}`,
            caseNo: caseNo,
            caseDesc: caseDescription,
            caseMessages: caseMessages,
            messages: messaages,
            caseTitle: title,
            casePriority: priority,
            caseStatus: status,
            caseUpated: updatedAt
        })
    } catch (error) {
        console.log(error)
    }

}
