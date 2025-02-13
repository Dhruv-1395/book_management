import express from 'express'
import { userRegistration,getAllUsers, loginUser } from '../controller/user.controller.js';
import { validateLoginUser, validateUser } from '../utils/validation.js';
import { adminAuthenticate } from '../middleware/authentication.js';

const router = express.Router();

router.get('/get-users',adminAuthenticate,getAllUsers);
router.post('/register',validateUser,userRegistration);
router.post('/login',validateLoginUser,loginUser)



export default router;