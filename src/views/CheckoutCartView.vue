<template>
<section class="section bg-white">
  <div class="container">
    <template v-if="$_.isEmpty(orderState?.cartContent)">
      <h2 class="color-black">/ Корзина пуста</h2>
      <button class="btn" @click="$router.back()">назад</button>
    </template>
    <template v-else>
      <div class="checkout">
        <CheckoutForm
          class="checkout__form"
          :order="orderState"
        />
        <CartItems
          class="checkout__cart"
          :order="orderState"
        />
      </div>
    </template>
  </div>
</section>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import CartItems from '@/components/cart/CartItems'
import CheckoutForm from '@/components/checkout/CheckoutForm'

export default defineComponent({
  name: 'CheckoutCartView',
  components: { CheckoutForm, CartItems },
  setup () {
    const store = useStore()
    const orderState = reactive({
      COURIER_DELIVERY: true
    })
    watch(() => store.getters.getCartContent, val => {
      orderState.cartContent = val
      orderState.PRICE = val.reduce((accumulator, product) => {
        return accumulator + (product.PRICE * product.CNT)
      }, 0)
    }, { immediate: true })

    return {
      orderState
    }
  }
})
</script>
