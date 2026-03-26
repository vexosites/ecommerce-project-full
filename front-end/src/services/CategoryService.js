import axios from "axios"
export class CategoryService{
    async getById(categoryId){
        try {
            const result = await axios.get("http://localhost:3000/categories/" + categoryId);
            console.log('category-result', result)
            return result;
        } catch (error) {
            throw {status: error.status}
        }
    }
}

export default new CategoryService()