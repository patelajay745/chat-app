import { getCheckAuth, getLogout, getSignIn, getSignUp, updateProfile } from "@/controllers/auth.controller";
import { fileParser } from "@/middlewares/fileParser";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { validate } from "@/middlewares/validate";
import { createUserSchema, loginUserSchema } from "@/validators/validationSchemas";
import { Router } from "express";

export const router = Router()

router.post("/signup", validate(createUserSchema), getSignUp)
router.post("/signin", validate(loginUserSchema), getSignIn)
router.post("/logout", isAuthenticated, getLogout)

router.get("/check", isAuthenticated, getCheckAuth)

router.patch("/update-profile", isAuthenticated, fileParser, updateProfile)