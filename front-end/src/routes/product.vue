<template>
        <headerSkeleton v-if="HeaderStore.loading"/>
        <headerComponent v-else :categories="HeaderStore.state.categories"/>
  <div class="flex items-center justify-start w-screen h-screen">
    <!-- Loading -->
    <div v-if="store.loading">
      <p>Carregando...</p>
    </div>

    <!-- Conteúdo -->
    <div v-else-if="store.product" class="flex flex-row items-center relative bottom-40 left-56">
      <div class="flex flex-row gap-20 items-center justify-center">
        <button v-if="store.product.imgs.length > 1" @click="scrollLeft" class="relative top-[50%] left-[50px] cursor-pointer"><</button>
      <div class="w-[40rem] h-[20rem] overflow-auto no-scrollbar flex flex-row relative gap-2 rounded-[3px] bg-[#e2e2e2]" ref="carrossel">

        <img 
          v-for="(img, index) in store.product.imgs" 
          :key="index" 
          :src="img.url"
          alt=""
        >
        
      </div>
      <button v-if="store.product.imgs.length" @click="scrollRight" class="relative top-[50%] right-[50px] cursor-pointer">></button>
    </div>
    <div class="flex flex-col gap-3 relative bottom-32">
      <h1 class="text-[2.40rem]">{{ store.product.name }}</h1>
      <p class="text-[1.20rem]">R$ {{ store.product.price }}</p>
    </div>
    </div>

    <!-- Erro -->
    <div v-else>
      <p>Erro ao carregar produto</p>
    </div>
  </div>
</template>

<script>
import HeaderSkeleton from '../components/headerSkeleton.vue';
import headerComponent from '../components/header.vue'
import ProductStore from '../stores/ProductStore.js'
import { headerStore } from '../stores/HeaderStore.js'
export default {
  data() {
    return {
      store: ProductStore(),
      HeaderStore: headerStore,
    }
  },
  methods:{
    scrollRight(){
        this.$refs.carrossel.scrollTo(203, 0)
    },
    scrollLeft(){
        this.$refs.carrossel.scrollTo(-243, 0)
    }
  },
  async mounted() {

      if (this.HeaderStore?.state?.categories.length < 1) {
      await this.HeaderStore.getCategoriesStore();
    }

    const id = this.$route.query.id
    await this.store.getById(id)
    console.log('store', this.store.product)
  },
  components: {
    HeaderSkeleton,
    headerComponent
  }
}
</script>