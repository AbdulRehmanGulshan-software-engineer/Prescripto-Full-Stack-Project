import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        // Get doctor token from request headers
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, login again"
            });
        }

        // Verify token
        const token_decode = jwt.verify(
            dtoken,
            process.env.JWT_SECRET
        );

        // Attach doctor ID to request
        req.docId = token_decode.id;

        // Allow doctor to make API call
        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Not authorized, login again"
        });
    }
};

export default authDoctor;