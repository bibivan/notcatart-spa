<template>
  <form
    v-bind="$attrs"
    class="form-checkout"
    @submit.prevent
  >
    <div v-if="$_.isEmpty(currentOrder?.cartContent)" class="flex-column-start">
      <h1 class="h2 color-black">/ Корзина пуста</h1>
      <button class="btn" @click="$router.back()">назад</button>
    </div>
    <template v-else>
      <h1 class="visually-hidden">Оформление заказа</h1>
      <h2 class="h2 form-checkout__title">/ Оформление заказа</h2>
      <div class="form-checkout__inputs">
        <div class="grid grid--wrap">
          <div class="grid__col grid__col--w-50-tab-to-desk">
            <TextInput
              v-model="currentOrder.EMAIL"
              id="email_checkout_input"
              type="email"
              label="E-mail"
            />
          </div>
          <div class="grid__col grid__col--w-50-tab-to-desk">
            <PhoneInput
              v-model="currentOrder.PHONE"
              id="phone_checkout_input"
            />
          </div>
          <div class="grid__col grid__col--w-33-tab-to-desk">
            <TextInput
              v-model="currentOrder.LAST_NAME"
              id="surname_checkout_input"
              label="Фамилия"
            />
          </div>
          <div class="grid__col grid__col--w-33-tab-to-desk">
            <TextInput
              v-model="currentOrder.NAME"
              id="name_checkout_input"
              label="Имя"
            />
          </div>
          <div class="grid__col grid__col--w-33-tab-to-desk">
            <TextInput
              v-model="currentOrder.MIDDLE_NAME"
              id="middle_name_checkout_input"
              label="Отчество"
            />
          </div>
          <div class="grid__col  grid__col--w-100-tab-to-desk">
            <AddressInput
              v-model:addressData="currentOrder.addressData"
              class="w-100"
              :checkFullAddress="currentOrder.COURIER_DELIVERY"
            />
          </div>
        </div>
      </div>
      <DeliveryTypes
        class="form-checkout__deliveries"
        :order="currentOrder"
      />
      <PaymentType :order="order"/>
    </template>
  </form>
  <MessageModal
    v-if="messageModalIsShown"
    :dataSending="dataSending"
    :message="responseMessage"
    @closeModal="messageModalIsShown = false"
  />
</template>

<script>
import { computed, defineComponent, onMounted, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { useResponseModal } from '@/helpers/useResponseModal'
import TextInput from '@/components/base/TextInput'
import PhoneInput from '@/components/base/PhoneInput'
import AddressInput from '@/components/base/AddressInput'
import DeliveryTypes from '@/components/deliveries/DeliveryTypes'
import PaymentType from '@/components/checkout/PaymentType'
import MessageModal from '@/components/messageModal/MessageModal'

export default defineComponent({
  name: 'CheckoutForm',
  components: {
    MessageModal,
    PaymentType,
    AddressInput,
    PhoneInput,
    TextInput,
    DeliveryTypes
  },
  props: {
    order: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')

    const setAddressData = value => {
      currentOrder.value.fiases = [value.data.settlement_fias_id, value.data.city_fias_id, value.data.area_fias_id, value.data.region_fias_id]
      currentOrder.value.ADDRESS = value.unrestricted_value
    }

    watch(() => props.order.addressData,
      value => setAddressData(value))

    // валидация
    const v$ = useVuelidate()
    currentOrder.value.fromErrorsCount = computed(() => v$.value.$silentErrors.length)

    // отправка данных
    const {
      dataSending,
      responseMessage,
      messageModalIsShown
    } = useResponseModal()
    const store = useStore()
    const onSendData = async () => {
      const result = await v$.value.$validate()
      if (result) {
        messageModalIsShown.value = true
        dataSending.value = true
        const response = await store.dispatch('sendProductOrder', currentOrder.value)
        if (response?.SDT?.SDT_result?.success) {
          responseMessage.value = 'Заказ успешно оформлен'
          currentOrder.value = { COURIER_DELIVERY: true }
          store.commit('clearCart')
        } else {
          responseMessage.value = response?.SDT?.SDT_result?.comment
            ? response?.SDT?.SDT_result?.comment
            : 'Произошла ошибка в оформлении заказа! Попробуй еще раз.'
        }
        dataSending.value = false
      }
    }

    onMounted(() => {
      document.body.addEventListener('click', e => {
        if (e.target.classList.contains('cart__submit') && !e.target.disabled) onSendData()
      })
    })

    return {
      currentOrder,
      onSendData,
      dataSending,
      responseMessage,
      messageModalIsShown,
      v$
    }
  }
})
</script>

<style scoped>

</style>
