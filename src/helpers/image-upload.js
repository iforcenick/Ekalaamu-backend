import cloudinary from '../config/cloudinary-config';

export class ImageUpload {
  static uploadImages = async (filePaths) => {
    const results = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filePaths.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await cloudinary.uploader.upload(filePaths[i], (error, result) => {
        if (result) {
          results.push(result);
        }
        results.push(error);
      });
    }
    return results;
  }
}
