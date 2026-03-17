<template>
    <div class="min-h-screen w-full bg-[#0202]">
      <headerSkeleton v-if="HeaderStore.loading"/>
      <headerComponent v-else :categories="HeaderStore.state.categories"/>
    </div>
  </template>
  
  <script>
  import header from "../components/header.vue";
  import headerSkeleton from "../components/headerSkeleton.vue";
  import headerStore from "../stores/HeaderStore.js";
  
  export default {
    data() {
      return {
        HeaderStore: headerStore
      };
    },
  
    components: {
      headerComponent: header,
      headerSkeleton
    },
  
    async mounted() {
      const result = await this.HeaderStore.Categories();
      console.log('store', this.HeaderStore)
    }
  };
  </script>
  