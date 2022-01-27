const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/users`);
const passport = require(`passport`);
const { route } = require("express/lib/application");

const checkAuthentificated = (req, res, next) => {
    const authString = req.isAuthenticated() ? `Logout` : `Login`;

    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.status(401).render(`errors/401`,{pageTitle: `error 401`,auth: authString});
    }

}

router.get(`/`, userController.getIndex);

router.get(`/my-queue`, checkAuthentificated, userController.getQueue);

//get requests for to retrieve login/register form views
router.get(`/login-form`, userController.getLogin);

router.get(`/register-form`, userController.getRegister);

router.get(`/logged-in`, userController.getLoggedIn);

router.get(`/logout`, userController.getLogout)

//post requests for users trying to login/ register
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/logged-in' }));

router.post(`/register`, userController.postRegister);

router.post(`/case-create`, checkAuthentificated, userController.postCase);

router.post(`/send-message`, checkAuthentificated, userController.postMessage);

router.get(`/case/:caseNo`, checkAuthentificated, userController.getCase);

module.exports = router;