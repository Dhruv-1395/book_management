import { User } from "../model/user.model.js";
import { errorResponse,successResponse } from "../utils/apiResponse.js";

export const userRegistration = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body

        if (
            [username, email, password, phone].some((feild) => feild.trim() === "")
        ) {
            return errorResponse(res, 'All feilds are required!');
        }

        const isExist = await User.findOne({ email });

        if (isExist) {
            return errorResponse(res, 'User already exist!');
        }

        await User.create({
            username,
            email,
            password,
            phone
        })
       
        return successResponse(res,"otp send,check your email.");


    } catch (error) {
        return errorResponse(res, error.message);
    }
}
