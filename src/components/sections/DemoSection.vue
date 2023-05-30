<template>
  <section class="section demo">
    <div class="container">
      <h2 class="h2 demo__title">WOW</h2>
      <div class="demo__content grid grid--xxl-gap">
        <div class="grid__col demo__item">
          <img
            class="demo__img"
            src="https://apisf.nikit.me/upload/image/14052281684172648rich-1.png"
            alt="Demo-изображение"
          />
          <button
            class="demo__btn btn"
            @click="onPutProductToCart(0)"
          >Хочу</button>
        </div>
        <div class="grid__col demo__item">
          <img
            class="demo__img"
            src="https://apisf.nikit.me/upload/image/14052281684173219style-is-war-1.png"
            alt="Demo-изображение"
          />
          <button
            class="demo__btn btn"
            @click="onPutProductToCart(1)"
          >Хочу</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DemoSection',
  setup () {
    const store = useStore()
    const products = computed(() => store.getters.getProducts)
    const onPutProductToCart = index => {
      store.commit('addItemToCart', products.value[index])
    }

    return {
      products,
      onPutProductToCart
    }
  }
})
</script>

<style scoped>

</style>
