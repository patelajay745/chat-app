import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";

export const getSignUp = asyncHandler(async (req: Request, res: Response) => { })

export const getSignIn = asyncHandler(async (req: Request, res: Response) => {
    res.send("reched")
})

export const getLogout = asyncHandler(async (req: Request, res: Response) => { })