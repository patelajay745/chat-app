import mongoose, { Document } from "mongoose";

interface User extends Document {
    email: String,
    fullName: string,
    password: string,
    profilePic: string
}

const userSchema = new mongoose.Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ''
    }
}, { timestamps: true })

export const User = mongoose.model<User>("User", userSchema)