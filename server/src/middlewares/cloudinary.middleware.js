const { upload } = require("../services/cloudinary.service");

/**
 * Upload avatar
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const uploadAvatar = (req, res, next) =>
  upload("avatars").single("avatar")(req, res, next);

/**
 * Upload book images
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const uploadBookImgs = async (req, res, next) => {
  try {
    const id = req.params.id;
    upload(`books/${id}`).array("images")(req, res, next);
  } catch (error) {
    await res.status(400).json({ message: error.message });
  }
};

module.exports = {
  uploadAvatar,
  uploadBookImgs,
};
