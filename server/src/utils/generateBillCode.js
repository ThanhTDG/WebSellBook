const generateBillcode = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const rand = Math.floor(Math.random() * (1e6 - 1));

  const yearFm = formatNumber(year, 4);
  const monthFm = formatNumber(month, 2);
  const dayFm = formatNumber(day, 2);
  const randFm = formatNumber(rand, 6);
  return `${yearFm}${monthFm}${dayFm}${randFm}`;
};

const formatNumber = (num, len) => String(num).padStart(len, 0);

module.exports = {
  generateBillcode,
};
