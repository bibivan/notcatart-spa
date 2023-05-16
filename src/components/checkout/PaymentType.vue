<template>
  <fieldset class="payment-types">

    <legend class="payment-types__legend">Способ оплаты</legend>
    <div class="payment-types__inputs">
      <div
        v-for="(payment, index) in paymentTypes"
        :key="payment.id +  index"
        class="payment-types__item radio-block"
      >
        <label
          :for="payment.id"
          class="payment-types__label radio-block__label"
        >{{ payment.name }}</label>
        <input
          v-model="currentOrder.PAYMENT_TYPE"
          :id="payment.id"
          class="payment-types__radio radio-block__input"
          type="radio"
          :value="payment.value"
        >
        <ErrorMessage :errorInstance="v$"/>
      </div>
    </div>
  </fieldset>
</template>

<script>
import { computed, ref, toRef } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import ErrorMessage from '@/components/base/ErrorMessage'

export default {
  name: 'PaymentType',
  components: { ErrorMessage },
  props: {
    order: Object
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')
    const paymentTypes = ref([{
      value: 1,
      name: 'При получении',
      id: 'radio_upon_receipt'
    }])
    currentOrder.value.PAYMENT_TYPE = 1

    // валидация
    const validationRules = computed(() => ({
      PAYMENT_TYPE: {
        required: helpers.withMessage('Выберите способ', required)
      }
    }))
    const v$ = useVuelidate(validationRules, currentOrder)

    return {
      currentOrder,
      paymentTypes,
      v$
    }
  }
}
</script>

<style scoped>

</style>
