import { getLogout, getSignIn, getSignUp } from "@/controllers/auth.controller";
import { Router } from "express";

export const router = Router()

router.post("/signup", getSignUp)
router.post("/signIn", getSignIn)
router.post("/logout", getLogout)