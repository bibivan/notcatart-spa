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
import PickupPoints from '@/components/deliveries/PickupPoints'
import CourierCompanies from '@/components/deliveries/CourierCompanies'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DeliveryTypes',
  components: { CourierCompanies, PickupPoints },
  props: {
    order: Object
  },
  setup (props) {
    const store = useStore()
    const currentOrder = toRef(props, 'order')

    const setResult = (data, fias) => {
      const deliveries = Object.values(data[0]?.delivery_types)
      const courierDeliveryIds = [1, 4, 7]
      // const courierDeliveryIds = [1, 4, 7, 22]
      // const postPickupDeliveryIds = [3, 5, 21]

      // currentOrder.value.FIAS = fias
      console.log(data)
      currentOrder.value.FIAS = data.fias
      currentOrder.value.couriersServices = []
      currentOrder.value.pickupPoints = []

      deliveries.forEach(item => {
        if (courierDeliveryIds.includes(item?.delivery_id)) currentOrder.value.couriersServices.push(item)
        else if (item.gps?.length) currentOrder.value.pickupPoints.push(item)
      })
    }

    // const getDeliveries = async fiases => {
    //   for (const fias of fiases) {
    //     let response
    //     if (fias) {
    //       response = await store.dispatch('loadPickUps', {
    //         fias,
    //         ...currentOrder.value
    //       })
    //     }
    //     if (response?.success) return setResult(response.data, fias)
    //   }
    // }

    // watch(() => currentOrder.value.fiases, value => {
    //   getDeliveries(value)
    // }, { deep: true })

    const getDeliveries = postalCode => {
      store.dispatch('loadPickUps', {
        postalCode,
        ...currentOrder.value
      })
        .then(res => {
          if (res?.success) setResult(res.data, postalCode)
        })
    }

    watch(() => currentOrder.value.postalCode, value => {
      getDeliveries(value)
    }, { deep: true })

    watch(() => currentOrder.value.addressData, () => {
      delete currentOrder.value?.PLACE_ID
      delete currentOrder.value?.pickedPoint
      delete currentOrder.value?.pickedCourier
    })

    watch(() => currentOrder.value.COURIER_DELIVERY, val => {
      if (val && currentOrder.value?.pickedCourier?.place_id) {
        currentOrder.value.PLACE_ID = currentOrder.value?.pickedCourier?.place_id
      }
      if (!val && currentOrder.value?.pickedPoint?.place_id) {
        currentOrder.value.PLACE_ID = currentOrder.value?.pickedPoint?.place_id
      }
    })

    return { currentOrder }
  }
})
</script>

<style scoped>

</style>
