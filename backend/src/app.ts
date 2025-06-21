import express, { Express } from "express";
const app: Express = express()

app.use(express.json())
app.get("/", (req, res) => {
    res.status(200).json("It is up and running...")
})

// import all the routes here
import { router as authRouter } from "@/routes/auth.route"

app.use("/api/v1/auth", authRouter)

export default app