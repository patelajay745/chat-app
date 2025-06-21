import { NextFunction, Request, Response } from "express"
import { ApiError } from "@/utils/apiError"
import jwt from "jsonwebtoken"
import { asyncHandler } from "@/utils/asyncHandler"
import { User } from "@/models/auth.model"

export const isAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.AccessToken

    if (!token) token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }

    const { id } = await jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

    if (!id) {
        throw new ApiError(401, "Unauthorized")
    }

    const user = await User.findById(id)

    if (!user) {
        throw new ApiError(401, "Unauthorized")
    }

    req.user = { id, email: user.email, fullName: user.fullName, profilePic: user.profilePic }

    next()
})