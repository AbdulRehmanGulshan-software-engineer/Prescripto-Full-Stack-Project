import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'

// instance of router
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)



export default userRouter