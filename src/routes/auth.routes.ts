import { Router } from 'express'
import { Login, Register } from '../controllers/auth.controller'
import { schemaValidator } from '../middlewares/schemaValidator.middleware';
import { LoginSchema, RegisterSchema } from '../schemas/auth.schema'

const router = Router()

router.post('/signin', schemaValidator(LoginSchema), Login)
router.post('/signup', schemaValidator(RegisterSchema), Register)

export default router