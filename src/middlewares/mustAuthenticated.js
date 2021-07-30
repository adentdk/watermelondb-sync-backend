import { StatusCodes } from "http-status-codes"
import jwt from "../utils/jwt"

const mustAuthenticated = (req, res, next) => {
  const { headers } = req
  try {
    if (!headers.authorization) {
      throw {
        message: 'no token provided',
      }
    }
    const token = headers.authorization.replace("Bearer ", "")

    const decodedToken = jwt.verifyToken(token)

    req.auth = decodedToken
    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: [
        {
          message: error.message,
        }
      ]
    });
  }
}

export default mustAuthenticated
