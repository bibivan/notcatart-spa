<template>
  <section id="feedback__section" class="section">
    <div class="container">
      <div class="feedback">
        <div class="feedback">
          <h2 class="feedback__title">ОСТАЛИСЬ ВОПРОСЫ?</h2>
          <img src="~@/assets/img/feedback/notcatart-avatart.jpeg" class="feedback__photo" alt="фото notcatart">
          <div class="feedback__buttons">
            <button class="btn btn--bordered feedback__btn">Звони</button>
            <a
              href="mailto:infonotcatart@gmail.com"
              class="btn btn--bordered feedback__btn"
            >
              Пиши
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FeedbackSection'
})
</script>

<style scoped>

</style>
