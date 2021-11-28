import dotenv from "dotenv"
import express from "express"
import { Application, Request, Response } from "express"
import api from "../routes/api";

dotenv.config()

export const app: Application = express()

app.get("/", (req: Request, res: Response): void => { res.sendFile(`${__dirname}/index.html`) })
app.use('/api', api)