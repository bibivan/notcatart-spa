<template>
  <div class="message-modal" @click="onCloseModal">
    <div v-if="dataSending" class="spinner"></div>
    <div v-else class="message-modal__dialog">
      <div class="message-modal__text text">{{ message }}</div>
      <a :href="paymentLink" class="message-modal__btn btn" target="_blank">Оплатить</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PaymentModal',
  props: {
    message: String,
    dataSending: Boolean,
    orderId: String,
    cost: String,
    email: String
  },
  setup (props, { emit }) {
    const store = useStore()
    const orderId = toRef(props, 'orderId')
    const cost = toRef(props, 'cost')
    const email = toRef(props, 'email')
    const paymentLink = ref(false)
    const onCloseModal = event => {
      if (event.target.classList.contains('message-modal__dialog')) return
      emit('closeModal')
    }

    watch(orderId, async (value) => {
      if (value && !paymentLink.value) {
        const response = await store.dispatch('getPaymentUrl', {
          orderId: orderId.value,
          cost: cost.value,
          email: email.value
        })
        if (response?.url) {
          paymentLink.value = response?.url
          location.href = response?.url
        }
        // console.log(response)
      }
    })

    return {
      paymentLink,
      onCloseModal
    }
  }
})
</script>

<style scoped>

</style>
