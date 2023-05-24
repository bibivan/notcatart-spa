<template>
<section class="some-info">
  <div class="some-info__outer-photo">
    <Swiper
      :modules="modules"
      :effect="'fade'"
      :loop="true"
      :autoplay="{
        delay: 1700
      }"
    >
      <SwiperSlide
        v-for="imgUrl in slideUrls"
        :key="'some-slide-' + imgUrl"
      >
        <div class="some-info__photo" :style="`background-image: url('${imgUrl}')`"/>
      </SwiperSlide>
    </Swiper>
  </div>
  <div class="some-info__outer-text">
    <div class="some-info__text">
      <h2 class="some-info__headline">
        {{ headline }}
      </h2>
      <div class="some-info__description">
        <slot/>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper'
import 'swiper/css/effect-fade'

export default defineComponent({
  name: 'SomeInfoSection',
  components: { Swiper, SwiperSlide },
  props: {
    slideUrls: Array,
    headline: String,
    description: String
  },
  setup () {
    return { modules: [Autoplay, EffectFade] }
  }
})
</script>

<style scoped>

</style>
