// stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartOpen: false,
    products: []
  }),

  actions: {
    openCart() {
      this.cartOpen = true
    },
    closeCart() {
      this.cartOpen = false
    },
    toggleCart() {
      this.cartOpen = !this.cartOpen
    }
  }
})