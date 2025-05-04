import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    //go the token  tested if it is valid or not by using jwt.verify
    const token = req.cookies.jwt; //getting the token from the cookies but how cookies store token 
    //since we have used the cookie parser in the index.js file the token is stored in the cookies and we can access it using req.cookies.jwt
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETS); //in the decode we get the details of the user that is stored in the token

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password"); //-password is used to exclude the password field from the user object
//and since we have supplied the details in the token we can use the token to get the user details
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
