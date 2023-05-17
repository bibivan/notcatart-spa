<template>
  <div class="cart">
    <h2 class="cart__title">Ваш заказ</h2>
    <div class="cart__items">
      <div
        v-for="(product, index) in currentOrder.PRODUCTS"
        :key="product.ARTICLE"
        class="item-cart cart__item"
      >
        <img class="item-cart__img" :src="product.picture" :alt="'Фото ' + product.NAME">
        <div class="item-cart__text-content">
          <div class="item-cart__article"> {{ product.type }}</div>
          <div class="item-cart__name"> {{ product.NAME }}</div>
          <div class="item-cart__price"> {{ product.PRICE }}  ₽</div>
          <div class="item-cart__handlers">
            <div class="item-cart__counter counter">
              <button class="btn-reset counter__btn counter__btn--minus" @click="changeProductAmount(product, false)"></button>
              <div class="counter__value">{{ product.CNT }}</div>
              <button class="btn-reset counter__btn counter__btn--plus" @click="changeProductAmount(product, true)"></button>
            </div>
            <button class="item-cart__delete btn-reset" @click="deleteProductItem(index)">
              <svg viewBox="0 0 19 19" fill="none">
                <path d="M16.1111 8.55556V17.4333C16.1111 17.7463 15.8574 18 15.5444 18H3.45556C3.1426 18 2.88889 17.7463 2.88889 17.4333V8.55556M7.61111 14.2222V8.55556M11.3889 14.2222V8.55556M18 4.77778H13.2778M13.2778 4.77778V1.56667C13.2778 1.25371 13.0241 1 12.7111 1H6.28889C5.97593 1 5.72222 1.25371 5.72222 1.56667V4.77778M13.2778 4.77778H5.72222M1 4.77778H5.72222" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart__costs">
      <div class="h4 cart__cost cart__cost--products">
        Стоимость товаров <span>{{ order.PRICE }} ₽</span>
      </div>
      <div class="h4 cart__cost cart__cost--delivery">
        Доставка <span>{{ order.DELIVERY_PRICE ? (order.DELIVERY_PRICE + ' ₽') : 'Не выбрано' }}</span>
      </div>
      <div class="h3 cart__cost cart__cost--total">
        Итого: <span class="h3 cart__cost--sum">{{ totalCost }} ₽</span>
      </div>
    </div>
<!--    <button class="btn btn-reset cart__submit">Оформить заказ</button>-->
  </div>
</template>

<script>
import { computed, defineComponent, toRef } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CartItems',
  props: {
    order: Object
  },
  setup (props) {
    const store = useStore()
    const currentOrder = toRef(props, 'order')

    currentOrder.value.PRICE = computed(() => currentOrder.value.PRODUCTS
      .reduce((accumulator, product) => {
        return accumulator + (product.PRICE * product.CNT)
      }, 0))

    const totalCost = computed(() => {
      return currentOrder.value.PRICE + (currentOrder.value.DELIVERY_PRICE ? currentOrder.value.DELIVERY_PRICE : 0)
    })

    const deleteProductItem = index => store.commit('deleteItemFromCart', index)

    const changeProductAmount = (item, isIncrease) => {
      const updatedItem = { ...item }

      isIncrease ? ++updatedItem.CNT : --updatedItem.CNT
      updatedItem.CNT = updatedItem.CNT ? updatedItem.CNT : 1
      store.commit('addItemToCart', updatedItem)
    }

    return { totalCost, currentOrder, deleteProductItem, changeProductAmount }
  }
})
</script>

<style scoped>

</style>
