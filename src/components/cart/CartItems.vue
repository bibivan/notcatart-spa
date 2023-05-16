<template>
  <div class="cart">
    <h2>Ваш заказ</h2>
    <div class="grid grid--wrap">
      <div
        v-for="(product, index) in currentOrder.PRODUCTS"
        :key="product.ARTICLE"
        class="grid__col grid__col--w-100-desktop grid__col--w-50-tablet"
      >
        <div class="item-cart cart__item">
          <img class="item-cart__img" :src="product.picture" :alt="'Фото ' + product.NAME">
          <div class="item-cart__name"> {{ product.NAME }}</div>
          <div class="item-cart__name"> {{ product.NAME }}</div>
          <div class="item-cart__handlers">
            <div class="item-cart__counter counter">
              <div class="counter__buttons">
                <button class="counter__btn counter__btn--minus" @click="product.CNT > 1 ? --product.CNT : 1"></button>
                <div class="counter__value">{{ product.CNT }}</div>
                <button class="counter__btn counter__btn--plus" @click="++product.CNT"></button>
                <div class="counter__text">шт.</div>
              </div>
            </div>
            <button class="item-cart__delete" @click="deleteProductItem(index)">
              <svg viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div :class="['grid__col', {
        'grid__col--w-50-tablet': (order?.PRODUCTS?.length % 2 !== 0) }]"
      >
        <div class="cart__costs">
          <div class="cart__cost cart__cost--products">
            <span class="bold">Стоимость товаров:</span> {{ order.PRICE }} р.
          </div>
          <div class="cart__cost cart__cost--delivery">
            <span class="bold">Доставка:</span> {{ order.DELIVERY_PRICE ? (order.DELIVERY_PRICE + ' р.') : 'Не выбрано' }}
          </div>
          <div class="cart__cost cart__cost--total">
            <span class="bold">Итого:</span> {{ totalCost }} р.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, toRef } from 'vue'
export default defineComponent({
  name: 'CartItems',
  props: {
    order: Object
  },
  setup (props, { emit }) {
    const currentOrder = toRef(props, 'order')

    currentOrder.value.PRICE = computed(() => currentOrder.value.PRODUCTS
      .reduce((accumulator, product) => {
        return accumulator + (product.PRICE * product.CNT)
      }, 0))

    const totalCost = computed(() => (
      currentOrder.value.PRICE + (currentOrder.value.DELIVERY_PRICE ? currentOrder.value.DELIVERY_PRICE : 0)
    ))

    const deleteProductItem = index => {
      currentOrder.value.PRODUCTS.splice(index, 1)
      if (!currentOrder.value.PRODUCTS?.length) emit('closeModal')
    }

    return { totalCost, currentOrder, deleteProductItem }
  }
})
</script>

<style scoped>

</style>
