<template>
  <section class="hero">
    <div class="hero__wrapper">
      <div class="container">
        <div class="hero__content">
          <h1 class="visually-hidden">notcatart</h1>
          <h2 class="hero__title">NEW </h2>
          <p class="hero__description">
            <span>ПАЛЕТКИ ТЕНЕЙ</span>
            <span>от
              <RouterLink to="/" class="logo hero__logo">
                <span class="color-primary">@</span>notcatart -
              </RouterLink>
            </span>
            <span>ЭТО МАКСИМУМ</span>
            <span>ПИГМЕНТАЦИИ</span>
          </p>
        </div>
      </div>
    </div>

    <div class="hero__swiper-holder">
      <Swiper
        class="hero-swiper"
        :modules="modules"
        :loop="true"
        :pagination="{ clickable: true }"
        :slidesPerView="1"
      >
        <SwiperSlide>
          <div class="hero-swiper__slide hero-swiper__slide--1" style="background-image: url('./img/hero/hero-1.jpeg')"/>
        </SwiperSlide>
        <SwiperSlide>
          <div class="hero-swiper__slide hero-swiper__slide--1" style="background-image: url('./img/hero/hero-2.jpeg')"/>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'

export default defineComponent({
  name: 'HeroSection',
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    const heroImg1 = ref('background-image: url("./img/hero/hero-1.jpg")')
    return {
      modules: [Pagination],
      heroImg1
    }
  }
})
</script>

<style scoped>

</style>
