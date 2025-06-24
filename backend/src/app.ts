import express, { Express } from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import { env } from "@/validators/env"

const app: Express = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.status(200).json("It is up and running...")
})

// import all the routes here
import { router as authRouter } from "@/routes/auth.route"
import { errorHandler } from "./middlewares/errorHandler";
import { router as messageRouter } from "@/routes/message.route"

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/message", messageRouter)

app.use(errorHandler)

export default app