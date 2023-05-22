<template>
  <section id="promo_video_section" class="section bg-color-gray promo-video">
    <h2 class="visually-hidden">promo</h2>
    <div class="promo-video__wrapper">
      <div
        v-if="overlayIsShown"
        :class="['promo-video__overlay', { 'promo-video__overlay--hide': iFrameIsShown }]"
      >
        <button class="btn-reset promo-video__start-btn" @click="iFrameIsShown = true">
          <svg width="54" height="64" viewBox="0 0 54 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54 32L-2.9364e-06 63.1769L-2.10824e-07 0.823083L54 32Z" fill="currentColor"/>
          </svg>
        </button>
        <img src="~@/assets/img/promo-video-overlay/promo-video-overlay.jpg" class="promo-video__cover" alt="promo обложка">
      </div>
      <iframe
        v-if="iFrameIsShown"
        class="promo-video__iframe"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/1BPp0AQYp4E?autoplay=1&amp;amp;rel=0"
        title="YouTube video player"
        allow="autoplay"
        allowfullscreen="true"
        frameborder="0"
        @load="overlayIsShown = false"
      ></iframe>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PromoVideoSection',
  setup () {
    const iFrameIsShown = ref(false)
    const overlayIsShown = ref(true)

    return { iFrameIsShown, overlayIsShown }
  }
})
</script>

<style scoped>

</style>
