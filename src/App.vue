<template>
  <div :class="[ 'app-holder', { 'menu-opened': menuIsOpened }]">
    <TheHeader
      @burgerClicked="menuIsOpened = !menuIsOpened"
      @closeMenu="menuIsOpened = false"
    />
    <router-view/>
    <TheFooter/>
    <Transition name="translate-x">
      <MainMenu
        v-show="menuIsOpened"
        @closeMenu="menuIsOpened = false"
      />
    </Transition>
  </div>
</template>

<style lang="scss">
</style>
<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import TheHeader from '@/components/header/TheHeader'
import TheFooter from '@/components/footer/TheFooter'
import MainMenu from '@/components/mainMenu/MainMenu'
import { useStore } from 'vuex'

export default defineComponent({
  components: { MainMenu, TheFooter, TheHeader },
  setup () {
    const menuIsOpened = ref(false)
    const store = useStore()

    // установка нового токена
    const token = computed(() => store.getters.getToken)
    const setProperties = data => store.commit('setToken', data.token)
    watch(token, () => store.dispatch('loadProducts'))

    // инициализация приложения
    onMounted(() => store.commit('setCartContent'))

    return { menuIsOpened, setProperties }
  }
})
</script>

<style lang="scss">
@import "assets/scss/main";
</style>
