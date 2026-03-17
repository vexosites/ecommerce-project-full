class ImgService {
    constructor(CloudService){
        this.CloudService = CloudService;
    }
    async post(img){
        console.log(img)
    return await this.CloudService.postImg(img);
    }
    async postArray(imgArray){
        return await Promise.all(
            imgArray.map(img => this.post(img))
          )
    }
}

import cloudinaryService from "./cloudinaryService.js";

export default new ImgService(cloudinaryService);