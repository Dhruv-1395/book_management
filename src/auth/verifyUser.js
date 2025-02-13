import { config } from "../config/config.js";
import { Token } from "../model/token.model.js";
import { User } from "../model/user.model.js";
import { notFoundResponse,errorResponse } from "../utils/apiResponse.js";

export const verifyUser = async (req,res) =>{
    try {
        const { token } = req.query
        const checktoken = await Token.findOne({ token }).populate('userId');
        if (!checktoken) {
          return notFoundResponse(res, 'Invalid Token! , Login To Generate New one')
        }
        console.log(checktoken);
        
        const user = await User.findById(checktoken.userId._id);
        user.isVarify = true
        await user.save();
        await Token.findByIdAndDelete(checktoken._id);
        const redirectUrl = config.app_url;
        return res.redirect(redirectUrl);
      } catch (error) {
        return errorResponse(res, error.message);
      }
}