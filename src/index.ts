import express from 'express'
import { Express } from "express"
import './modules/mongoose/mongoose'
import articlesRouter from "./routers/articlesRouter"

const app: Express = express()
app.use(express.json())
app.use('/api/article', articlesRouter)

export default app