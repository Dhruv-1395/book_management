import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";

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
            _id:this._id,
            isAdmin:this.isAdmin
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRED}
    )
    return token;
}

export const User = mongoose.model("users",UserSchema);