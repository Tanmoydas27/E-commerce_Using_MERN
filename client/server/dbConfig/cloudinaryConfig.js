const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.cloud_api_key, 
    api_secret: process.env.clodu_api_secret_key 
  });

module.exports = cloudinary;