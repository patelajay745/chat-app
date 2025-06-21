import { getMessages, getUsersForSidebar, sendMessage } from "@/controllers/message.controller"
import { fileParser } from "@/middlewares/fileParser"
import { isAuthenticated } from "@/middlewares/isAuthenticated"
import { Router } from "express"

export const router = Router()

router.use(isAuthenticated)

router.get("/users", getUsersForSidebar)
router.get("/messages/:id", getMessages)
router.post("/send/:id", fileParser, sendMessage)