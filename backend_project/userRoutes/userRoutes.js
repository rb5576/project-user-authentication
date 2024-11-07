import express from "express";
import userController from "../usercontroller/userController.js";
import checkUserAuth from "../middleware/auth_middleware.js";


const router = express.Router();

//made routes protected
router.use('/changepassword',checkUserAuth)
//http://localhost:3000/registration
//public
router.post('/registration', userController.userRegistration);
router.post('/login', userController.userLogin);
router.post('/reset-pass-email', userController.reset_pass_email);

//private
router.post('/logged',checkUserAuth, userController.userLogged);
router.post('/changepassword',  userController.changePassword);

export default router;