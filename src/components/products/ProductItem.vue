<template>
  <section class="section">
    <div class="product grid grid--column-tablet">
      <div class="grid__col grid__col--w-50-desktop">
        <ProductImages :images="product.PICTURES"/>
      </div>
      <div class="grid__col grid__col--w-50-desktop">
        <div class="product__content">
          <h2 class="product__title">{{ product.NAME }}</h2>
          <div class="product__caption">{{ product.ATTRIBUTES.type }}</div>
          <div class="product__cost">{{ product.PRICE }} ₽</div>
          <button
            class="btn btn--bordered product__btn"
            @click="onPutProductToCart(product)"
          >Хочу</button>
          <p class="product__description">
            {{ product.DESCRIPTION }}
          </p>
          <p class="product__description product__description--accent">
            {{ product.ATTRIBUTES.texture }}
          </p>
          <p class="product__note">/ Палетка также представлена в сети "Золотое яблоко" городов: Москва, Санкт-Петербург, Екатеринбург и online магазине.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ProductImages from '@/components/products/ProductImages'

export default defineComponent({
  name: 'ProductItem',
  components: { ProductImages },
  props: {
    product: Object
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const onPutProductToCart = product => {
      store.commit('addItemToCart', {
        NAME: product.NAME,
        type: product.ATTRIBUTES.articleType,
        ARTICLE: product.ARTICLE,
        SKU: product.SKU ? product.SKU : null,
        CNT: 1,
        PRICE: product.PRICE,
        picture: product.PICTURES[0],
        size: product.SIZE
      })
      router.push({ name: 'cart' })
    }

    return {
      onPutProductToCart
    }
  }
})
</script>
