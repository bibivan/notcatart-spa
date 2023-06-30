<template>
  <section class="section bg-white">
    <div class="container">
      <div class="pay-message">
        <svg
          class="pay-message__icon pay-message__icon--error"
          viewBox="0 0 24 24"
          fill="none">
          <path d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="pay-message__text text">Ошибка при оплате!</div>
        <RouterLink
          class="pay-message__btn btn"
          to="/"
        >
          В корзину
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PayError',
  setup () {
    const route = useRoute()
    const store = useStore()
    const token = computed(() => store.getters.getToken)
    const logsAreSent = ref(false)

    watch(token, val => {
      if (val && !logsAreSent.value) {
        store.dispatch('sendErrorPayLogs', route.query)
        logsAreSent.value = true
      }
      console.log('logsStatus: ' + logsAreSent.value, '      token: ' + token.value)
    }, { immediate: true })
  }
})
</script>

<style scoped>

</style>
