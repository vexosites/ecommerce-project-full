class ProductsRedisRepository {
  constructor(redisProvide, categoryRedis) {
    this.redisProvide = redisProvide;
    this.categoryRedis = categoryRedis;
  }

  product_convert(product) {
    return {
      id: String(product.id),
      name: String(product.name),
      price: String(product.price),
      stock: String(product.stock),
      slug: String(product.slug),
      description: String(product.description),
      categoryId: String(product.categoryId),
      active: String(product.active ?? true),
    };
  }

  async create(product) {
    const productKey = `product:${String(product.id)}`;
    const productNameKey = `product-name:${product.name}`;

    let productRedis = await this.redisProvide.hGetAll(productKey);

    if (Object.keys(productRedis).length === 0) {
      await this.redisProvide.hSet(
        productKey,
        this.product_convert(product)
      );

      productRedis = await this.redisProvide.hGetAll(productKey);
    }

    /*
      Aqui assumimos que o repository de categoria
      possui um método para adicionar o productId
      na categoria.
    */
    await this.categoryRedis.addProduct(
      String(product.categoryId),
      String(product.id)
    );

    let productName = await this.redisProvide.hGetAll(productNameKey);

    if (Object.keys(productName).length === 0) {
      await this.redisProvide.hSet(productNameKey, {
        productId: String(product.id),
      });

      productName = await this.redisProvide.hGetAll(productNameKey);
    }

    return {
      productRedis,
      productName,
    };
  }

  async set(products) {
    const pipeline = this.redisProvide.multi();

    for (const product of products) {
      pipeline.hSet(
        `product:${String(product.id)}`,
        this.product_convert(product)
      );
    }

    const result = await pipeline.exec();

    return result;
  }

  async findById(id) {
    const result = await this.redisProvide.hGetAll(
      `product:${String(id)}`
    );

    if (Object.keys(result).length === 0) {
      return null;
    }

    return result;
  }

  async findManyProductsByCategoryId(categoryId) {
  const category = await this.categoryRedis.findCategoryByCategoryId(
    String(categoryId)
  );

  if (!category || !Array.isArray(category)) {
    return null;
  }

  const pipeline = this.redisProvide.multi();

  for (const id of category) {
    pipeline.hGetAll(`product:${String(id)}`);
  }

  const results = await pipeline.exec();

  if (!results) {
    return [];
  }

  const products = results
    .map((result) => {
      if (Array.isArray(result)) {
        return result[1];
      }

      return result;
    })
    .filter(
      (product) =>
        product &&
        typeof product === "object" &&
        Object.keys(product).length > 0
    );

  return products;
}

  async findByName(name) {
    const result = await this.redisProvide.hGetAll(
      `product-name:${name}`
    );

    if (Object.keys(result).length === 0) {
      return null;
    }

    return result;
  }
}

import redisClient from "../redisClient.js";
import categoriesRedisRepository from "./categories-redis-repository.js";

export default new ProductsRedisRepository(
  redisClient,
  categoriesRedisRepository
);