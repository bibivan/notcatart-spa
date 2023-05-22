<template>
  <div class="delivery-type">
    <div class="delivery-type__head">
      <h3 class="delivery-type__title">Выберите способ доставки</h3>
      <div class="delivery-type__tabs">
        <button
          :class="['delivery-type__tab delivery-type__tab--first btn-reset',
          {'delivery-type__tab--active': currentOrder.COURIER_DELIVERY }]"
          @click.prevent="currentOrder.COURIER_DELIVERY = true"
        >
          Курьер
        </button>
        <button
          :class="['delivery-type__tab btn-reset',
          { 'delivery-type__tab--active': !currentOrder.COURIER_DELIVERY }]"
          @click.prevent="currentOrder.COURIER_DELIVERY = false"
        >
          Пункт выдачи
        </button>
      </div>
    </div>

    <div class="delivery-type__body">
      <PickupPoints
        v-show="!currentOrder.COURIER_DELIVERY && !$_.isEmpty(order.pickupPoints)"
        :order="currentOrder"
      />
      <CourierCompanies
          v-show="currentOrder.COURIER_DELIVERY && !$_.isEmpty(order.couriersServices) && order.addressData.data?.house"
          :order="currentOrder"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, watch } from 'vue'
import { apiFetch } from '@/helpers/send-requests'
import config from '@/config'
import PickupPoints from '@/components/deliveries/PickupPoints'
import CourierCompanies from '@/components/deliveries/CourierCompanies'

export default defineComponent({
  name: 'DeliveryTypes',
  components: { CourierCompanies, PickupPoints },
  props: {
    order: Object
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')

    const setResult = (data, fias) => {
      const deliveries = Object.values(data[0]?.delivery_types)
      const courierDeliveryIds = [1, 4, 7, 22]
      // const postPickupDeliveryIds = [3, 5, 21]

      currentOrder.value.FIAS = fias
      currentOrder.value.couriersServices = []
      currentOrder.value.pickupPoints = []

      deliveries.forEach(item => {
        if (courierDeliveryIds.includes(item?.delivery_id)) currentOrder.value.couriersServices.push(item)
        else if (item.gps?.length) currentOrder.value.pickupPoints.push(item)
      })
    }

    const getDeliveries = async fiases => {
      for (const fias of fiases) {
        let response
        if (fias) {
          response = await apiFetch(config.apiUrl + 'pickup-sdt/get-pickups',
            {
              fias,
              token: currentOrder.value.token,
              payment_type: currentOrder.value.PAYMENT_TYPE,
              company: 0, // 0 - физ.лицо, 1 - юр.лицо
              weight: currentOrder.value.WEIGHT,
              parcel_size: currentOrder.value.parcelSize,
              order_sum: currentOrder.value.PRICE
            })
        }
        if (response?.success) return setResult(response.data, fias)
      }
    }

    watch(() => currentOrder.value.fiases, value => {
      getDeliveries(value)
    }, { deep: true })

    // watch(() => currentOrder.value.COURIER_DELIVERY, val => {
    //   val ? currentOrder.value.pickedPoint = [] : currentOrder.value.pickedCourier = []
    // })

    return { currentOrder }
  }
})
</script>

<style scoped>

</style>
