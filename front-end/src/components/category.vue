<template>
<section class="bg-[#cacaca] flex min-h-[21rem] px-9 gap-20">
    <Product v-for="product in category" :product="product"></Product>
</section>
</template>

<script>
import Product from "../components/product.vue"
import CategoryStore from "../stores/CategoryStore.js"
export default{
    props: ['category'],
    components: {
    Product
}
}
</script>