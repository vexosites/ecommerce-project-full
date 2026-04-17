<template>
<div class="bg-[#e7e7e7] h-screen w-[24rem] absolute right-0 top-0 z-20">
<button @click="cartStore.closeCart">x</button>
<div v-if="cartStore.products.length === 0" class="text-black">cart empity</div>
</div>
</template>

<script>
import { useCartStore } from '../stores/cartStore.js';

export default{
data(){
    return{
        cartStore: useCartStore()
    }
}
}
</script>