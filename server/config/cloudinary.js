require("dotenv").config();
const cloudinary = require("cloudinary").v2;
console.log("Cloudinary Details Check =>", {
  name: process.env.CLOUD_NAME,
  key: process.env.API_KEY,
  secret_length: process.env.API_SECRET ? process.env.API_SECRET.length : 0,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
