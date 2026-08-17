import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

// instance of router
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// route for getting user profile
userRouter.get('/get-profile', authUser, getProfile)
// route for updating user profile
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)



export default userRouter