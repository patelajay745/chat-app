import { z } from "zod"

export const createUserSchema = z.object({
    email: z.string().email(),
    fullName: z.string().min(3, { message: "First Name is required" }),
    password: z.string().min(6, { message: "Password is required" }),
    profilePic: z.string().optional()
})

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Minimum 6 characters are required" })
})