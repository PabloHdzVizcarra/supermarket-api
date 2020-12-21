import express, { Router } from 'express'
import { createArticle } from '../../controllers/articles/create-article/createArticle'
import {
  articleValidationRules,
  validate,
} from '../../models/validator/validator'
import { saveArticleInUser } from '../../controllers/articles/saved-article/saveArticleInUser'
import { deleteData } from '../../controllers/articles/delete-article/deleteData'
const router: Router = express.Router()

router.post(
  '/',
  articleValidationRules(),
  validate,
  saveArticleInUser,
  createArticle,
)

router.delete('/:idDocument', deleteData)
export default router
