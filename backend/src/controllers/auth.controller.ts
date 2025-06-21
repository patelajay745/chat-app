import { User } from "@/models/auth.model";
import { ApiError } from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "@/validators/env";
import { ApiResponse } from "@/utils/apiResponse";
import cloudinary from "@/lib/cloudinary";

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'none' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const getSignUp = asyncHandler(async (req: Request, res: Response) => {
    const { email, fullName, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({ email, fullName, password })

    if (!user) {
        throw new ApiError(500, "Failed to create user")
    }

    const token = user.generateToken()

    res.cookie(env.JWT_SECRET, token, cookieOptions)

    res.status(201).json(new ApiResponse(201, "User created successfully", {
        user: { email, fullName }
    }))
})

export const getSignIn = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "Invalid credentials")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) throw new ApiError(400, "Invalid credentials")

    const token = user.generateToken()

    res.cookie("AccessToken", token, cookieOptions)

    res.status(200).json(new ApiResponse(200, "Login successful", { user: { email, fullName: user.fullName } }))
})

export const getLogout = asyncHandler(async (req: Request, res: Response) => {

    res.clearCookie("AccessToken", cookieOptions)

    res.status(200).json(new ApiResponse(200, "Logout successful", {}))
})

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { profilePic } = req.files

    if (!profilePic) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (!profilePic.mimetype?.startsWith("image")) {
        throw new ApiError(422, "Only Image is allowed");
    }

    const uploadRes = await cloudinary.uploader.upload(profilePic.filepath)

    const user = await User.findOne({ _id: req.user!.id })

    if (!user) throw new ApiError(404, "User not found")

    user.profilePic = uploadRes.secure_url

    await user.save()

    res.status(200).json(new ApiResponse(200, "Profile updated successfully", {
        user: { email: user.email, fullName: user.fullName, profilePic: user.profilePic }
    }))

})

export const getCheckAuth = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, "User is authenticated", {
        user: { email: req.user!.email, fullName: req.user!.fullName, profilePic: req.user!.profilePic }
    }))
})