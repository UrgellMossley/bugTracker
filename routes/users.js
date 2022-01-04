const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/users`);

router.get(`/`, userController.getIndex);

router.get(`/my-queue`, userController.getQueue);

module.exports = router;