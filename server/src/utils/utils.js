const isEmpty = (obj) => {
  if (obj instanceof Object) {
    Object.keys(obj).forEach((key) => isEmpty(obj[key]) && delete obj[key]);
    return JSON.stringify(obj) === JSON.stringify({});
  }
  if (obj instanceof Array) return obj.length === 0;
  return obj === 0 ? true : !obj;
};

module.exports = {
  isEmpty,
};
