import mongoose from "mongoose";
import toJSON from "./model.plugin.js";
const { Schema } = mongoose;

const TokenSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        token: { type: String, required: true },
        createdAt: {
            type: Date, default: Date.now, expires: 300
        }
    }
);

TokenSchema.plugin(toJSON)


export const Token = mongoose.model("Token",TokenSchema);