import doctorModel from "../models/doctorModel.js"

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

export { changeAvailability }