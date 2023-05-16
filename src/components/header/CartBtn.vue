<template>
<button class="header__link header__link--cart cart-btn btn-reset" @click="$router.push('cart')">
  <CartSvg/>
  <span v-if="cartContent?.length" class="cart-btn__counter">{{ cartContent?.length }}</span>
</button>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import CartSvg from '@/components/svg-icons/CartSvg'

export default defineComponent({
  name: 'CartBtn',
  components: { CartSvg },
  setup () {
    const store = useStore()
    const cartContent = computed(() => store.getters.getCartContent)

    return { cartContent }
  }
})
</script>

<style scoped>

</style>
