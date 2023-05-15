<template>
  <div class="product__images product-images-swiper">
    <Swiper
      :modules="modules"
      :pagination="{ clickable: true }"
      :slidesPerView="1"
      :spaceBetween="50"
    >
      <SwiperSlide
        v-for="img in images"
        :key="'img: ' + img"
      >
        <div class="product-images-swiper__wrapper-img">
          <img
            :src="img"
            loading="lazy"
            alt="изображение товара"
            class="product-images-swiper__img"
            @click="showMultiple"
          >
        </div>
      </SwiperSlide>
    </Swiper>

    <VueEasyLightbox
      :visible="isVisible"
      :imgs="images"
      :index="indexRef"
      :loop="true"
      :moveDisabled="true"
      teleport=".body"
      @hide="onHide"
    >
      <template v-slot:prev-btn="{ prev }">
        <button class="vue-lightbox__btn vue-lightbox__btn--prev" style="display: block;" @click="prev">‹</button>
      </template>

      <template v-slot:next-btn="{ next }">
        <button class="vue-lightbox__btn vue-lightbox__btn--next" style="display: block;" @click="next">›</button>
      </template>

      <template v-slot:close-btn="{ close }">
        <button class="vue-lightbox__close-btn" style="opacity: 1; display: block;" @click="close">×</button>
      </template>

      <template v-slot:toolbar="">
        <div class="visually-hidden"></div>
      </template>

      <template v-slot:loading>
        <div class="visually-hidden"></div>
      </template>
    </VueEasyLightbox>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'

export default defineComponent({
  name: 'ProductImages',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    images: [Array, Object]
  },
  setup () {
    const indexRef = ref(0)
    const isVisible = ref(false)
    const showMultiple = () => {
      indexRef.value = 0 // index of imgList
      isVisible.value = true
    }
    const onHide = () => {
      isVisible.value = false
    }

    return {
      isVisible,
      indexRef,
      showMultiple,
      onHide,
      modules: [Pagination]
    }
  }
})
</script>
