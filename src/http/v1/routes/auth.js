import { Router } from "express"
import validator from '@src/middlewares/validator'
import * as loginController from '@src/http/v1/controllers/auth/login'
import * as registerController from '@src/http/v1/controllers/auth/register'

import errorController from "@src/http/errorController";

const authRoutes = () => {
  const router = Router();

  router
    .route('/login')
    .post(loginController.validationRules, validator, loginController.execute)
    .all(errorController.methodNotAllowed)

  router
    .route('/register')
    .post(registerController.validationRules, validator, registerController.execute)
    .all(errorController.methodNotAllowed)

  return router
}

export default authRoutes