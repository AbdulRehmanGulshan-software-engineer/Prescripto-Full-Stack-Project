import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        // Get token from request headers
        const { token } = req.headers;

        if (!token) {
            return res.json({
                success: false,
                message: "Not authorized, login again"
            });
        }

        // Verify token
        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user ID to request
        req.userId = token_decode.id;

        // Allow user to make API call
        next();

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: "Not authorized, login again"
        });
    }
};

export default authUser;