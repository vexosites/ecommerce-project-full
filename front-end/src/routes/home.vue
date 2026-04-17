<template>
    <div class="min-h-screen w-full bg-[rgb(236,236,236)]">
      <headerSkeleton v-if="HeaderStore.loading"/>
      <headerComponent v-else :categories="HeaderStore.state.categories"/>
      <Banner/>
      <categorySkeleton v-if="CategoryStore.loading"/>      
       <category v-else :category="CategoryStore.products"/>
       <Footer/>
    </div>
  </template>
  
  <script>
  import category from "../components/category.vue"
  import categorySkeleton from "../components/categorySkeleton.vue"
  import header from "../components/header.vue";
  import headerSkeleton from "../components/headerSkeleton.vue";
  import { headerStore } from "../stores/HeaderStore.js";
  import Banner from "../components/banner.vue";
  import Footer from "../components/footer.vue";
  import useCategoryStore from "../stores/CategoryStore.js";

  export default {
   
    components: {
      headerComponent: header,
      headerSkeleton,
      category,
      categorySkeleton,
      Banner,
      Footer
    },
  data() {
    return {
      HeaderStore: headerStore, // normal
      CategoryStore: useCategoryStore() // 👈 corrigido
    };
  },

  async mounted() {
    if (this.HeaderStore?.state?.categories.length < 1) {
      await this.HeaderStore.getCategoriesStore();
    }

    if (!this.CategoryStore.products || this.CategoryStore.products.length < 1) {
      await this.CategoryStore.getById(1);
    }
  }
  };
  </script>
  