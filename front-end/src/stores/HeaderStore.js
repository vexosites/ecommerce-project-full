import { HeaderService } from "../services/headerService.js";

class HeaderStore extends HeaderService {
  constructor() {
    super();

    this.state = {
      categories: [],
      error: null,
      loading: false
    };
  }

  async getCategoriesStore() {
    this.state.loading = true;
    this.state.error = null;

    try {
      const result = await this.getCategories();

      this.state.categories = result?.data?.result || [];
      this.state.loading = false;

      localStorage.setItem(
        "categories",
        JSON.stringify(this.state.categories)
      );

      return this.state;
    } catch (error) {
      console.error("Error on the categories req:", error);

      // fallback do cache
      const cached = localStorage.getItem("categories");

      if (cached) {
        this.state.categories = JSON.parse(cached);
      }

      this.state.error = error;
      this.state.loading = false;

      return this.state;
    }
  }
}

// 👇 Singleton (global)
export const headerStore = new HeaderStore();