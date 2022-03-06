const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: dbogr7yhd,
    api_key: 436154798691444,
    api_secret: GT7gwzComQiLyN55Q7yOnSYXwd8
})
const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'Doze',
    allowedFormats: ['jpg', 'png', 'jpeg']
});
module.exports = {
    cloudinary, storage
} 