import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express from 'express'
import responseTime from 'response-time'
import swaggerUi from 'swagger-ui-express'
import { rootRoutes } from './http/rootRoutes'
import { logger } from './utils/logger'
import errorController from './http/errorController'

export function start(env) {
  logger.debug(`App running as ${env}`)
  const app = express()

  // errorHandler middleware
  if (env === 'development') {
    app.use(errorHandler())
  }

  // responseTime middleware
  app.use(responseTime())

  // cors MIDDLEWARE
  app.use(cors({
    origin: [],
  }))

  // Public File
  app.use("/public", express.static("public"));

  // BODY PARSER MIDDLEWARE
  app.use(json())
  app.use(urlencoded({ extended: true }))

  // API DOCS ROUTE
  app.use(
    "/api-docs/v1",
    swaggerUi.serve,
    swaggerUi.setup(require("./../docs/v1.json"))
  )

  // API BEGIN
  app.use('/', rootRoutes())

  app.use(errorController.notFound)

  return app
}
