import { User } from "../model/user.model.js";
import { errorResponse,successResponse,successResponseWithData } from "../utils/apiResponse.js";

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
       
        return successResponse(res,"user created.");


    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const getAllUsers = async (_, res) => {
    try {

        const data = await User.find().select('-password');
        if (!data) {
            return notFoundResponse(res, 'no data avialable');
        }

        return successResponseWithData(res, 'data found', data);

    } catch (error) {
        return errorResponse(res, error.message);
    }
}