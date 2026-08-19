import { mongoose } from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    // appointment schema
    userId: { type: String, require: true },
    docId: { type: String, require: true },
    slotDate: { type: String, require: true },
    slotTime: { type: String, require: true },
    userData: { type: Object, require: true },
    amount: { type: Number, required: true },
    date: { type: Number, require: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
export default appointmentModel