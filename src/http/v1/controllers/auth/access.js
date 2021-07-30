import Role from "@src/db/models/Role";
import { StatusCodes } from "http-status-codes";

const strings = {
  success: 'Get Access Success',
  error: 'Get Access Failed',
  invalid: 'Role not found'
}

export const execute = async (req, res) => {
  const {
    role_id: roleID,
  } = req.auth;


  try {
    const role = await Role.findByPk(roleID)

    if (role === null) {
      throw new Error(strings.invalid)
    }

    const accesses = await role.getAccesses();

    return res.status(StatusCodes.OK).json({
      message: strings.success,
      user: accesses
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