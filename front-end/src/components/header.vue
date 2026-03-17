<template>
  <header class="w-full h-[10vh] flex justify-center items-center bg-gray-700">
    <div class="logomark">
      <img :src="null" alt="../assets/">
    </div>
    <ul class="flex flex-row gap-10 m-0 p-0 list-none justify-center">
      <li v-for="category in $props.categories" :key="category.id" class="text-white cursor-pointer" @click="TakeTo(category.slug)">
        {{ category.name }}
      </li>
    </ul>

  </header> 
</template>

<script>
import TakeTo from '../utils/TakeTo.js'

export default {
  data(){
    return{
     TakeTo 
    }
  },
  props: ["categories"],
  mounted(){
    console.log('prop', this.$props.categories)
  }
};
</script>
