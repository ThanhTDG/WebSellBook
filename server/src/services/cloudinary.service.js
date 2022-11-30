require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * @param {string} folder
 */
const upload = (folder) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowedFormats: ["jpg", "jpeg", "png"],
    },
  });
  return multer({ storage });
};

/**
 * @param {string} public_id
 */
const destroy = async (public_id) =>
  await cloudinary.uploader.destroy(public_id);

module.exports = {
  upload,
  destroy,
};
