import express from "express";
import { File } from "formidable";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                fullName: string
                profilePic?: string
                createdAt?: Date
            },
            files: { [key: string]: File };
        }
    }
}

