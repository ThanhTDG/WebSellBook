const DatauriParser = require("datauri/parser");

DataURI.DataURI.Input

const parser = new DatauriParser();

/**
 *
 * @param {string} fileFormat
 * @param {} buffer
 */
const bufferToDataUri = (fileFormat, buffer) =>
  parser.format(fileFormat, buffer);

module.exports = bufferToDataUri;
