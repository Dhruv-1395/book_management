import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

export const Subject = mongoose.model('Subject',subjectSchema);