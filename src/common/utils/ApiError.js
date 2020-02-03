var HttpStatus = require('http-status-codes')

class ApiError extends Error {
  constructor(message, status = HttpStatus.BAD_REQUEST, extra = {}) {
    super(message)
    this.status = status
    this.extra = extra
  }

  static badRequest(message, extra) {
    return new ApiError(message, HttpStatus.BAD_REQUEST, extra)
  }

  static notFound(message, extra) {
    return new ApiError(message, HttpStatus.NOT_FOUND, extra)
  }

  static conflict(message, extra) {
    return new ApiError(message, HttpStatus.CONFLICT, extra)
  }

  static unauthorized(message, extra) {
    return new ApiError(message, HttpStatus.UNAUTHORIZED, extra)
  }

  static forbidden(message, extra) {
    return new ApiError(message, HttpStatus.FORBIDDEN, extra)
  }

  static internal(message, extra) {
    return new ApiError(message, HttpStatus.INTERNAL_SERVER_ERROR, extra)
  }
}
module.exports = ApiError
