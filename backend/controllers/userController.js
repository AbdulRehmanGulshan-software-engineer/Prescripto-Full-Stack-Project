// ==========================================================
// USER CONTROLLER
// ==========================================================
//
// This controller contains logic for:
//
// - Register user
// - Login user
// - Get profile
// - Update profile
// - Book Appointments
// - Get appointments   -> FUTURE / separate controller
// - Cancel appointment -> FUTURE / separate controller
// - Payment gateway    -> FUTURE
//
// ==========================================================

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        // Get data from request body
        const { name, email, password } = req.body;

        // Check missing details
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Missing Details",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid email",
            });
        }

        // Validate password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter a strong password",
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // Create user data
        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        // Create user
        const newUser = new userModel(userData);

        // Save user to database
        const user = await newUser.save();

        // Generate JWT
        // We only store the user's MongoDB ID inside JWT.
        // Later authentication middleware can decode this:
        // req.user.id
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Send response
        // CURRENTLY we return only token.
        // We are NOT returning user here because our current
        // frontend architecture will get the user through
        // the future getProfile API.

        return res.json({
            success: true,
            token,
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check missing details
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        // User does not exist
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Compare password
        //
        // Plain password from frontend
        //        ↓
        // bcrypt.compare()
        //        ↓
        // Hashed password from MongoDB
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Password incorrect
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Login successful
        return res.json({
            success: true,
            token,
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// API TO GET USER PROFILE DATA
const getProfile = async (req, res) => {
    try {
        // Get user ID added by authUser middleware (wo khud token ka use kr ke add kr rha hai req me hamari)
        const userId = req.userId;

        // Find user by ID
        const userData = await userModel
            .findById(userId)
            .select("-password");

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            userData
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

// API TO UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const userId = req.userId;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({
                success: false,
                message: "Data Missing"
            });
        }

        await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                phone,
                address: JSON.parse(address),
                dob,
                gender
            }
        );

        // If there is an image
        if (imageFile) {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path,
                {
                    resource_type: "image"
                }
            );

            const imageURL = imageUpload.secure_url;

            // Save image URL in MongoDB
            await userModel.findByIdAndUpdate(
                userId,
                {
                    image: imageURL
                }
            );
        }

        return res.json({
            success: true,
            message: "Profile Updated"
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

// API TO BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body
        // getting userId added by auth service to my request
        const userId = req.userId;

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json(
                {
                    success: false,
                    message: "Doctor not available"
                }
            )
        }

        let slots_booked = docData.slots_booked

        // checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json(
                    {
                        success: false,
                        message: "Slot not available"
                    }
                )
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }


        // getting userData
        const userData = await userModel.findById(userId).select('-password')

        // not sending details to frontend
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        // saving to database
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, {
            slots_booked
        })

        res.json({
            success: true,
            message: "Appointment Booked"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };