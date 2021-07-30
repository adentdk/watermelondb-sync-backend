import StatusCode from 'http-status-codes'
import {register} from 'prom-client'

export const index = (req, res) => {
  return res
  .status(StatusCode.OK)
  .send({message: '/ index'})
}

export const ping = (req, res) => {
  return res
  .status(StatusCode.OK)
  .send('pong')
}

export const metrics = (req, res) => {
  res.set('Content-Type', register.contentType)
  return res
  .status(StatusCode.OK)
  .send(register.metrics())
}
