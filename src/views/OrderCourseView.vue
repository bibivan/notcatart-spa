<template>
  <section class="bg-white section-fullscreen">
    <h1 class="visually-hidden">Заказать онлайн курс</h1>
    <form id="contact_us_form" class="full-screen-form" @submit.prevent="onSubmit">
      <h3 class="full-screen-form__title">Запишись на курс, заполнив форму ниже и жми - хочу</h3>
      <p class="full-screen-form__description">Мы обработаем твою информацию и свяжемся с тобой быстрее, чем принято</p>
      <TextInput
        v-model="userData.name"
        id="тфьу_order_course_input"
        class="full-screen-form__field"
        :bordered="true"
        type="text"
        label="Имя"
      />
      <TextInput
        v-model="userData.email"
        id="email_order_course_input"
        class="full-screen-form__field"
        :bordered="true"
        type="email"
        label="E-mail"
      />
      <PhoneInput
        v-model="userData.phone"
        id="phone_order_course_input"
        class="full-screen-form__field"
        :bordered="true"
      />
      <button
        class="btn full-screen-form__btn"
        :disabled="v$.$silentErrors.length"
      >Хочу</button>
      <PrivacyConfirm
        v-model="userData.privacyIsConfirmed"
        class="full-screen-form__confirm "
      />
    </form>
  </section>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import TextInput from '@/components/base/TextInput'
import PhoneInput from '@/components/base/PhoneInput'
import PrivacyConfirm from '@/components/base/PrivacyConfirm'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'OrderCourseView',
  components: { PrivacyConfirm, PhoneInput, TextInput },
  setup () {
    const store = useStore()
    const userData = reactive({})
    const v$ = useVuelidate()

    const onSubmit = async () => {
      const result = await v$.value.$validate()
      console.log(result)
      if (result) await store.dispatch('sendCourseOrder', userData)
    }

    return {
      userData,
      onSubmit,
      v$
    }
  }
})
</script>

<style scoped>

</style>
