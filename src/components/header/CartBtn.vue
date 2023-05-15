<template>
<button class="header__cart">
  <CartSvg/>
</button>
</template>

<script>
import CartSvg from '@/components/svg-icons/CartSvg'
export default {
  name: 'CartBtn',
  components: { CartSvg }
}
</script>

<style scoped>

</style>
