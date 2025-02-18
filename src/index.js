import dotenv from 'dotenv'
import { app } from './app.js'
import connectDb from './Db/db.config.js'
import { config } from './config/config.js'

dotenv.config()


connectDb().then(()=>{
    app.listen(config.PORT,()=>{
        console.log(`server running at ${config.PORT}`);
        
    })
})



