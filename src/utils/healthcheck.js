import {Counter} from 'prom-client'
import config from '../config/config'

const hostname = config.metrics.dockerHost
const version = config.metrics.version
const env = config.node_env
const sha = config.metrics.commitSha

const serviceHeartbeatCounter = new Counter({
  name: 'service_is_alive',
  help: 'Check if service is working.',
  labelNames: ['alive'],
})

const updateServiceStatus = () => {
  serviceHeartbeatCounter.inc({alive: hostname})
}

const serviceEnv = new Counter({
  name: 'service_environment',
  help: 'Check service environment.',
  labelNames: ['environment'],
})

const serviceVersion = new Counter({
  name: 'service_version',
  help: 'Check service version.',
  labelNames: ['version'],
}) 

const serviceCommitSha = new Counter({
  name: 'service_commit_sha',
  help: 'Check service commit sha.',
  labelNames: ['commit_sha'],
})

const init = () => {
  serviceVersion.inc({version})
  serviceCommitSha.inc({commit_sha: sha})
  serviceEnv.inc({environment: env})
}


export {
  updateServiceStatus,
  init
}