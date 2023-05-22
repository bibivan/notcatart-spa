<template>
  <div class="delivery-type__courier">
    <div
      v-for="company in currentOrder.couriersServices"
      :key="company.delivery_code"
      class="radio"
    >
      <input
        v-model="currentOrder.pickedCourier"
        :id="company.transport_api_code + company.delivery_code"
        class="radio__input"
        type="radio"
        :value="company"
      >
      <label
        :for="company.transport_api_code + company.delivery_code"
        class="radio__label"
      >{{ company.name }}</label>
    </div>
    <ErrorMessage :errorInstance="v$"/>
  </div>
</template>

<script>
import { computed, defineComponent, toRef, watch } from 'vue'
import { helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import ErrorMessage from '@/components/base/ErrorMessage'
import _ from 'lodash'

export default defineComponent({
  name: 'CourierCompanies',
  components: { ErrorMessage },
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

    // валидация
    const validationRules = computed(() => ({
      required: helpers.withMessage('Выберите курьерскую службу',
        () => currentOrder.value.COURIER_DELIVERY ? !_.isEmpty(currentOrder.value?.pickedCourier) : true)
    }))
    const v$ = useVuelidate(validationRules, {})

    return {
      currentOrder,
      v$
    }
  }
})
</script>

<style scoped>

</style>
