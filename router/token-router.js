const express = require("express");
const authenticationController = require("../controller/authentication-controller");

const router = express.Router();

router.post("/generate-secret", authenticationController.generateSecret);
router.post("/verify-token/:id", authenticationController.verifyToken);

module.exports = router;
