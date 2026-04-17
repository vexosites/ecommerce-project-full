import { defineStore } from "pinia";
import productService from '../services/ProductService.js'

export default defineStore('product', {
  state() {
    return {
      loading: false,
      product: null,
      error: null
    }
  },

  actions: {
    async getById(id) {
      try {
        this.loading = true
        this.product = null
        this.error = null

        const data = await productService.getById(id);

        this.product = data.data.result

        console.log('product', this.product)

      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})