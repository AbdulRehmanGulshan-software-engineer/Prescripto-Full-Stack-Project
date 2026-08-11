import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // verifying token
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({
                success: false,
                message: "Not authorized , login again"
            })
        }
        //decode the token
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Not authorized , login again"
            })
        }

        // allow the user to make API call
        next()
         
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Network Error"
        })
    }
}

export default authAdmin;