import express, { Router } from 'express'
import { createArticle } from '../../controllers/articles/create-article/createArticle'
import {
  articleValidationRules,
  validate,
} from '../../models/validator/validator'
import { saveArticleInUser } from '../../controllers/articles/saved-article/saveArticleInUser'
import { deleteData } from '../../controllers/articles/delete-article/delete-data'
import { deleteDataUser } from '../../controllers/users/delete_data_in_user/delete-data-user'
import { authenticateToken } from '../../controllers/users/helpers/authenticateToken'
const router: Router = express.Router()
// article/

router.post(
  '/',
  articleValidationRules(),
  validate,
  authenticateToken,
  saveArticleInUser,
  createArticle,
)

router.delete('/', deleteDataUser, deleteData)
export default router
