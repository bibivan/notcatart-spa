<template>
  <div class="delivery-type__courier">
    <div
      v-for="company in currentOrder.couriersServices"
      :key="company.delivery_code"
      class="radio-block"
    >
      <label
        :for="company.transport_api_code + company.delivery_code"
        class="radio-block__label"
      >{{ company.name }}</label>
      <input
        v-model="currentOrder.pickedCourier"
        :id="company.transport_api_code + company.delivery_code"
        class="radio-block__input"
        type="radio"
        :value="company"
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, watch } from 'vue'

export default defineComponent({
  name: 'CourierCompanies',
  props: {
    order: Object
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')

    watch(() => currentOrder.value.pickedCourier, val => {
      const postCourierDeliveryIds = [7, 22]
      if (postCourierDeliveryIds.includes(val.delivery_id)) currentOrder.value.RU_POST_DELIVERY = true

      currentOrder.value.DELIVERY_PRICE = val.cost
      currentOrder.value.PLACE_ID = val.place_id
      currentOrder.value.ADDRESS = currentOrder.value.addressData?.unrestricted_value
      currentOrder.value.PVZ_ADDRESS = ''
    }, { deep: true })

    return {
      currentOrder
    }
  }
})
</script>

<style scoped>

</style>
