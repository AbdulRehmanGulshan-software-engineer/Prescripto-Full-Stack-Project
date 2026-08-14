import express from "express"
import { getDoctorById, getDoctors } from "../controllers/doctorController.js"

const doctorRouter = express.Router()

doctorRouter.get("/list", getDoctors)
doctorRouter.get("/:docId", getDoctorById);

export default doctorRouter