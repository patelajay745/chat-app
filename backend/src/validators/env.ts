import { z } from "zod"

const envSchema = z.object({
    PORT: z.string().optional(),
    BASEURL: z.string().min(1, { message: "Base is required" }),
    MONGO_URI: z.string().min(1, { message: "MONGO_URI is required" }),
    JWT_SECRET: z.string().min(1, { message: "JWT_SECRET is required" }),
    CLOUDINARY_CLOUD_NAME: z.string().min(1, { message: "JWT_SECRET is required" }),
    CLOUDINARY_API_SECRET: z.string().min(1, { message: "CLOUDINARY_API_SECRET is required" }),
    CLOUDINARY_API_KEY: z.string().min(1, { message: "CLOUDINARY_API_KEY is required" })
})
function createENV(env: NodeJS.ProcessEnv) {
    const validationResult = envSchema.safeParse(env)

    if (!validationResult.success) {
        throw new Error(validationResult.error.message)
    }

    return validationResult.data
}

export const env = createENV(process.env)