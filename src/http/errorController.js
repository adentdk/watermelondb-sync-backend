import StatusCode from 'http-status-codes'

export default {
  methodNotAllowed (req, res) {
    return res.status(StatusCode.METHOD_NOT_ALLOWED).end()
  },

  notFound (req, res) {
    return res.status(StatusCode.NOT_FOUND).end()
  },

  notAuthorized (req, res) {
    return res.status(StatusCode.UNAUTHORIZED).end()
  }
}
