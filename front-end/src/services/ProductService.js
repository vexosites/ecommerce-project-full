import axios from 'axios';

class ProductService{
async getById(id){
    console.log("url", import.meta.env.VITE_URL)
    return await axios.get(import.meta.env.VITE_URL + "/products/byId/" + id)
}
}

export default new ProductService()