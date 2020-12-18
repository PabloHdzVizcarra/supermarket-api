import express, { Router } from 'express'
import { createArticle } from '../../controllers/articles/create-article/createArticle'
import {
  articleValidationRules,
  validate,
} from '../../models/validator/validator'
import { saveArticleInUser } from '../../controllers/articles/saved-article/saveArticleInUser'
const router: Router = express.Router()

router.post(
  '/',
  articleValidationRules(),
  validate,
  saveArticleInUser,
  createArticle,
)

export default router
