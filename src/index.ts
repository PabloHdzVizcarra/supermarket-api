import express from 'express'
import { Express } from 'express'
import './modules/mongoose/mongoose'
import articlesRouter from './routers/articles/articlesRouter'
import usersRouter from './routers/users/usersRouter'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import { defaultRoutes } from './middleware/default/default'

const app: Express = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/article', articlesRouter)
app.use('/api/user', usersRouter)

app.use('/*', defaultRoutes)
export default app
