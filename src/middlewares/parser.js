import { StatusCodes } from "http-status-codes";

const parser = (keys = [], source = 'body') => (req, res, next) => {
  try {

    keys.forEach(key => {
      if (source === 'body') {

        if (req.body[key]) {
          req.body[key] = JSON.parse(req.body[key])
        }

      } else {
        if (req.query[key]) {
          req.query[key] = JSON.parse(req.query[key])
        }
      }
    })


    next();
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: [
        {
          message: error.message
        }
      ]
    })
  }
}

export default parser
