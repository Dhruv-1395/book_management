import express from 'express'
import cors from 'cors'
import appRoute from './routers/appRoute.js'


const app = express();

//miidlewares

app.use(cors());
app.use(express.json())


//router

app.use('/api',appRoute);



export {app}