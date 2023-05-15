<template>
  <section class="section">
    <div class="product grid grid--column-tablet">
      <div class="grid__col grid__col--w-60-desktop">
        <ProductImages :images="product.PICTURES"/>
      </div>
      <div class="grid__col grid__col--w-40-desktop">
        <div class="product__content">
          <h2 class="product__title">{{ product.ATTRIBUTES.name }}</h2>
          <div class="product__caption">{{ product.ATTRIBUTES.type }}</div>
          <div class="product__cost">{{ product.PRICE }} р.</div>
          <button
            class="btn btn--bordered product__btn"
            @click="putProductToCart(product)"
          >Хочу</button>
          <p class="product__description">
            <span class="product__italic-text">{{ product.ATTRIBUTES.longName }}</span>
            {{ product.ATTRIBUTES.firstStringDescription }}
          </p>
          <p
            v-if="product.ATTRIBUTES.secondStringDescription"
            class="product__description"
          >
            {{ product.ATTRIBUTES.secondStringDescription }}
          </p>
          <p
            v-if="product.ATTRIBUTES.callToAction"
            class="product__description"
          >
            {{ product.ATTRIBUTES.callToAction }}
          </p>
          <p class="product__note">/ Палетка также представлена в сети "Золотое яблоко" городов: Москва, Санкт-Петербург, Екатеринбург и online магазине.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import ProductImages from '@/components/products/ProductImages'

export default defineComponent({
  name: 'ProductItem',
  components: { ProductImages },
  props: {
    product: Object
  },
  setup (props, { emit }) {
    const putProductToCart = product => emit('putProductToCart', {
      NAME: product.NAME,
      ARTICLE: product.ARTICLE,
      SKU: product.SKU ? product.SKU : null,
      CNT: 1,
      PRICE: product.PRICE,
      picture: product.PICTURES[0],
      size: product.SIZE
    })

    return {
      putProductToCart
    }
  }
})
</script>
