import express, { Express, json, Request, Response } from "express"
import dotenv from "dotenv"
import { userRouter } from "./routers/userRouter"

dotenv.config()

const app: Express = express()

app.use(json())

app.get('/', (req: Request, res: Response) => {
  res.send("Express + TypeScript")
})

app.use('/api/users', userRouter)

app.listen(process.env.PORT, () => {
  console.log(`escuchando desde puerto ${process.env.PORT}`)
})