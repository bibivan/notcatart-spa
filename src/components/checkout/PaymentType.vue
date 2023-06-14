<template>
  <fieldset class="payment-types">
    <legend class="h3 payment-types__legend">Способ оплаты</legend>

    <Select2
      v-model="currentOrder.PAYMENT_TYPE"
      class="payment-types__select"
      :options="paymentTypes"
      :settings="{
        minimumResultsForSearch: -1,
        dropdownCssClass: 'payment-types-dropdown',
        width: '100%'
       }"
    />
  </fieldset>
</template>

<script>
import { ref, toRef } from 'vue'
import Select2 from 'vue3-select2-component'

export default {
  name: 'PaymentType',
  components: { Select2 },
  props: {
    order: Object
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')
    const paymentTypes = ref([
      /* {
        text: 'При получении',
        id: 1
      }, */
      {
        text: 'Картой',
        id: 2
      }
    ])
    currentOrder.value.PAYMENT_TYPE = 2

    return {
      currentOrder,
      paymentTypes
    }
  }
}
</script>

<style scoped lang="scss">
</style>
