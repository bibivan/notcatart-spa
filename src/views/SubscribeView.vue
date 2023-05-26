<template>
  <section class="bg-white section-fullscreen">
    <h1 class="visually-hidden">Подписаться на новости</h1>
    <form id="contact_us_form" class="full-screen-form" @submit.prevent="onSubmit">
      <h3 class="full-screen-form__title">
        Подпишись и получай свежую информацию о новинках
        и эксклюзивных предложениях
      </h3>
      <TextInput
        v-model="userData.email"
        id="subscribe_email_input"
        class="full-screen-form__field"
        :bordered="true"
        type="email"
        label="E-mail"
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
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { useResponseModal } from '@/helpers/useResponseModal'
import TextInput from '@/components/base/TextInput'
import MessageModal from '@/components/message-modal/MessageModal'

export default defineComponent({
  name: 'SubscribeView',
  components: { MessageModal, TextInput },
  setup () {
    const {
      dataSending,
      responseMessage,
      messageModalIsShown
    } = useResponseModal()
    const store = useStore()
    const userData = reactive({
      notification_title: 'Заявка на подписку с сайта @notacart'
    })
    const v$ = useVuelidate()

    const onSubmit = async () => {
      const result = await v$.value.$validate()
      if (result) {
        messageModalIsShown.value = true
        dataSending.value = true
        const response = await store.dispatch('subscribeToNews', userData)
        if (response.success) {
          responseMessage.value = 'Подписка на новости @notcatart оформлена успешно!'
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
