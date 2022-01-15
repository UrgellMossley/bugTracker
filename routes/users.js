const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/users`);

router.get(`/`, userController.getIndex);

router.get(`/my-queue`, userController.getQueue);

router.post(`/case-create`, userController.postCase);


module.exports = router;