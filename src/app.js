import express, { urlencoded } from 'express'
import cors from 'cors'
import appRoute from './routers/appRoute.js'
import cookieParser from 'cookie-parser';


const app = express();

//miidlewares

app.use(cors());
app.use(express.json())
app.use(urlencoded({ extended:true}))
app.use(cookieParser())


//router

app.use('/api',appRoute);



export {app}