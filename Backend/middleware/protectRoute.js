import jwt from "jsonwebtoken";
import User from "../model/users.model.js"

const protectRoute = async (req, res, next) => {
    try {
        const token= req.cookies.jwt;

        if(!token) {
            return res.status(401).json({error: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({error: "Unauthorized - invalid token"});
        }

        const user = await User.findById(decoded.userId).select('-password');

        if(!user) {
            return res.status(404).json({error: "user not found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("error in protectRooute middleware: ", error.message);
        res.status(500).json({error: "internal server error"});
    }
}

export default protectRoute;