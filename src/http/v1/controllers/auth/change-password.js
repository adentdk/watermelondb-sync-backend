import User from "@src/db/models/User"
import bcrypt from "@src/utils/bcrypt"
import { body } from "express-validator"
import { StatusCodes } from "http-status-codes"

const strings = {
  success: 'Change Password success',
  error: 'Change Password failed',
  invalid: 'old password doesn\'t match',
  errorRequired: 'this field is required'
}

export const validationRules = [
  body('new_password').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 32}),
  body('old_password').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 32})
]

export const execute = (req, res) => {
  const {
    new_password,
    old_password
  } = req.body

  const {uid: userID} = req.auth;

  try {
    const user = await User.findByPk(userID)

    const isPasswordMatch = bcrypt.compare(old_password, user.password);
    if (isPasswordMatch) {
      user.password = new_password

      await user.save();
      
      return res.status(StatusCodes.OK).json({
        message: strings.success,
      }).end()
    } else {
      throw {
        message: strings.invalid
      }
    }
  } catch (error) {
    logger.error(error.message);
    if (error.message === strings.invalid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: strings.error,
        errors: [{
          param: '_global',
          message: error.message
        }]
      }).end()
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
    }
  }
}