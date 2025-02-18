import express from 'express'
import userRoute from './userRoute.js'
import authRoute from './authRoute.js'
import subjectRoute from './subjectRoute.js'
const router = express.Router();

router.use('/user',userRoute);
router.use('/auth',authRoute);
router.use('/subject',subjectRoute)
export default router

