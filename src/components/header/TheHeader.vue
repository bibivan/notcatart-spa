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
        <RouterLink
          to="/"
          class="logo header__logo"
          @click="$emit('closeMenu')"
        >
          <span class="color-primary">@</span>notcatart
        </RouterLink>
        <div class="header__links">
          <RouterLink
            :to="{ name: 'catalog', hash: '#catalog' }"
            class="header__link header__link--catalog"
            @click="$emit('closeMenu')"
          >
            <LikeSvg/>
          </RouterLink>
          <CartBtn @click="$emit('closeMenu')"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import LikeSvg from '@/components/svg-icons/LikeSvg'
import CartBtn from '@/components/header/CartBtn'

export default {
  name: 'TheHeader',
  components: { CartBtn, LikeSvg },
  setup () {
    const isActive = ref(false)

    return { isActive }
  }
}
</script>

<style scoped>
</style>
