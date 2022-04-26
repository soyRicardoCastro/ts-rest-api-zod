import { Router } from 'express'
import { getUsers, getUser } from '../controllers/users.controller'

const router = Router()

router.get('/users', getUsers)
router.get('/users/:id', getUser)
//router.put('/users/:id', )
//router.delete('/users/:id', )

export default router