<template>
  <div class="delivery-type__pickup">
    <div class="pickup-points-filter delivery-type__filter-pickup">
      <label
        for="pickup_points_filter"
        v-if="!$_.isEmpty(state.companiesList)"
        class="pickup-points-filter__label"
      >Фильтровать по компании
      </label>
      <select
        v-if="!$_.isEmpty(state.displayedPoints)"
        v-model="state.filterByCompany"
        id="pickup_points_filter"
        class="pickup-points-filter__select"
      >
        <option value="allCompanies">Все компании</option>
        <option
          v-for="company in state.companiesList"
          :key="company.name"
          :value="company.name"
        >
          {{ company.name }}
        </option>
      </select>
    </div>
    <YaMapComponent
      :order="order"
      :markersData="state.displayedPoints"
    />
    <ErrorMessage :errorInstance="v$"/>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRef, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import YaMapComponent from '@/components/deliveries/YaMapComponent'
import ErrorMessage from '@/components/base/ErrorMessage'
import _ from 'lodash'

export default defineComponent({
  name: 'PickupPoints',
  props: {
    order: Object
  },
  components: {
    ErrorMessage,
    YaMapComponent
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')
    const state = reactive({
      companiesList: [],
      displayedPoints: [],
      filterByCompany: 'allCompanies'
    })

    const renderPointsData = () => {
      state.companiesList = _.uniqBy(currentOrder.value.pickupPoints, 'name')
      state.displayedPoints = currentOrder.value.pickupPoints
    }

    watch(() => currentOrder.value.pickupPoints, () => renderPointsData(), { immediate: true })

    // фильтрация
    const filterPickupPoints = () => {
      if (state.filterByCompany === 'allCompanies') state.displayedPoints = currentOrder.value.pickupPoints
      else {
        state.displayedPoints = currentOrder.value.pickupPoints
          .filter(item => item.name === (state.filterByCompany))
      }
    }

    watch(() => state.filterByCompany, () => filterPickupPoints())

    watch(() => currentOrder.value.pickedPoint, val => {
      if (_.isEmpty(val)) return

      currentOrder.value.DELIVERY_PRICE = val.cost
      currentOrder.value.PLACE_ID = val.place_id
      currentOrder.value.ADDRESS = val.address
      currentOrder.value.PVZ_ADDRESS = val.address
    }, { deep: true })

    // валидация
    const validationRules = computed(() => ({
      required: helpers.withMessage('Выберите пункт выдачи',
        () => currentOrder.value.COURIER_DELIVERY ? true : !_.isEmpty(currentOrder.value.pickedPoint))
    }))
    const v$ = useVuelidate(validationRules, {})

    return {
      state,
      currentOrder,
      v$
    }
  }
})
</script>

<style scoped>

</style>
