import User from "@src/db/models/User"
import bcrypt from "@src/utils/bcrypt"
import { logger } from "@src/utils/logger"
import { body } from "express-validator"
import { StatusCodes } from "http-status-codes"

const strings = {
  success: 'Change Password success',
  error: 'Change Password failed',
}

export const validationRules = [
  body('old_password')
    .exists()
    .withMessage('Old Password is required')
    .bail()
    .isLength({ min: 6, max: 15 })
    .withMessage('Old Password must be between 6 and 15 characters long')
    .custom(async (value, { req }) => {
      const { uid: userID } = req.auth;
      try {
        if (value) {
          const user = await User.findByPk(userID)
          if (user === null) {
            throw new Error()
          }

          const isPasswordMatch = bcrypt.compare(value, user.password)

          if (isPasswordMatch) {
            return Promise.resolve();
          } else {
            throw new Error()
          }

        } else {
          throw new Error()
        }
      } catch (error) {
        return Promise.reject()
      }
    })
    .withMessage('Old Password doesn\'t match'),
  body('new_password')
    .exists()
    .withMessage('New Password is required')
    .bail()
    .isLength({ min: 6, max: 15 })
    .withMessage('New Password must be between 6 and 15 characters long'),
  body('confirm_password')
    .exists()
    .withMessage('Confirm Password is required')
    .bail()
    .custom((value, { req }) => {
      if (value === req.body.new_password) {
        return Promise.resolve(true)
      }

      return Promise.reject()
    })
    .withMessage('New Password doesn\'t match')
    .isLength({ min: 6, max: 15 })
    .withMessage('Confirm Password must be between 6 and 15 characters long'),
]

export const execute = async (req, res) => {
  const {
    new_password
  } = req.body

  const { uid: userID } = req.auth;
  try {
    const user = await User.findByPk(userID)
    user.password = new_password

    await user.save();

    return res.status(StatusCodes.OK).json({
      message: strings.success,
    }).end()
  } catch (error) {
    logger.error(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }
}