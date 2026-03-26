<template>
    <div class="min-h-screen w-full bg-[#0202]">
      <headerSkeleton v-if="HeaderStore.loading"/>
      <headerComponent v-else :categories="HeaderStore.state.categories"/>
      <categorySkeleton v-if="CategoryStore.state.loading"/>      
       <category v-else :category="CategoryStore.state.products"/>
    </div>
  </template>
  
  <script>
  import category from "../components/category.vue"
  import CategoryStore from "../stores/CategoryStore.js";
  import categorySkeleton from "../components/categorySkeleton.vue"
  import header from "../components/header.vue";
  import headerSkeleton from "../components/headerSkeleton.vue";
  import headerStore from "../stores/HeaderStore.js";
  
  export default {
    data() {
      return {
        HeaderStore: headerStore,
        CategoryStore: CategoryStore
      };
    },
   
    components: {
      headerComponent: header,
      headerSkeleton,
      category,
      categorySkeleton
    },
  
    async mounted() {
      const headerCategorie = await this.HeaderStore.Categories();
      console.log('store', this.HeaderStore)
      const categorie = await this.CategoryStore.getById(1);
      console.log('catett', categorie)
    }
  };
  </script>
  