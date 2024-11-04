import { Request, Response } from "express"
import dotenv from "dotenv"
import createOne from "./createOne"
import getAllUsers from "./getAllUsers"
import loginUser from "./loginUser"

dotenv.config()

export const userController = {
  getAll: async (req: Request, res: Response) => {
    const result = await getAllUsers()
    res.json(result)
  },
  create: async (req: Request, res: Response) => {
    const payload = { ...req.body }
    const result = await createOne(payload)
    res.json(result)
  },
  login: async (req: Request, res: Response) => {
    const payload = { ...req.body }
    const result = await loginUser(payload)
    res.json(result)
  }
}
