class ErrorHandler extends Error {
  /**
   * @param {number} statusCode HTTP response status code
   * @param {string|Error} message Error message
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ErrorHandler;
