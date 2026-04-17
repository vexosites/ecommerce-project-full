import cloudinary from "../../configs/cloudinary/cloudinary.js";

export class Cloudinary{
    constructor(Cloudinary){
        this.Cloudinary = Cloudinary;
    }

async create(imgs) {
  try {
    const imgs_raw = await Promise.all(
      imgs.map(async (img) => {
        const base64 = `data:${img.mimetype};base64,${img.buffer.toString("base64")}`;

        return await this.Cloudinary.uploader.upload(base64);
      })
    );

    return imgs_raw;

  } catch (error) {
    throw error;
  }
}
}

export default new Cloudinary(cloudinary);