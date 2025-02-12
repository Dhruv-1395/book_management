import express from 'express'
import { userRegistration,getAllUsers } from '../controller/user.controller.js';

const router = express.Router();

router.get('/get-users',getAllUsers);
router.post('/register',userRegistration)
//hello


export default router;