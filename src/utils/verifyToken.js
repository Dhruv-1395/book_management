import crypto from 'crypto'

const genrateVerifyToken = () =>{
    return crypto.randomBytes(16).toString('hex');
}

export default genrateVerifyToken