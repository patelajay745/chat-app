import express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                fullName: string
                profilePic?: string
            }
        }
    }
}

