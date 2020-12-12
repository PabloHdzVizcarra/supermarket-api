import express from 'express'
import { Express } from 'express'
import './modules/mongoose/mongoose'
import articlesRouter from './routers/articlesRouter'
import usersRouter from './routers/users/usersRouter'

const app: Express = express()
app.use(express.json())
app.use('/api/article', articlesRouter)
app.use('/api/user', usersRouter)

export default app
