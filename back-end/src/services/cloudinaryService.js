class CloudinaryService {
    constructor(Cloudinary) {
        this.Cloudinary = Cloudinary;
    }
    async postImg(img){
        return await new Promise((resolve, reject) => {
            this.Cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => (error ? reject(error) : resolve(result))
            ).end(img.buffer);
          });
    }
}

import Cloudinary from "../configs/cloudinary/cloudinary.js";

export default new CloudinaryService(Cloudinary);