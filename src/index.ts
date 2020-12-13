import express from 'express'
import { Express } from 'express'
import './modules/mongoose/mongoose'
import articlesRouter from './routers/articles/articlesRouter'
import usersRouter from './routers/users/usersRouter'
// import cors from 'cors'

const app: Express = express()
app.use(express.json())
app.use('/api/article', articlesRouter)
app.use('/api/user', usersRouter)

export default app
