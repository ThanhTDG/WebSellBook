const { uploadToCloudinary } = require("../services/upload.service");

const ErrorHandler = require("../utils/errorHandler");
const bufferToDataUri = require("../utils/parser");

const uploadImage = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      throw new ErrorHandler(400, "Image is required");
    }

    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = bufferToDataUri(fileFormat, file.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);

    res.json({
      status: "success",
      message: "Upload successful",
      data: imageDetails,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = {
  uploadImage,
};
