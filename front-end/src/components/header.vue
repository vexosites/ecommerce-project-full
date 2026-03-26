<template>
  <header class="w-full min-h-[80px] flex justify-center items-center gap-20 bg-[#ffffffaa] px-20">

    <!-- Logo -->
    <div class="flex items-center justify-center h-[60px]">
  <img 
    src="../assets/lg.png" 
    alt="Logo" 
    class="object-contain max-w-full max-h-full" 
  />
</div>
    <!-- Categories -->
    <ul class="flex gap-[50px] list-none items-center justify-center">
<li 
  v-for="category in $props.categories" 
  :key="category.id"
  class="relative"
  @mouseenter="openModal(category.id)"
  @mouseleave="scheduleClose(category.id)"
>
  <span 
    @click="TakeTo(category.slug)"
    class="text-[#1d1d1d] text-[0.90rem] cursor-pointer hover:text-gray-400 transition"
  >
    {{ category.name }}
  </span>

  <div 
    v-if="category.children.length > 0"
    v-show="categoryy[category.id]"
    class="bg-[#ffffff] absolute top-10 flex flex-col items-start justify-start gap-2 min-h-[90px] w-40 pr-7 pl-4 py-3"
  >
    <span
      v-for="child in category.children" 
      :key="child.id" 
      @click="TakeTo(child.slug)"
    >
      {{ child.name }}
      <div>
        <img src="" v-if="true">
        <img src="" v-else>
      </div>
    </span>
  </div>
</li>
    </ul>
    <!-- Icons -->
    <div class="flex justify-center gap-9">
      <button class="w-6">
        <img src="../assets/search.png" alt="Search" class="w-full">
      </button>
      <button class="w-7">
        <img src="../assets/shopping-bag.png" alt="Shopping cart" class="w-full">
      </button>
    </div>

  </header> 
</template>


<script>
import TakeTo from '../utils/TakeTo.js'

export default {
data(){
  return {
    categoryy: {},
    timeout: null,
    TakeTo
  }
},
methods: {
  openModal(id){
    clearTimeout(this.timeout),
    this.categoryy = {};
    this.categoryy[id] = true
  },
  scheduleClose(id){
    this.timeout = setTimeout(() => {
      this.categoryy[id] = false
    }, 250)
  }

  },
  props: ["categories"],
  mounted(){
    console.log('propsssss', this.$props.categories)
  }
};
</script>
