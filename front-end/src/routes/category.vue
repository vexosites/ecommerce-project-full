<template>
<headerSkeleton v-if="headerStore.loading"/>
<headerComponent v-else :categories="headerStore.state.categories"/>

<section class="mt-9 px-8 flex justify-center">
  <div class="grid grid-cols-4 gap-20">
    <Product 
      v-for="product in categoryStore.products" 
      :product="product"
    />
  </div>
</section>

<Footer/>
</template>

<script>
import header from "../components/header.vue";
import Footer from "../components/footer.vue";
import Product from "../components/product.vue";
import useCategoryStore from "../stores/CategoryStore.js"
import HeaderSkeleton from "../components/headerSkeleton.vue";
import { headerStore } from "../stores/HeaderStore.js";
export default{
    data(){
        return{
            categoryStore: useCategoryStore(),
            headerStore: headerStore
        }
    },

    async mounted(){
             if(this.headerStore?.state?.categories.length < 1){
      await this.headerStore.getCategoriesStore();
      }
        await this.categoryStore.getById(parseInt(this.$route.query.id))
        console.log("c", this.$route.query.id)
        console.log(this.categoryStore)
    },

    components: {
    Product,
    Footer,
    HeaderComponent: header,
    HeaderSkeleton
}
}
</script>