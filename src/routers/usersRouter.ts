import express, { Router } from "express";
import { createUser } from "../controllers/users/createUser";
const router: Router = express.Router()

router.post('/', createUser)

export default router
