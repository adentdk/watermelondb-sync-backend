const os = require('os')
const dotenv = require('dotenv')
const serviceAccount = require('./serviceAccountKey.json')

if (!process.env.USE_DOCKER) {
  dotenv.config()
}

module.exports = {
  node_env: process.env.NODE_ENV,
  gold_api_url: process.env.GOLD_API_URL,
  gold_api_key: process.env.GOLD_API_KEY,
  gold_username: process.env.GOLD_USERNAME,
  gold_password: process.env.GOLD_PASSWORD,
  firebase: {
    serviceAccount,
    projectId: "firebase-id",
    storageBucket: "firebase-id.appspot.com",
  },
  server: {
    host: '0.0.0.0',
    port: process.env.SERVICE_PORT,
  },
  metrics: {
    heartbeatInterval: Number(process.env.HEARTBEAT_INTERVAL),
    commitSha: 'manual-build',
    dockerHost: os.hostname(),
    version: process.env.npm_package_version,
  },
  db: {
    user: process.env.DB_USER,
    dialect: process.env.DB_DIALECT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
  },
  websocket: {
    path: process.env.WEB_SOCKET_PATH,
  }
}
