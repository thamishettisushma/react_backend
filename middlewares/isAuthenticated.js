import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;


// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         // Log headers and cookies to check if the token is being sent
//         console.log("Headers:", req.headers);
//         console.log("Cookies:", req.cookies);

//         const token = req.cookies?.token || req.headers["authorization"];

//         if (!token) {
//             console.log("❌ No token provided");
//             return res.status(401).json({
//                 message: "User not authenticated",
//                 success: false,
//             });
//         }

//         // If token is in "Bearer <TOKEN>" format, extract the actual token
//         const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
//         console.log("Token received:", actualToken);

//         // Verify the token
//         const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
//         console.log("Decoded token:", decoded);

//         req.id = decoded.id;

//         // Check if user exists
//         const user = await User.findById(req.id);
//         console.log("User found:", user);

//         if (!user) {
//             console.log("❌ User not found in database");
//             return res.status(401).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         next();
//     } catch (error) {
//         console.log("❌ JWT Verification Failed:", error.message);
//         return res.status(401).json({
//             message: "Invalid token",
//             success: false,
//         });
//     }
// };

// export default isAuthenticated;
