class ImagesProductService {
    constructor(ImagesProductRepository, CloudService){
        this.ImagesProductRepository = ImagesProductRepository
        this.CloudService = CloudService;
    }
    async get(productId){
        const imgs = await this.ImagesProductRepository.findByProductId(productId);
        return imgs
    }
    async create(validator){
         const cloud = await this.CloudService.create(validator.imgs);
         return await this.ImagesProductRepository.create(cloud, validator.productId) 
    }
    async post(img){
        console.log(img)
    return await this.CloudService.postImg(img.imgs);
    }
    async postArray(imgArray){
        return await Promise.all(
            imgArray.map(img => this.post(img))
          )
    }
}

import Cloudinary from "../infra/cloudinary/Cloudinary.js";
import imagesRepository  from "../repositories/images-repository.js";

export default new ImagesProductService(imagesRepository, Cloudinary); 