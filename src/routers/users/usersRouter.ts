import express, { Request, Response, Router } from 'express'
import { createUser } from '../../controllers/users/createUser'
import { userValidationRules, validate } from '../../models/validator/validator'
import { loginUser } from '../../controllers/users/loginUser'
import { authenticateToken } from '../../controllers/users/auth/authenticateToken'
const router: Router = express.Router()

router.post('/', userValidationRules(), validate, createUser)
router.post('/login', loginUser)
router.get('/autologin', authenticateToken, (req: Request, res: Response) => {
  res.json({ validate: 'user' })
})

export default router
