import app from './index'
import { Request, Response } from "express";
import { LogRoute } from "./modules/debug-logs/debug";

const port: string | number = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  LogRoute('get "/"')
  res.json({
    success: 'Api is run congratulations'
  })
})

app.listen(port, () => {
  console.log(`app is run in port ${port}`)
})