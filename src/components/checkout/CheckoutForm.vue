<template>
  <form class="form-checkout">
    <h1 class="form-checkout__title">/ Оформление заказа</h1>
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
            class="w-100"
            v-model:addressData="currentOrder.addressData"
          />
        </div>
      </div>
    </div>
    <DeliveryTypes
      class="form-checkout__deliveries"
      :order="currentOrder"
    />
    <PaymentType :order="order"/>
    <div class="btn-block">
      <button
        class="btn form-checkout__btn"
        @click.prevent="onSendData"
      >Отправить</button>
      <ErrorMessage
        v-if="currentOrder.COURIER_DELIVERY"
        :errorInstance="v$"
        validatedProperty="addressData"
      />
      <ErrorMessage
        v-else
        :errorInstance="v$"
        validatedProperty="pickupPoint"
      />
    </div>

  </form>
</template>

<script>
import { computed, defineComponent, toRef, watch } from 'vue'
import { sendOrder } from '@/helpers/send-requests'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import TextInput from '@/components/base/TextInput'
import PhoneInput from '@/components/base/PhoneInput'
import AddressInput from '@/components/base/AddressInput'
import ErrorMessage from '@/components/base/ErrorMessage'
import DeliveryTypes from '@/components/deliveries/DeliveryTypes'
import PaymentType from '@/components/checkout/PaymentType'
import _ from 'lodash'

export default defineComponent({
  name: 'CheckoutForm',
  components: {
    PaymentType,
    AddressInput,
    PhoneInput,
    TextInput,
    ErrorMessage,
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
    const validationRules = computed(() => ({
      addressData: {
        data: {
          house: {
            required: helpers.withMessage('Введите полный адрес', () => {
              return !currentOrder.value.COURIER_DELIVERY ? true : currentOrder.value.addressData.data.house
            })
          }
        }
      },
      pickupPoint: {
        required: helpers.withMessage('Выберите пункт выдачи', () => {
          return currentOrder.value.COURIER_DELIVERY ? true : !_.isEmpty(currentOrder.value.pickedPoint)
        })
      },
      pickedCourier: {
        required: helpers.withMessage('Выберите курьерскую службу', () => {
          return !(currentOrder.value.COURIER_DELIVERY && currentOrder.value.addressData.data.house) ? true : !_.isEmpty(currentOrder.value.pickedCourier)
        })
      }
    }))
    const v$ = useVuelidate(validationRules, currentOrder)

    const onSendData = async () => {
      const result = await v$.value.$validate()
      console.log(result)
      if (result) sendOrder(currentOrder.value)
    }

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
