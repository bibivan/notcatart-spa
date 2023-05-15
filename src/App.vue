<template>
  <div :class="[ 'app-holder', { 'menu-opened': menuIsOpened }]">
    <TheHeader @burgerClicked="menuIsOpened = !menuIsOpened"/>
    <router-view/>
    <TheFooter/>
  </div>
</template>

<style lang="scss">
</style>
<script>
import { defineComponent, onMounted, provide, ref } from 'vue'
import { apiFetch } from '@/helpers/send-requests'
import renderResponse from '@/helpers/render-response'
import config from '@/config'
import TheHeader from '@/components/header/TheHeader'
import TheFooter from '@/components/footer/TheFooter'

export default defineComponent({
  components: { TheFooter, TheHeader },
  setup () {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE0MDUyMjgifQ.zCBOqxmDZp_3VZcvGad0wQ-pPwdhKX4pBDZ93pBjlP8'
    const menuIsOpened = ref(false)
    const products = ref()

    provide('products', products)

    onMounted(() => apiFetch(config.apiUrl + 'products/get', token)
      .then(res => { products.value = renderResponse(res) }))

    return { menuIsOpened }
  }
})
</script>

<style lang="scss">
@import "assets/scss/main";
</style>
