import { Request, Response } from "express"
import { createUser, getUsers, getUserByEmail} from "../models/user.model"
import { UserInterface } from "../utils/interfaces/UserInterface"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { create } from "domain"

dotenv.config()

export const userController = {
  getAll: async (req: Request, res: Response) => {
    const allUsers: UserInterface[] = await getUsers()
    res.json({allUsers})
  },
  create: async (req: Request, res: Response) => {
    // Comprobar que el email no existe ya
    const createEmail = req.body.email
    const exist = await getUserByEmail(createEmail)
    if (exist) throw new Error('Ya existe una cuenta con esta dirección de correo.')

    // hashear contraseña del usuario
    const saltRounds = await bcrypt.genSalt()
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    // crear con contraseña hasheada
    const newUser: UserInterface = {
      ...req.body,
      password: hashedPassword
    }
    await createUser(newUser)
    // respuesta
    res.status(201).json({
      message: "User created",
      user: newUser
    })
  },
  login: async (req: Request, res: Response) => {
    // Comprobar si existe el usuario
    const loginEmail = req.body.email
    const userExist = await getUserByEmail(loginEmail)

    if (!userExist) throw new Error("User not found")

    // Comprobar contraseña correcta
    const loginPass = req.body.password
    const isCorrect = await bcrypt.compare(loginPass, userExist.password)
    if (!isCorrect) throw new Error("User not found")
    
    // Generar token de inicio de sesión
    const secretKey: any = process.env.JWT_SECRET
    const payload = {
      sub: req.body.email,
      expt: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
      iat: Math.floor(Date.now() / 1000)
    }

    const token = jwt.sign(payload, secretKey, {
      algorithm: 'HS256'
    })
    
    res.json({
      message: 'logged successfully',
      token
    })
  }
}
