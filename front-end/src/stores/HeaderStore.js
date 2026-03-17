import { HeaderService } from "../services/headerService.js";

class HeaderStore extends HeaderService {
  constructor() {
    super();
    this.state = {
      categories: [],
      error: null,
      loading: true
    };
  }

  async Categories() {
    try {
      const result = await this.getCategories();
      console.log('result', result)
      this.state.categories = [...result.data.result];
      this.state.loading = false

      localStorage.setItem("categories", JSON.stringify(this.categories));

      return this.state;
    } catch (error) {
      if(error.status === 404){
        this.state.categories = JSON.parse(localStorage.getItem('categories'));
      }
      console.log(localStorage.getItem('categories'))
      this.state.loading = false
      return this.state
    }
  }
}

export default new HeaderStore();
