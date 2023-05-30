<template>
  <section id="gallery" class="section gallery">
    <div class="container">
      <h2 class="gallery__title">ГАЛЕРЕЯ LIFE</h2>
      <Swiper :grabCursor="true">
        <SwiperSlide
          v-for="(slide, index) in swiperItems"
          :key="'gallery-slide-: ' + index"
        >
          <div class="gallery__slide slide-gallery">
            <div class="slide-gallery__cell">
              <div class="slide-gallery__wrapper-img">
                <img
                  class="slide-gallery__img"
                  :src="slide.firstImg.url"
                  alt="Фото из галлереи"
                      @click="showMultiple(slide.firstImg.index)"
                />
              </div>
            </div>
            <div class="slide-gallery__cell">
              <div class="grid grid--mobile-row grid--wrap grid--mobile-wrap grid--gap-0">
                <div class="grid__col grid__col--w-50">
                  <div class="slide-gallery__wrapper-img">
                    <img
                      class="slide-gallery__img"
                      :src="slide.secondImg.url"
                      alt="Фото из галлереи"
                      @click="showMultiple(slide.secondImg.index)"
                    />
                  </div>
                </div>
                <div class="grid__col grid__col--w-50">
                  <div class="slide-gallery__wrapper-img">
                    <img
                      class="slide-gallery__img"
                      :src="slide.thirdImg.url"
                      alt="Фото из галлереи"
                      @click="showMultiple(slide.thirdImg.index)"
                    />
                  </div>
                </div>
                <div class="grid__col grid__col--w-100">
                  <div class="slide-gallery__wrapper-img slide-gallery__wrapper-img--h-50">
                    <img
                      class="slide-gallery__img"
                      :src="slide.fourthImg.url"
                      alt="Фото из галлереи"
                      @click="showMultiple(slide.fourthImg.index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <RouterLink
        :to="{ name: 'home', hash: '#catalog' }"
        class="btn gallery__btn"
      >Каталог</RouterLink>
    </div>
    <VueEasyLightbox
      :visible="isVisible"
      :imgs="lightBoxItems"
      :index="indexRef"
      :loop="true"
      @hide="onHide"
    >
      <template v-slot:prevBtn="{ prev }">
        <button class="vue-lightbox__btn vue-lightbox__btn--prev" style="display: block;" @click="prev">‹</button>
      </template>

      <template v-slot:nextBtn="{ next }">
        <button class="vue-lightbox__btn vue-lightbox__btn--next" style="display: block;" @click="next">›</button>
      </template>

      <template v-slot:closeBtn="{ close }">
        <button class="vue-lightbox__close-btn" style="opacity: 1; display: block;" @click="close">×</button>
      </template>

      <template v-slot:toolbar="">
        <div class="visually-hidden"></div>
      </template>

      <template v-slot:loading>
        <div class="visually-hidden"></div>
      </template>
    </VueEasyLightbox>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { hideScroll, showScroll } from '@/helpers/controlScrollbar'

export default defineComponent({
  name: 'GallerySection',
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    // формирование массива изображений
    class SwiperItem {
      constructor (url, index) {
        this.url = url
        this.index = index
      }
    }
    const swiperItems = []
    const lightBoxItems = []
    const imagesCount = 30
    for (let imageNumber = 1; imageNumber <= imagesCount; imageNumber++) {
      const imageUrl = `./img/gallery/gallery-photo-${imageNumber}.jpg`
      lightBoxItems.push(imageUrl)

      if (imageNumber % 5 === 1) {
        swiperItems.push({
          firstImg: new SwiperItem(imageUrl, imageNumber - 1)
        })
      } else if (imageNumber % 5 === 2) {
        swiperItems[swiperItems.length - 1].secondImg = new SwiperItem(imageUrl, imageNumber - 1)
      } else if (imageNumber % 5 === 3) {
        swiperItems[swiperItems.length - 1].thirdImg = new SwiperItem(imageUrl, imageNumber - 1)
      } else if (imageNumber % 5 === 4) {
        swiperItems[swiperItems.length - 1].fourthImg = new SwiperItem(imageUrl, imageNumber - 1)
      }
    }

    // light-box
    const indexRef = ref(0)
    const isVisible = ref(false)
    const showMultiple = index => {
      hideScroll()
      indexRef.value = index // index of imgList
      isVisible.value = true
    }
    const onHide = () => {
      isVisible.value = false
      setTimeout(() => showScroll(), 300)
    }

    return {
      swiperItems,
      lightBoxItems,
      isVisible,
      indexRef,
      showMultiple,
      onHide
    }
  }
})
</script>

<style scoped>

</style>
