const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');
const authController = require('../../controllers/auth.controller');
const { createUserSchema, loginSchema} = require("../../helpers/validation/auth.validation");

router.post('/register', validate(createUserSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);     

module.exports = router;