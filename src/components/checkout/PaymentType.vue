<template>
  <fieldset class="payment-types">

    <legend class="h3 payment-types__legend">Способ оплаты</legend>
    <div class="payment-types__inputs">
      <div
        v-for="(payment, index) in paymentTypes"
        :key="payment.id +  index"
        class="payment-types__item radio"
      >
        <input
          v-model="currentOrder.PAYMENT_TYPE"
          :id="payment.id"
          class="payment-types__radio radio__input"
          type="radio"
          :value="payment.value"
        >
        <label
          :for="payment.id"
          class="payment-types__label radio__label"
        >{{ payment.name }}</label>
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
    const paymentTypes = ref([
      {
        value: 1,
        name: 'При получении',
        id: 'radio_upon_receipt'
      }
      // {
      //   value: 2,
      //   name: 'Картой',
      //   id: 'radio_by_card'
      // }
    ])
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
