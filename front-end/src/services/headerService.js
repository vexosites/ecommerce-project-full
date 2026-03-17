import axios from "axios";

export class HeaderService {
  async getCategories() {
    try {
      console.log('env', import.meta.env.VITE_URL)
      const result = await axios.get("http://localhost:3000" + "/" + "categories/get/all");
      console.log('resultt', result.data.result)
      return result;
    } catch (error) {
      console.log(error)
      throw {status: error.status}
    }
  }
}

export default new HeaderService();