<template>
  <fieldset class="payment-types">
    <legend class="h3 payment-types__legend">Способ оплаты</legend>

    <CustomSelect
      v-model="currentOrder.PAYMENT_TYPE"
      :options="paymentTypes"
    />

  </fieldset>
</template>

<script>
import { ref, toRef } from 'vue'
import CustomSelect from '@/components/base/CustomSelect'

export default {
  name: 'PaymentType',
  components: { CustomSelect },
  props: {
    order: Object
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')
    const paymentTypes = ref([
      {
        value: 1,
        name: 'При получении',
        id: 'option_pay_upon_receipt'
      },
      {
        value: 2,
        name: 'Картой',
        id: 'option_pay_by_card'
      }
    ])
    currentOrder.value.PAYMENT_TYPE = 1

    return {
      currentOrder,
      paymentTypes
    }
  }
}
</script>

<style scoped>

</style>
