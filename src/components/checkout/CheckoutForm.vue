<template>
  <form class="form-checkout" @submit.prevent>
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
  </form>
</template>

<script>
import { computed, defineComponent, onMounted, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import TextInput from '@/components/base/TextInput'
import PhoneInput from '@/components/base/PhoneInput'
import AddressInput from '@/components/base/AddressInput'
import DeliveryTypes from '@/components/deliveries/DeliveryTypes'
import PaymentType from '@/components/checkout/PaymentType'

export default defineComponent({
  name: 'CheckoutForm',
  components: {
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
    const store = useStore()
    const onSendData = async () => {
      const result = await v$.value.$validate()
      if (result) store.dispatch('sendProductOrder', currentOrder.value)
    }

    onMounted(() => {
      document.body.addEventListener('click', e => {
        if (e.target.classList.contains('cart__submit')) onSendData()
      })
    })

    return {
      currentOrder,
      onSendData,
      v$
    }
  }
})
</script>

<style scoped>

</style>
