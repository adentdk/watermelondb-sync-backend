import jwt from 'jsonwebtoken'
import config from '../config/config'

const secretKey = config.jwt.secretKey

const signToken = payload => {

  let options = {}

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '2 days'
  })

  return token
}

const verifyToken = token => {
  const encodedToken = jwt.verify(token, secretKey)

  return encodedToken
}

export default {
  signToken,
  verifyToken
}