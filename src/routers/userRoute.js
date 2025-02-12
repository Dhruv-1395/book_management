import express from 'express'
import { userRegistration } from '../controller/user.controller.js';

const router = express.Router();

router.get('/get-users');
router.post('/register',userRegistration)


export default router;