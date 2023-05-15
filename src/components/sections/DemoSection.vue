<template>
  <section class="section demo">
    <div class="container">
      <h2 class="h2 demo__title">/ WOW</h2>
      <div class="demo__content grid grid--lg-gap">
        <div class="grid__col demo__item">
          <img
            class="demo__img"
            src="https://apisf.nikit.me/upload/image/14052281684172648rich-1.png"
            alt="Demo-изображение"
          />
          <RouterLink
            :to="{ name: 'catalog', hash: '#catalog' }"
            class="demo__btn btn"
          >Хочу</RouterLink>
        </div>
        <div class="grid__col demo__item">
          <img
            class="demo__img"
            src="https://apisf.nikit.me/upload/image/14052281684173219style-is-war-1.png"
            alt="Demo-изображение"
          />
          <RouterLink
            :to="{ name: 'catalog', hash: '#catalog' }"
            class="demo__btn btn"
          >Хочу</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DemoSection'
})
</script>

<style scoped>

</style>
