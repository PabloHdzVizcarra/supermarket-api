import express, { Router } from 'express'
import { createUser } from '../../controllers/users/createUser'
import {
  loginValidationRules,
  userIDValidationRules,
  userValidationRules,
  validate,
} from '../../models/validator/validator'
import { loginUser } from '../../controllers/users/loginUser'
import { authenticateToken } from '../../controllers/users/helpers/authenticateToken'
import { authUser } from '../../controllers/users/authUser'
import { getUser } from '../../controllers/users/getUser'
const router: Router = express.Router()

router.post('/', userValidationRules(), validate, createUser)
router.post('/login', loginValidationRules(), validate, loginUser)
router.get('/autologin', authenticateToken, authUser)
router.get('/:idUser', userIDValidationRules(), validate, getUser)

export default router
