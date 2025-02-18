import express from 'express'
import { adminAuthenticate } from '../middleware/authentication.js';
import { addSubject, getSubject } from '../controller/subject.controller.js';

const router = express.Router();

router.use(adminAuthenticate);

router.post('/add-subject',addSubject);
router.get('/get-subject',getSubject);

export default router