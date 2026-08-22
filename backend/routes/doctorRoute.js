import express from "express"
import { getDoctorById, getDoctors, loginDoctor } from "../controllers/doctorController.js"

const doctorRouter = express.Router()

doctorRouter.get("/list", getDoctors)
doctorRouter.get("/:docId", getDoctorById);
doctorRouter.post('/login', loginDoctor)

export default doctorRouter