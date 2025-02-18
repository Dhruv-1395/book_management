import { Subject } from "../model/subject.model.js";
import { notFoundResponse, successResponse, successResponseWithData } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const addSubject = asyncHandler(async(req,res)=>{
    const {subjectname} = req.body;
    await Subject.create({name:subjectname});
    return successResponse(res,"Subject added.")

})

export const getSubject = asyncHandler(async(req,res)=>{
    const data = await Subject.find();
    if(data.length === 0){
        return notFoundResponse(res,"No any subject.")
    }
    return successResponseWithData(res,"data found.",data)
})