import { REGULAR_ROLE_ID } from '@src/constants'
import User from '@src/db/models/User'
import jwt from '@src/utils/jwt'
import { logger } from '@src/utils/logger'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

const strings = {
  success: 'Register success',
  error: 'Register failed',
  invalid: 'Username is already taken',
}

export const validationRules = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .bail()
    .isLength({min: 1, max: 32})
    .withMessage('Name must be between 1 and 32 characters long'),
  body('username')
    .exists()
    .withMessage('Username is required')
    .bail()
    .custom(async (value) => {
      try {
        if (value) {
          const user = await User.findOne({ where: { username: value } })
          if (user === null) {
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
    .withMessage('Username is already taken')
    .bail()
    .isLength({min: 3, max: 32})
    .withMessage('Username must be between 3 and 32 characters long'),
  body('password')
    .exists()
    .withMessage('Password is Required')
    .bail()
    .isLength({min: 6, max: 15})
    .withMessage('Password must be between 6 and 15 characters long'),
  body('confirm_password')
    .exists()
    .withMessage('Confirm Password is required')
    .bail()
    .custom((value, {req}) => {
      if (value === req.body.password) {
        return Promise.resolve(true)
      }

      return Promise.reject()
    })
    .withMessage('Password doesn\'t match')
]

export const execute = async (req, res) => {
  const {
    username,
    password,
    name
  } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      name,
    })

    await user.setRole(REGULAR_ROLE_ID);

    const jwtPayload = {
      uid: user.id,
      role_id: REGULAR_ROLE_ID
    }

    const accessToken = jwt.signToken(jwtPayload);

    user.is_active = true;

    await user.save();

    const userResponse = await user.toResponse

    return res.status(StatusCodes.OK).json({
      message: strings.success,
      accessToken,
      user: userResponse
    }).end()

  } catch (error) {
    logger.error(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
}