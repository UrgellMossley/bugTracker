const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/users`);
const passport = require(`passport`);

router.get(`/`, userController.getIndex);

router.get(`/my-queue`, userController.getQueue);

//get requests for to retrieve login/register form views
router.get(`/login-form`, userController.getLogin);

router.get(`/register-form`, userController.getRegister);

//post requests for users trying to login/ register
router.post(`/login`, passport.authenticate(`local`), userController.postLogin);

router.post(`/register`, userController.postRegister);

router.post(`/case-create`, userController.postCase);

router.post(`/send-message`, userController.postMessage);

router.get(`/case/:caseNo`, userController.getCase);

module.exports = router;