import express from "express";
import {login, signup, verify} from '../controllers/user.controller.js';
import {validate} from '../middlewares/validations.middleware.js'
import * as AuthValidations from '../validations/auth.validation.js'
const router = express.Router();

router.post("/login", validate(AuthValidations.login) , login );

router.post("/signup",  validate(AuthValidations.signup), signup);


router.post("/verify",  validate(AuthValidations.verify), verify );
export default router;

// client -> api -> xử lý request ở controller -> xử lý data ở db (model) => khai báo config trong configs 