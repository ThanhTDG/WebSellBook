/**
 * Auto generate avatar from name
 * @param {string} name
 * @return The link avatar
 */
const generateAvatar = (name) => {
  name = name.split(" ").join("+");
  return `https://ui-avatars.com/api/?name=${name}&background=random&color=random&length=1&size=96`;
};

module.exports = {
  generateAvatar,
};
