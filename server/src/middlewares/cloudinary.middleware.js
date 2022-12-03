const { upload, destroy } = require("../services/cloudinary.service");

/**
 * Upload avatar
 */
const uploadAvatar = upload("avatars").single("avatar");

/**
 * Destroy avatar
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const destroyAvatar = async (req, res, next) => {
  try {
    const user = req.user;
    const image = user.avatar;
    const public_id = image.split("/").pop().split(".")[0];
    await destroy(`avatars/${public_id}`);
    next();
  } catch (error) {
    await res.status(400).json({ message: error.message });
  }
};

/**
 * Upload images
 * @param {string} folder
 */
const uploadImgs =
  (folder) =>
  /**
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {Function} next Next function
   */
  async (req, res, next) => {
    try {
      const id = req.params.id;
      upload(`${folder}/${id}`).array("images")(req, res, next);
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };

/**
 * Destroy images
 * @param {string} folder
 */
const destroyImg =
  (folder) =>
  /**
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {Function} next Next function
   */
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const image = req.body.image;
      const public_id = image.split("/").pop().split(".")[0];
      await destroy(`${folder}/${id}/${public_id}`);
      next();
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };

module.exports = {
  uploadAvatar,
  destroyAvatar,
  uploadImgs,
  destroyImg,
};
