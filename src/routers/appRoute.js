import express from 'express'
import userRoute from './userRoute.js'
import authRoute from './authRoute.js'

const router = express.Router();

router.use('/user',userRoute);
router.use('/auth',authRoute);
export default router

