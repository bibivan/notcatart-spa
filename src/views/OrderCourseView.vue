<template>
  <section v-bind="$attrs" class="bg-white section-fullscreen">
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
      <div class="full-screen-form__confirm">
        Регистрируясь, ты соглашаешься с нашей<br>
        <RouterLink to="/privacy" class="checkbox__link">
          Политикой конфиденциальности
        </RouterLink>
      </div>
      <button
        class="cross-btn full-screen-form__back"
        @click="$router.back()"
      />
    </form>
  </section>
  <MessageModal
    v-if="messageModalIsShown"
    :dataSending="dataSending"
    :message="responseMessage"
    @closeModal="messageModalIsShown = false"
  />
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from 'vuex'
import { useResponseModal } from '@/helpers/useResponseModal'
import TextInput from '@/components/base/TextInput'
import PhoneInput from '@/components/base/PhoneInput'
import MessageModal from '@/components/message-modal/MessageModal'

export default defineComponent({
  name: 'OrderCourseView',
  components: { MessageModal, PhoneInput, TextInput },
  setup () {
    const {
      dataSending,
      responseMessage,
      messageModalIsShown
    } = useResponseModal()
    const store = useStore()
    const userData = reactive({
      notification_title: 'Заявка на онлайн курс notcatart'
    })
    const v$ = useVuelidate()

    const onSubmit = async () => {
      const result = await v$.value.$validate()
      console.log(result)
      if (result) {
        messageModalIsShown.value = true
        dataSending.value = true
        const response = await store.dispatch('sendCourseOrder', userData)
        if (response.success) {
          responseMessage.value = 'Запись на онлайн обучение от@notcatartоформлена успешно!'
        } else {
          responseMessage.value = 'Произошла ошибка в оформлении! Попробуй еще раз'
        }
        dataSending.value = false
      }
    }

    return {
      dataSending,
      responseMessage,
      messageModalIsShown,
      userData,
      onSubmit,
      v$
    }
  }
})
</script>

<style scoped>

</style>
