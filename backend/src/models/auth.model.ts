import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

interface UserType extends Document {
    email: string,
    fullName: string,
    password: string,
    profilePic: string
}

interface Methods {
    comparePassword: (password: string) => Promise<boolean>
    generateToken: () => string
}

const userSchema = new mongoose.Schema<UserType, {}, Methods>({
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

userSchema.methods.comparePassword = async function (password: string,) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this!._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" })
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const User = mongoose.model("User", userSchema)