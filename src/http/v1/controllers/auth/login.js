import User from "@src/db/models/User";
import bcrypt from "@src/utils/bcrypt";
import jwt from "@src/utils/jwt";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";

const strings = {
  success: 'Login Success',
  error: 'Login Failed',
  invalid: 'Username or Password is incorrect',
  errorRequired: 'this field is required',
  errorMinLength: 'minimum character is 1 and maximum 32'
}

export const validationRules = [
  body('username').exists().withMessage(strings.errorRequired).isLength({min: 1, max: 32}),
  body('password').exists().withMessage(strings.errorRequired).isLength({min: 6, max: 32})
]

export const execute = async (req, res) => {
  const {
    username,
    password
  } = req.body;


  try {
    const user = await User.findOne({
      where: {
        username,
      },
    })

    if (user === null) {
      throw new Error(strings.invalid)
    }

    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const role = await user.getRole();

      const jwtPayload = {
        uid: user.id,
        role_id: role.id
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
    } else {
      throw new Error(strings.invalid)
    }

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