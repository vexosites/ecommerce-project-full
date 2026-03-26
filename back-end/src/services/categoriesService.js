import AppError from "../errors/UserError.js";

class categoriesService {
  constructor(categoriesRepository, quickSort) {
    this.categoriesRepository = categoriesRepository;
    this.quickSort = quickSort;
  }
  async post(validator) {
    try {
      const data = await this.categoriesRepository.create({
        name: validator.name,
        slug: validator.slug,
        parentId: validator.parentId
      });
      return data;
    } catch (error) {
      throw new AppError(error, 400);
    }
  }
  async get(categoryId) {
    try {
      const products_raw = await this.categoriesRepository.findByCategoryId(categoryId);

      console.log("products_raw", products_raw)

      if(products_raw?.length < 0){
        return products_raw;
      }

      console.log("categories-service-products", products_raw);

      const imgs_raw = await imagesRepository.findManyByProductIds(
        products_raw.map(p => p.id)
      );

      const product_sorted = this.quickSort(products_raw, "id");

      console.log("product_sorted", product_sorted);

      const imgs_sorted = this.quickSort(imgs_raw, "productId");

      console.log("imgs", imgs_raw, "sorted", imgs_sorted);

      let imgIndex = 0;

      const products = product_sorted.map((p) => {
        if (p.id !== imgs_sorted[imgIndex]?.productId) {
          return { ...p, imgs: {} };
        }

        const img = imgs_sorted[imgIndex];
        imgIndex++;

        return {
          ...p,
          imgs: img,
        };
      });

      console.log("products-service3ee", products);
      if (!products || products.lenght < 1) {
        throw new AppError("invalid category", 404);
      }
      return products;
    } catch (error) {
      if (error.code === "P2003") {
        throw new AppError("invalid category", 404);
      }
      throw error;
    }
  }
  async getAll() {
    try {
      const result = await this.categoriesRepository.findAll();
      if(result.lenght === 0) throw new AppError('category', 404);
      return result;
    } catch (error) {
      throw error
    }
  }
}

import quickSort from "../utils/quickSort.js";

import categoriesRepository from "../repositories/categories-repository.js";
import imagesRepository from "../repositories/images-repository.js";

export default new categoriesService(categoriesRepository, quickSort);
