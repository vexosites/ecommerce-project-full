import { CategoryService } from "../services/CategoryService.js"
class CategoryStore extends CategoryService{
    constructor(){
        super()
        this.state = {
            loading: false,
            error: null,
            products: []
        }
    }
    async getById(id){
        try {
            this.state.loading = true;
              const category = await super.getById(id);
              console.log("categoryy", category)
            this.state.loading = false;
            this.state.products = category.data.result
            return this.state;
        } catch (error) {
            this.state.loading = false
            return this.state;
        }
    }
}

export default new CategoryStore()