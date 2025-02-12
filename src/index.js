import dotenv from 'dotenv'
import { app } from './app.js'
import connectDb from './Db/db.config.js'

dotenv.config()

const port = process.env.PORT

connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`server running at ${port}`);
        
    })
})



