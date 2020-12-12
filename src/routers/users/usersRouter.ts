import express, { Router } from 'express'
import { createUser } from '../../controllers/users/createUser'
import { userValidationRules, validate } from '../../models/validator/validator'
const router: Router = express.Router()

router.post('/', userValidationRules(), validate, createUser)

export default router
