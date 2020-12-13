import express, { Router } from 'express'
import { createUser } from '../../controllers/users/createUser'
import { userValidationRules, validate } from '../../models/validator/validator'
import { loginUser } from '../../controllers/users/loginUser'
const router: Router = express.Router()

router.post('/', userValidationRules(), validate, createUser)
router.post('/login', loginUser)

export default router
