<template>
  <div class="yandex-balloon__body">
    <div class="yandex-balloon__item">
      <span class="yandex-balloon__subtitle">Название компании:</span>
      <span class="yandex-balloon__text">{{ pickupPoint.name }}</span>
    </div>
    <div class="yandex-balloon__item">
      <span class="yandex-balloon__subtitle">График работы:</span>
      <span class="yandex-balloon__text">{{ pickupPoint.schedule }}</span>
    </div>
    <div class="yandex-balloon__item">
      <span class="yandex-balloon__subtitle">Адрес:</span>
      <span class="yandex-balloon__text">{{ pickupPoint.address }}</span>
    </div>
  </div>
  <button @click.prevent="onEmitPoint(pickupPoint)"
          :class="['btn yandex-balloon__btn btn-reset', { 'btn--disabled': btnDisabled }]"
          :disabled="btnDisabled">
    <template v-if="!btnDisabled"> Доставить сюда </template>
    <template v-if="btnDisabled"> Выбрано </template>
  </button>
</template>

<script>
import { defineComponent, ref, toRef } from 'vue'

export default defineComponent({
  name: 'CustomMapBalloon',
  props: {
    pickupPoint: Object,
    order: Object
  },
  setup (props) {
    const currentOrder = toRef(props, 'order')
    const btnDisabled = ref(false)

    const onEmitPoint = (point) => {
      currentOrder.value.pickedPoint = point
      btnDisabled.value = true
    }

    return {
      btnDisabled,
      onEmitPoint
    }
  }
})
</script>
