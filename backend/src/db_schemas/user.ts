import { Schema, model } from "mongoose";
import { IUser } from "@/interfaces/user";

const schemaObj = new Schema({
    name: { type: String },
    emailId: { type: String },
    password: { type: String },
    contactNumber: { type: String },
    userSecret: { type: String },
    platformId: { type: String },
    DOB: { type: String },
    organization: { type: String },
});

export const UserSchema = model<IUser>('User', schemaObj);