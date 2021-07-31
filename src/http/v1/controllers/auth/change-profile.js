import User from "@src/db/models/User"
import { logger } from "@src/utils/logger"
import { body } from "express-validator"
import { StatusCodes } from "http-status-codes"

const strings = {
  success: 'Update Profile success',
  error: 'Update Profile failed',
  invalid: 'Profile not found',
  errorRequired: 'this field is required'
}

export const validationRules = [
  body('name')
    .if(value => !!value)
    .isLength({min: 1, max: 32})
    .withMessage('Name must be between 1 and 32 characters long'),
  body('email')
    .if(value => !!value)
    .isLength({min: 6, max: 64})
    .withMessage('Email must be between 6 and 64 characters long')
    .isEmail()
    .withMessage('Email is not valid format'),
  body('phone')
    .if(value => !!value)
    .isLength({min: 1, max: 15})
    .withMessage('Phone must be between 1 and 15 characters long'),
]

export const execute = async (req, res) => {
  const {
    name,
    email,
    phone
  } = req.body

  
  try {
    const {uid: userID} = req.auth;
    const user = await User.findByPk(userID)

    if (user === null) {
      throw new Error(strings.invalid)
    }

    if (name) {
      user.name = name
    }

    if (email) {
      user.email = email
    }

    if (phone) {
      user.phone = phone
    }

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