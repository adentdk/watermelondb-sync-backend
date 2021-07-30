import http from 'http'
// import firebaseAdmin from "firebase-admin"
import { start } from './expressFile'
import { logger } from './utils/logger'
import * as healthcheck from './utils/healthcheck'
import config from './config/config'
import { initSocket } from './socket'

const app = start(config.node_env)
const port = config.server.port
const server = http.createServer(app)

console.log(port)

healthcheck.init()

initSocket(server)

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(
//     config.firebase.serviceAccount
//   ),
// })

server.listen(Number(port), () => {
  logger.info('server up and running')
  logger.info(`at: http://localhost:${port}`)
  logger.info(`as ${config.node_env}`)
})

setInterval(healthcheck.updateServiceStatus, config.metrics.heartbeatInterval)