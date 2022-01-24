const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/users`);

router.get(`/`, userController.getIndex);

router.get(`/my-queue`, userController.getQueue);

router.post(`/case-create`, userController.postCase);

router.post(`/send-message`, userController.postMessage);

router.get(`/case/:caseNo`, userController.getCase);

module.exports = router;