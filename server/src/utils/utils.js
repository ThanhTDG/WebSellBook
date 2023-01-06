const isEmpty = (obj) => {
  if (obj instanceof Object) {
    Object.keys(obj).forEach((key) => isEmpty(obj[key]) && delete obj[key]);
    return JSON.stringify(obj) === JSON.stringify({});
  }
  if (obj instanceof Array) return obj.length === 0;
  return obj === 0 ? false : !obj;
};

/**
 * @param {string} str String
 */
const normalizeStr = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Đ/g, "D")
    .replace(/đ/g, "d");

module.exports = {
  isEmpty,
  normalizeStr,
};
