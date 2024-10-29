import jwt from "jsonwebtoken";
import { ApplicationError } from "./error.handler.js";

// Middleware to check JWT from headers (simple token)
export const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"]; // Directly get the token from the "authorization" header

  if (!token) {
    return next(
      new ApplicationError(401, "Unauthorized access. No token provided.")
    );
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = payload._id; // Attach user ID to the request
    next();
  } catch (err) {
    return next(
      new ApplicationError(403, "Unauthorized! Invalid or expired token.")
    );
  }
};
