<template>
  <section id="course_advertising_section" class="section course-advertising">
    <div class="course-advertising__text">
      <p class="course-advertising__item-text course-advertising__item-text--caption">
        / Ты мастер своего макияжа
      </p>
      <h2 class="course-advertising__title">Хочешь <br>научиться <br>круто <br>краситься и <br>красить?</h2>
      <p class="course-advertising__item-text">
        Онлайн обучение с яркими <br class="hide-desktop">идеями <br class="hide-tablet hide-mobile">от
        <span class="course-advertising__item-text course-advertising__item-text--notcatart">
          <span class="color-primary">@</span>notcatart
        </span>
        <br class="hide-desktop hide-mobile">создано <br class="hide-desktop hide-tablet">для тебя.
      </p>
      <RouterLink :to="{ name: 'orderCourse' }" class="btn btn--bordered">Хочу</RouterLink>
    </div>
    <div class="course-advertising__image"/>
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
