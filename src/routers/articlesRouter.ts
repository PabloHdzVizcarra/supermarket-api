import express, { Router } from "express"
import { createArticle } from "../controllers/articlesController"
const router: Router = express.Router()

router.post('/', createArticle)

export default router