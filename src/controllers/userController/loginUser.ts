import { getUserByEmail } from "../../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { LoginPayloadInterface } from "../../utils/interfaces/LoginPayloadInterface"


async function loginUser(payload: LoginPayloadInterface) {
  // Comprobar si existe el usuario
    const loginEmail = payload.email
    const userExist = await getUserByEmail(loginEmail)

    if (!userExist) throw new Error("User not found")

    // Comprobar contraseña correcta
    const loginPass = payload.password
    const isCorrect = await bcrypt.compare(loginPass, userExist.password)
    if (!isCorrect) throw new Error("User not found")
    
    // Generar token de inicio de sesión
    const secretKey: any = process.env.JWT_SECRET
    
    const options = {
      sub: payload.email,
      expt: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
      iat: Math.floor(Date.now() / 1000)
    }

    const token = jwt.sign(options, secretKey, {
      algorithm: 'HS256'
    })
    
    return {
      message: 'logged successfully',
      token
    }
}

export default loginUser