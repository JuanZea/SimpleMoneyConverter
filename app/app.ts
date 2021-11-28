import express, { Application, Request, Response } from "express"
import api from "../routes/api";

export const app: Application = express()

app.get("/", (req: Request, res: Response): void => { res.sendFile(`${__dirname}/index.html`) })
app.use('/api', api)
