import User from "@src/db/models/User"
import bcrypt from "@src/utils/bcrypt"
import { body } from "express-validator"
import { StatusCodes } from "http-status-codes"

const strings = {
  success: 'Update Profile success',
  error: 'Update Profile failed',
  invalid: 'Profile not found',
  errorRequired: 'this field is required'
}

export const validationRules = [
  body('name').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 15}),
  body('email').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 64}),
  body('phone').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 15}),
]

export const execute = (req, res) => {
  const {
    name,
    email,
    phone
  } = req.body

  const {uid: userID} = req.auth;

  try {
    const user = await User.findByPk(userID)

    if (user === null) {
      throw new Error(strings.invalid)
    }

    user.name = name
    user.email = email
    user.phone = phone

    await user.save();
    
    return res.status(StatusCodes.OK).json({
      message: strings.success,
    }).end()
  } catch (error) {
    logger.error(error.message);
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