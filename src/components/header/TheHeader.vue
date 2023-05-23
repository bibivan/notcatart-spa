<template>
  <header id="the_header" class="header">
    <div class="container header__container">
      <div class="header__content">
        <div class="header__main">
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
            class="logo header__logo header__logo--hide-desktop-tablet"
            @click="$emit('closeMenu')"
          >
            <span class="color-primary">@</span>notcatart
          </RouterLink>
          <button
            class="btn-reset search-btn header__search header__search--with-divider"
            @click="$emit('closeMenu')"
          >
            <SearchSvg/>
          </button>
        </div>
        <RouterLink
          to="/"
          class="logo header__logo header__logo--hide-mobile"
          @click="$emit('closeMenu')"
        >
          <span class="color-primary">@</span>notcatart
        </RouterLink>
        <div class="header__links">
          <button class="btn-reset header__link header__link--catalog">
            <LikeSvg/>
          </button>
          <button class="btn-reset header__link header__link--catalog">
            <ProfileSvg/>
          </button>
          <RouterLink to="cart">
            <CartBtn/>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import LikeSvg from '@/components/svg-icons/LikeSvg'
import CartBtn from '@/components/header/CartBtn'
import SearchSvg from '@/components/svg-icons/SearchSvg'
import ProfileSvg from '@/components/svg-icons/ProfileSvg'

export default {
  name: 'TheHeader',
  components: { ProfileSvg, SearchSvg, CartBtn, LikeSvg },
  setup () {
    const isActive = ref(false)

    return { isActive }
  }
}
</script>

<style scoped>
</style>
