import validator from "validator"
import bycrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"


// API for adding doctor
const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !address) {
            return res.json({
                success: false,
                message: "Missing Details"
            })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing doctor password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        // upload image file to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url;


        // creating doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            available: true,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)

        // save in database
        await newDoctor.save()

        res.json({
            success: true,
            message: "Doctor added."
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        // get email and password
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate Token
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            // send token to response
            res.json({
                success: true,
                token
            })
            console.log("Request Accepted From Frontend")
        }
        else {
            res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        });
    }
}

// Page based Pagination API controller function to get al doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        // take page and limit from req
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        // calculate doctors to skip
        const skip = (page - 1) * limit

        // get required doctors from database
        const doctors = await doctorModel
            .find({})
            .select('-password')
            .skip(skip)
            .limit(limit)

        // count available doctors
        const totalDoctors = await doctorModel.countDocuments({})

        // calculate total pages
        const totalPages = Math.ceil(totalDoctors / limit)

        // calculate does we have more doctors
        const hasMore = page < totalPages

        // send response
        res.json({
            success: true,
            doctors,
            currentPage: page,
            totalPages,
            totalDoctors,
            hasMore
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: false,
            message: error.message
        })
    }
}

export { addDoctor, loginAdmin, allDoctors }