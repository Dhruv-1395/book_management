import { config } from "../config/config.js";
import sendMail from "../mail/sendMail.js";
import { Token } from "../model/token.model.js";
import { User } from "../model/user.model.js";
import { errorResponse,successResponse,successResponseWithData,notFoundResponse, validationError } from "../utils/apiResponse.js";
import genrateVerifyToken from "../utils/verifyToken.js";

export const userRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (
            [username, email, password].some((feild) => feild.trim() === "")
        ) {
            return errorResponse(res, 'All feilds are required!');
        }

        const isExist = await User.findOne({ email });

        if (isExist) {
            return validationError(res, 'User already exist!');
        }

       const newUser = await User.create({
            username,
            email,
            password,
        })

        const token = genrateVerifyToken();
        await Token.create({
            userId:newUser.id,
            token
        })
         let verifylink = `${config.api_url}/api/auth/verify?token=${token}`
         await sendMail(email,verifylink);
        return successResponse(res,`User registered successfully, Verification mail send to ${email}`);


    } catch (error) {
        return errorResponse(res, error.message);
    }
}


export const loginUser = async (req,res) =>{
    try {
        const { email, password } = req.body;
  
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          return notFoundResponse(res, 'User Not Found');
        }
        // Check if the password is correct
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
          return validationError(res, 'Invalid Password');
        }
        if (!user.isVarify) {
          const verifytoken = genrateVerifyToken();
          await Token.create({
            userId: user._id,
            token: verifytoken
          })
          let verifylink = `http://localhost:5000/api/auth/verify?token=${verifytoken}`

        //   let verifylink = `${process.env.API_URL}/api/auth/verify?token=${verifytoken}`
          await sendMail(email,verifylink)
          return validationError(res, 'Please Verify Your Account!,Verification Mail Send To Your Email');
        }
  
        // Generate a JWT token
        const token = await user.genrateAccessToken();
  
        // Return user data, token, and expiration time in the response
        const options = {
            httpOnly: true,
            secure:true
        }

        return res
        .status(200)
        .cookie('accessToken',token,options)
        .json({message:"Login successfull.",token});;
      } catch (error) {
        return errorResponse(res, error.message);
      }
}

export const getAllUsers = async (_, res) => {
    try {

        const data = await User.find().select('-password');
        if (data.length === 0) {
            return notFoundResponse(res, 'no data avialable');
        }

        return successResponseWithData(res, 'data found', data);

    } catch (error) {
        return errorResponse(res, error.message);
    }
}