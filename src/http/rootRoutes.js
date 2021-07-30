import { Router } from 'express'
import * as rootController from './rootController'
import errorController from './errorController'

export function rootRoutes () {
  const api = Router()

  api
    .route('/')
    .get(rootController.index)
    .all(errorController.methodNotAllowed)
  api
    .route('/ping')
    .get(rootController.ping)
    .all(errorController.methodNotAllowed)
  api
    .route('/metrics')
    .get(rootController.metrics)
    .all(errorController.methodNotAllowed)

  return api
}