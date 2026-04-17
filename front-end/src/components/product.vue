<template>
<div class="min-h-full w-[20rem] flex flex-col flex-nowrap items-center justify-center cursor-pointer" @click="$router.push({path:'/product/' + product.slug,
    query: {
        id: product.id
    }
})">
   <div class="w-[20rem] h-[20rem] border border-sky-200 flex items-center justify-center overflow-hidden bg-white">
  
  <img 
    :src="product.imgs?.url" 
    alt="" 
    class="w-full h-full object-contain" 
    v-if="product.imgs?.url" 
  >
  
  <img 
    src="../assets/Placeholder items illustration with text.png" 
    alt="" 
    class="w-full h-full object-contain opacity-60"
    v-else
  >

</div>
    <div class="flex flex-col justify-center items-center">
        <p class="text-nowrap cursor-text mb-9 mt-4 font-[arial] text-[#1c1c1c]">{{ product.name }}</p>
        <p class="cursor-text">R$ {{ product.price }}</p>
    </div>
</div>
</template>
<script>
export default{
    data(){
    return{
        product: this.$props.productStore
    } 
    },
    props: ['product'],
}
</script>