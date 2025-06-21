import cloudinary from "@/lib/cloudinary"
import { User } from "@/models/auth.model"
import { Message } from "@/models/message.model"
import { ApiResponse } from "@/utils/apiResponse"
import { asyncHandler } from "@/utils/asyncHandler"
import { Request, Response } from "express"

export const getUsersForSidebar = asyncHandler(async (req: Request, res: Response) => {

    const users = await User.find({ _id: { $ne: req.user!.id } })

    res.status(200).json(new ApiResponse(200, "Users fetched successfully", {
        users: users.map((user) => ({
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic
        }))
    }))
})

export const getMessages = asyncHandler(async (req: Request, res: Response) => {

    const { id: otherUserId } = req.params
    const myId = req.user!.id

    const messages = await Message.find({
        $or: [{ senderId: myId, receiverId: otherUserId }, { senderId: otherUserId, receiverId: myId }]
    }).sort({ createdAt: 1 })

    res.status(200).json(new ApiResponse(200, "Messages fetched successfully", messages))
})

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { id: otherUserId } = req.params
    const myId = req.user!.id

    const { text, image } = req.body

    let imageUrl = null

    if (image) {
        const uploadRes = await cloudinary.uploader.upload(image.filepath)
        imageUrl = uploadRes.secure_url
    }

    const message = await Message.create({ senderId: myId, receiverId: otherUserId, text, image: imageUrl })

    res.status(200).json(new ApiResponse(200, "Message sent successfully", message))
})