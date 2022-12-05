/**
 * Async filter array
 * @param {any[]} arr
 * @param {Function} predicate
 */
const asyncFilter = async (arr, predicate) => {
  const res = await Promise.all(arr.map(predicate));
  return arr.filter((_, index) => res[index]);
};

/**
 * Async filter array
 * @param {any[]} arr
 * @param {Function} predicate
 */
const asyncFilter2 = async (arr, predicate) =>
  arr.reduce(
    async (memo, ele) => [
      ...(await memo),
      ...((await predicate(ele)) ? [e] : []),
    ],
    []
  );

/**
 * Async some array
 * @param {any[]} arr
 * @param {Function} predicate
 */
const asyncSome = async (arr, predicate) =>
  (await asyncFilter(arr, predicate)).length > 0;

/**
 * Async some array
 * @param {any[]} arr
 * @param {Function} predicate
 */
const asyncSome2 = async (arr, predicate) => {
  for (let e of arr) {
    if (await predicate(e)) {
      return true;
    }
  }
  return false;
};

/**
 * Async every array
 * @param {any[]} arr
 * @param {Function} predicate
 */
const asyncEvery = async (arr, predicate) =>
  (await asyncFilter(arr, predicate)).length === 0;

/**
 * Async every array
 * @param {any[]} arr
 * @param {Function} predicate
 */
const asyncEvery2 = async (arr, predicate) => {
  for (let e of arr) {
    if (!(await predicate(e))) {
      return false;
    }
  }
  return true;
};

module.exports = {
  asyncFilter,
  asyncFilter2,
  asyncSome,
  asyncSome2,
  asyncEvery,
  asyncEvery2,
};
