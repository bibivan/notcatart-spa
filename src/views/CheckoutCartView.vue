<template>
<section class="section bg-white">
  <div class="container">
    <div class="checkout">
      <CheckoutForm
        class="checkout__form"
        :order="orderState"
      />
      <CartItems
        v-if="!$_.isEmpty(orderState?.cartContent)"
        class="checkout__cart"
        :order="orderState"
      />
    </div>
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
