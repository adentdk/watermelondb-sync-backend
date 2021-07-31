import { Router } from "express"
import validator from '@src/middlewares/validator'
import * as loginController from '@src/http/v1/controllers/auth/login'
import * as registerController from '@src/http/v1/controllers/auth/register'
import * as changePasswordController from '@src/http/v1/controllers/auth/change-password'
import * as changeProfileController from '@src/http/v1/controllers/auth/change-profile'
import * as profileController from '@src/http/v1/controllers/auth/profile'
import * as accessController from '@src/http/v1/controllers/auth/access'

import errorController from "@src/http/errorController";

import mustAuthenticated from "@src/middlewares/mustAuthenticated"

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

  router
    .route('/profile')
    .get(mustAuthenticated, profileController.execute)
    .patch(mustAuthenticated, changeProfileController.validationRules, validator, changeProfileController.execute)
    .all(errorController.methodNotAllowed)

  router
    .route('/profile/change-password')
    .put(mustAuthenticated, changePasswordController.validationRules, validator, changePasswordController.execute)
    .all(errorController.methodNotAllowed)
    
  router
    .route('/profile/accesses')
    .get(mustAuthenticated, accessController.execute)
    .all(errorController.methodNotAllowed)

  return router
}

export default authRoutes