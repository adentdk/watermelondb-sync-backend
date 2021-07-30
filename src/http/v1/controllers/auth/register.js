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
  errorRequired: 'this field is required'
}

export const validationRules = [
  body('name').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 15}),
  body('username')
    .exists()
    .withMessage(strings.errorRequired)
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
    .withMessage(strings.invalid).isLength({min: 1, max: 32}),
  body('password').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 32}),
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