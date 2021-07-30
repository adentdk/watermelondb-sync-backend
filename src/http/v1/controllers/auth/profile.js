import User from "@src/db/models/User";
import { StatusCodes } from "http-status-codes";

const strings = {
  success: 'Get Profile Success',
  error: 'Get Profile Failed',
  invalid: 'Profile not found'
}

export const execute = async (req, res) => {
  const {
    id: userID,
  } = req.auth;


  try {
    const user = await User.findByPk(userID)

    if (user === null) {
      throw new Error(strings.invalid)
    }

    const userResponse = await user.toResponse

    return res.status(StatusCodes.OK).json({
      message: strings.success,
      user: userResponse
    }).end()

  } catch (error) {

    if (error.message === strings.invalid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: strings.error,
        error: [{
          param: '_global',
          message: error.message
        }]
      }).end()
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

  }
}