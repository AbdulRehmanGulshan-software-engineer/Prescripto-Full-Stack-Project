import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// Get single Doctor by ID
const getDoctorById = async (req, res) => {
    try {

        const { docId } = req.params;

        const doctor = await doctorModel
            .findById(docId)
            .select("-password");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        return res.status(200).json({
            success: true,
            doctor
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get doctors
const getDoctors = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            available,
            speciality
        } = req.query

        page = Number(page)
        limit = Number(limit)

        // Basic validation
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Page and limit must be greater than 0"
            })
        }

        // Prevent huge requests
        if (limit > 50) {
            limit = 50
        }

        const skip = (page - 1) * limit

        // Build filter
        const filter = {}

        // Availability filter
        if (available !== undefined) {
            if (available !== "true" && available !== "false") {
                return res.status(400).json({
                    success: false,
                    message: "available must be true or false"
                })
            }

            filter.available = available === "true"
        }

        // Speciality filter
        if (speciality) {
            filter.speciality = speciality
        }

        // Get doctors
        const doctors = await doctorModel
            .find(filter)
            .select("-password")
            .skip(skip)
            .limit(limit)

        // Count filtered doctors
        const totalDoctors = await doctorModel.countDocuments(filter)

        // Calculate total pages
        const totalPages = Math.ceil(totalDoctors / limit)

        return res.status(200).json({
            success: true,
            doctors,
            pagination: {
                page,
                limit,
                totalDoctors,
                totalPages
            }
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Change availability
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body

        const updatedDoctor = await doctorModel.findOneAndUpdate(
            { _id: docId },
            [
                {
                    $set: {
                        available: { $not: "$available" }
                    }
                }
            ],
            {
                new: true,
                updatePipeline: true
            }
        )

        if (!updatedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            })
        }

        res.json({
            success: true,
            message: "Availability changed",
            available: updatedDoctor.available
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Login Doctor
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            doctor.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const dToken = jwt.sign(
            {
                id: doctor._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            dToken,
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export {
    getDoctors,
    getDoctorById,
    changeAvailability,
    loginDoctor
}