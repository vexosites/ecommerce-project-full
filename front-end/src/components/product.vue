<template>
<div class="min-h-full w-[20rem] flex flex-col flex-nowrap border border-red-100 items-center justify-center cursor-pointer" @click="TakeTo(product.slug)">
    <img src="" alt="" class="">
    <div class="">
        <p class="text-nowrap cursor-text">{{ product.name }}</p>
        <p class="cursor-text">{{ product.price }}</p>
    </div>
</div>
</template>

<script>
import takeTo from "../utils/TakeTo.js"
export default{
    data(){
    return{
        product: this.$props.productStore
    } 
    },
    methods:{
    TakeTo(path) {
    return takeTo(path);
    }
    },
    props: ['product']
}
</script>