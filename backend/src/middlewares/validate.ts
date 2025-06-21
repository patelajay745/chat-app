import { ApiError } from "@/utils/apiError"
import { NextFunction, Request, Response } from "express"
import { z } from "zod"

export const validate = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body)
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                next(new ApiError(400, error.errors[0].message))

            }
            next(new ApiError(500, "Internal Server Error"))
        }
    }
}