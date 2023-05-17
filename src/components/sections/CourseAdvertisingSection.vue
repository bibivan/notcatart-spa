<template>
  <section id="contact_us_section" class="section contact-us p-0">
    <div class="container">
      <div class="contact-us__holder py-x1">
        <div class="contact-us__text">
          <p class="text contact-us__caption">
            / Ты — мастер своего макияжа
          </p>
          <h2 class="h1 contact-us__huge-text">Хочешь научиться круто краситься и красить?</h2>
          <p class="text contact-us__description">
            Онлайн обучение с яркими идеями от <span class="notcatart">@notcatart</span>
            создано для тебя.
          </p>
        </div>
        <form id="contact_us_form" class="contact-us__form" action="#">
          <h3 class="h4 color-black">Запишись на курс, заполнив форму ниже и жми — хочу</h3>
          <p class="text small-text color-black mt-0">Мы обработаем твою информацию и свяжемся с тобой быстрее, чем принято.</p>
          <div class="contact-us__input input-block">
            <label class="input-block__label" for="contact_us_name">Имя</label>
            <input id="contact_us_name" class="input-block__input" type="text">
          </div>
          <div class="contact-us__input input-block">
            <label class="input-block__label" for="contact_us_email">E-mail</label>
            <input id="contact_us_email" class="input-block__input" type="text">
          </div>
          <div class="contact-us__input input-block">
            <label class="input-block__label" for="contact_us_phone">Телефон</label>
            <input id="contact_us_phone" class="input-block__input" type="tel">
          </div>
          <button class="btn contact-us__btn">Хочу</button>
          <label class="contact-us__privacy privacy">
            <input class="privacy__checkbox" type="checkbox">
            <span class="text small-text color-black privacy__text">Регистрируясь, ты соглашаешься с нашей Политикой конфиденциальности.</span>
          </label>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseAdvertisingSection'
})
</script>

<style scoped>

</style>
