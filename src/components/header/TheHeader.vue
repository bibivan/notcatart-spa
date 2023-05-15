<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__content">
        <button
          class="burger header__burger"
          aria-label="Открыть меню"
          aria-expanded="false"
          @click="$emit('burgerClicked')"
        >
          <span class="burger__line"></span>
        </button>
        <RouterLink to="/" class="logo header__logo">
          <span class="color-primary">@</span>notcatart
        </RouterLink>
        <div class="header__links">
          <RouterLink
            :to="{ name: 'catalog', hash: '#catalog' }"
            class="header__link header__link--catalog"
          >
            <LikeSvg/>
          </RouterLink>
          <RouterLink
            to="cart"
            class="header__link header__link--cart"
          >
            <CartSvg/>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import LikeSvg from '@/components/svg-icons/LikeSvg'
import CartSvg from '@/components/svg-icons/CartSvg'

export default {
  name: 'TheHeader',
  components: { CartSvg, LikeSvg },
  setup () {
    const isActive = ref(false)

    return { isActive }
  }
}
</script>

<style scoped>
</style>
