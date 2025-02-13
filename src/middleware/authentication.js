import jwt from 'jsonwebtoken'
import { validationError } from '../utils/apiResponse.js';
import { User } from '../model/user.model.js';
import { config } from '../config/config.js';


export const adminAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            return validationError(res,"Unauthorized request")
        }

        const decodedToken = jwt.verify(token,config.jwtSecret);

        const user = await User.findById(decodedToken?.id).select("-password");

        if(!user.isAdmin){
            return validationError(res,"Access denied!")
        }
        next();
        
    } catch (error) {
        return errorResponse(res,"something went wrong!");
    }
}