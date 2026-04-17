
<template>
<section class="relative px-16">
    
    <!-- Botão esquerda -->
    <button 
        v-if="showLeft"
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow px-3 py-2">
        ◀
    </button>

    <!-- Lista -->
    <div 
        ref="scrollContainer"
        @scroll="checkScroll"
        class="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
        :class="{ 'justify-center': !isScrollable }"
    >
        <Product 
            v-for="product in category" 
            :key="product.id"
            :product="product"
            class="flex-shrink-0"
        />
    </div>

    <!-- Botão direita -->
    <button 
        v-if="showRight"
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow px-3 py-2">
        ▶
    </button>

</section>
</template>

<script>
import Product from "../components/product.vue"

export default {
    props: ['category'],
    components: { Product },

    data() {
        return {
            showLeft: false,
            showRight: false,
            isScrollable: false,
            scrollSize: 0
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.defineScroll()
            this.checkScroll()
        })

        window.addEventListener('resize', this.handleResize)
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        scrollLeft() {
            this.$refs.scrollContainer.scrollBy({
                left: -this.scrollSize,
                behavior: 'smooth'
            })
        },

        scrollRight() {
            this.$refs.scrollContainer.scrollBy({
                left: this.scrollSize,
                behavior: 'smooth'
            })
        },

        checkScroll() {
            const el = this.$refs.scrollContainer
            if (!el) return

            const scrollLeft = el.scrollLeft
            const maxScrollLeft = el.scrollWidth - el.clientWidth

            this.isScrollable = el.scrollWidth > el.clientWidth

            this.showLeft = scrollLeft > 0
            this.showRight = scrollLeft < maxScrollLeft - 5
        },

        defineScroll() {
            const el = this.$refs.scrollContainer
            if (!el) return

            // Scroll baseado na largura visível do container
            this.scrollSize = el.clientWidth
        },

        handleResize() {
            this.defineScroll()
            this.checkScroll()
        }
    },

    watch: {
        category() {
            this.$nextTick(() => {
                this.defineScroll()
                this.checkScroll()
            })
        }
    }
}
</script>