import { Router } from "express";
import { userController } from "../controllers/userController";

export const userRouter = Router()

userRouter.get("/getAll", userController.getAll)
userRouter.post("/create", userController.create)
userRouter.post("/login", userController.login)