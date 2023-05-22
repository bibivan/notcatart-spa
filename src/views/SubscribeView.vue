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
      <PrivacyConfirm
        v-model="userData.privacyIsConfirmed"
        class="full-screen-form__confirm"
      />
      <button
        class="cross-btn full-screen-form__back"
        @click="$router.back()"
      />
    </form>
  </section>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import TextInput from '@/components/base/TextInput'
import PrivacyConfirm from '@/components/base/PrivacyConfirm'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'

export default defineComponent({
  name: 'SubscribeView',
  components: { PrivacyConfirm, TextInput },
  setup () {
    const store = useStore()
    const userData = reactive({})
    const v$ = useVuelidate()

    const onSubmit = async () => {
      const result = await v$.value.$validate()
      console.log(result)
      if (result) await store.dispatch('subscribeToNews', userData)
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
