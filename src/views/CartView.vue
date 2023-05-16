<template>
<section class="section bg-white">
  <div class="container">
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
  </div>
</section>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import CartItems from '@/components/cart/CartItems'
import CheckoutForm from '@/components/checkout/CheckoutForm'

export default defineComponent({
  name: 'CartView',
  components: { CheckoutForm, CartItems },
  setup () {
    const store = useStore()
    const orderState = reactive({
      PRODUCTS: computed(() => store.getters.getCartContent)
    })

    return {
      orderState
    }
  }
})
</script>
