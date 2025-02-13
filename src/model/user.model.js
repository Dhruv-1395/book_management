import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";
import toJSON from "./model.plugin.js";
import { config } from "../config/config.js";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVarify:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
    next();
});

UserSchema.methods.verifyPassword = async function(password){
    const result = await bcrypt.compare(password,this.password);
    return result;
}

UserSchema.methods.genrateAccessToken = async function(){
    const token = await jwt.sign(
        {
            id:this._id,
            isAdmin:this.isAdmin
        },
        config.jwtSecret,
        {expiresIn:config.jwtExpiresIn}
    )
    return token;
}

UserSchema.plugin(toJSON);

export const User = mongoose.model("users",UserSchema);