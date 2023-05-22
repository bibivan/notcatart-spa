<template>
  <section class="hero">
    <div class="hero__wrapper">
      <div class="container">
        <div class="hero__content">
          <h1 class="visually-hidden">notcatart</h1>
          <h2 class="h1 hero__title">NEW </h2>
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
        :loop="true"
        :slidesPerView="1"
        :grabCursor="true"
      >
        <SwiperSlide>
          <div class="hero-swiper__slide hero-swiper__slide--1"/>
        </SwiperSlide>
        <SwiperSlide>
          <div class="hero-swiper__slide hero-swiper__slide--2"/>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default defineComponent({
  name: 'HeroSection',
  components: {
    Swiper,
    SwiperSlide
  }
})
</script>

<style scoped>

</style>
