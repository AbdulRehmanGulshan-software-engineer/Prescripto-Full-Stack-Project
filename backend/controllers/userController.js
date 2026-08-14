// ==========================================================
// USER CONTROLLER
// ==========================================================
//
// This controller contains logic for:
//
// - Register user
// - Login user
// - Get profile        -> FUTURE
// - Update profile     -> FUTURE
// - Get appointments   -> FUTURE / separate controller
// - Cancel appointment -> FUTURE / separate controller
// - Payment gateway    -> FUTURE
//
// ==========================================================

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// ==========================================================
// REGISTER USER
// ==========================================================

const registerUser = async (req, res) => {
    try {
        // ------------------------------------------------------
        // Get data from request body
        // ------------------------------------------------------

        const { name, email, password } = req.body;

        // ------------------------------------------------------
        // Check missing details
        // ------------------------------------------------------

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Missing Details",
            });
        }

        // ------------------------------------------------------
        // Validate email
        // ------------------------------------------------------

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid email",
            });
        }

        // ------------------------------------------------------
        // Validate password
        // ------------------------------------------------------

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter a strong password",
            });
        }

        // ------------------------------------------------------
        // Check if user already exists
        // ------------------------------------------------------

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        // ------------------------------------------------------
        // Hash password
        // ------------------------------------------------------

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // ------------------------------------------------------
        // Create user data
        // ------------------------------------------------------

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        // ------------------------------------------------------
        // Create user
        // ------------------------------------------------------

        const newUser = new userModel(userData);

        // ------------------------------------------------------
        // Save user to database
        // ------------------------------------------------------

        const user = await newUser.save();

        // ------------------------------------------------------
        // Generate JWT
        //
        // We only store the user's MongoDB ID inside JWT.
        //
        // Later authentication middleware can decode this:
        //
        // req.user.id
        // ------------------------------------------------------

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // ------------------------------------------------------
        // Send response
        //
        // CURRENTLY we return only token.
        //
        // We are NOT returning user here because your current
        // frontend architecture will get the user through
        // the future getProfile API.
        // ------------------------------------------------------

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

// ==========================================================
// LOGIN USER
// ==========================================================

const loginUser = async (req, res) => {
    try {
        // ------------------------------------------------------
        // Get email and password from request body
        // ------------------------------------------------------

        const { email, password } = req.body;

        // ------------------------------------------------------
        // Check missing details
        // ------------------------------------------------------

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required",
            });
        }

        // ------------------------------------------------------
        // Find user by email
        // ------------------------------------------------------

        const user = await userModel.findOne({ email });

        // ------------------------------------------------------
        // User does not exist
        // ------------------------------------------------------

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // ------------------------------------------------------
        // Compare password
        //
        // Plain password from frontend
        //        ↓
        // bcrypt.compare()
        //        ↓
        // Hashed password from MongoDB
        // ------------------------------------------------------

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // ------------------------------------------------------
        // Password incorrect
        // ------------------------------------------------------

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // ------------------------------------------------------
        // Generate JWT
        // ------------------------------------------------------

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // ------------------------------------------------------
        // Login successful
        // ------------------------------------------------------

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

export { registerUser, loginUser };