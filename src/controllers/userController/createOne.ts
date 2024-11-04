import { createUser, getUserByEmail } from "../../models/user.model"
import bcrypt from "bcrypt"
import { CreateOnePayloadInterface } from "../../utils/interfaces/CreateOnePayloadInterface"

async function createOne (payload: CreateOnePayloadInterface) {
  // Comprobar que el email no existe ya
    const userEmail = payload.email
    const exist = await getUserByEmail(userEmail)
    if (exist) throw new Error('Ya existe una cuenta con esta dirección de correo.')

    // hashear contraseña del usuario
    const saltRounds = await bcrypt.genSalt()
    const password = payload.password
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    // crear con contraseña hasheada
    const newUser: any = {
      ...payload,
      password: hashedPassword
    }
    await createUser(newUser)
    // respuesta
    return {
      message: "User created",
      user: newUser
    }
}

export default createOne