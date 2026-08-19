import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

// instance of router
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// route for getting user profile
userRouter.get('/get-profile', authUser, getProfile)
// route for updating user profile
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
// route for book appointment
userRouter.post('/book-appointment', authUser, bookAppointment)

export default userRouter