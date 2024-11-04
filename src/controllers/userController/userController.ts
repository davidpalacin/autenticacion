import { Request, Response } from "express"
import createOne from "./createOne"
import getAllUsers from "./getAllUsers"
import loginUser from "./loginUser"
import deleteUser from "./deleteUser"

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
  },
  delete: async (req: Request, res: Response) => {
    const payload = { ...req.query, ...req.body }
    const result = await deleteUser(payload)
    res.json(result)
  }
}
