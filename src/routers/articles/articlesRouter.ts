import express, { Router } from 'express'
import { createArticle } from '../../controllers/articles/create-article/createArticle'
import {
  articleValidationRules,
  validate,
} from '../../models/validator/validator'
const router: Router = express.Router()

router.post('/', articleValidationRules(), validate, createArticle)

export default router
