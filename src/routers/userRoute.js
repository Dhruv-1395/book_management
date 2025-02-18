import express from 'express'
import { getAllUsers } from '../controller/user.controller.js';
import { adminAuthenticate } from '../middleware/authentication.js';

const router = express.Router();

router.get('/get-users',adminAuthenticate,getAllUsers);




export default router;