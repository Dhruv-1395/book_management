import express from 'express'
import { verifyUser } from '../auth/verifyUser.js';

const router = express.Router();

router.get('/verify',verifyUser)

export default router;