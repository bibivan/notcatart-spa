<template>
  <section id="feedback__section" class="section">
    <div class="container">
      <div class="feedback">
        <h4 class="h4 mb-0 feedback__title">/ есть ещё вопросы?</h4>
        <p class="text feedback__answer">пиши</p>
        <img src="./img/feedback/photo.jpeg" class="feedback__photo" alt="фото notcatart">
        <div class="feedback__phone phone-block">
          <span class="text-bold mr-5 phone-block__label">Телефон:</span>
          <a href="+71234567" class="phone-block__link link">+7 123 45 67</a>
        </div>
        <div class="feedback__email email-block">
          <span class="text-bold mr-5 email-block__label">E-mail:</span>
          <a href="+71234567" class="email-block__link link">hvoyastore@email.com</a>
        </div>
        <ul class="social feedback__socials">
          <li class="social__item">
            <a href="#" target="_blank" class="social__link social__link--fb" aria-label="Наша страничка во вКонтакте">
              <svg fill="#fff">
                <use xlink:href="./img/sprite.svg#vk"></use>
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a href="#" target="_blank" class="social__link social__link--inst" aria-label="Наша страничка в Instagram">
              <svg fill="#fff">
                <use xlink:href="./img/sprite.svg#instagram"></use>
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a href="#" target="_blank" class="social__link social__link--email" aria-label="Наша электронная почта">
              <svg fill="#fff">
                <use xlink:href="./img/sprite.svg#email"></use>
              </svg>
            </a>
          </li>
        </ul>
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
