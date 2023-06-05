<template>
  <HeroSection/>
  <template v-if="!$_.isEmpty(products)">
    <ProductItem
      v-for="(product, index) in products"
      :id="'product_' + (index + 1)"
      :key="'product-key-' + index"
      :product="product"
    />
  </template>
  <SomeInfoSection
    :slideUrls="['./img/gallery/gallery-photo-15.jpg', './img/gallery/gallery-photo-17.jpg', './img/gallery/gallery-photo-18.jpg']"
    headline="Сергей Любимов"
  >
    «Я всегда хотел дать вам самое <br class="hide-tablet hide-desktop">лучшее -<br class="hide-mobile">то, чем пользуюсь сам. <br>Я долго к этому шел.
  </SomeInfoSection>
  <SomeInfoSection
    :slideUrls="['./img/gallery/gallery-photo-26.jpg', './img/gallery/gallery-photo-29.jpg', './img/gallery/gallery-photo-28.jpg', './img/gallery/gallery-photo-30.jpg']"
    headline="ЗАЦЕНИ"
  >
    Максимум пигментации. <br>В палетках ты найдёшь разные текстуры: <br>матовые, спаркл, <br>который можно использовать как хайлайтер, <br>шиммерные и глиттерные. <br>Бархатные палетки так и просятся к тебе <br class="hide-desktop">в руки! <br class="hide-tablet hide-mobile">Их хочется гладить бесконечно.<br>Обрати внимание на названия: мы <br class="hide-desktop">уверены, что<br class="hide-tablet hide-mobile">они западут в твое <br class="hide-desktop hide-mobile">сердечко, <br class="hide-desktop hide-tablet">потому что сделаны <br class="hide-tablet hide-mobile">со <br class="hide-desktop hide-mobile">смыслом, <br class="hide-desktop hide-tablet">отражающим оттенки.
  </SomeInfoSection>
  <DemoSection/>
  <PromoVideoSection/>
  <GetCoursesSection/>
  <GallerySection/>
  <FeedbackSection/>
  <DisclaimerSection/>
</template>

<script>
import { computed, defineComponent } from 'vue'
import HeroSection from '@/components/sections/HeroSection'
import DemoSection from '@/components/sections/DemoSection'
import SomeInfoSection from '@/components/sections/SomeInfoSection'
import ProductItem from '@/components/products/ProductItem'
import { useStore } from 'vuex'
import PromoVideoSection from '@/components/sections/PromoVideoSection'
import GetCoursesSection from '@/components/sections/CourseAdvertisingSection'
import GallerySection from '@/components/sections/GallerySection'
import FeedbackSection from '@/components/sections/FeedbackSection'
import DisclaimerSection from '@/components/sections/DisclaimerSection'

export default defineComponent({
  name: 'HomeView',
  components: {
    DisclaimerSection,
    FeedbackSection,
    GallerySection,
    GetCoursesSection,
    PromoVideoSection,
    ProductItem,
    DemoSection,
    HeroSection,
    SomeInfoSection
  },
  setup () {
    const store = useStore()
    const products = computed(() => store.getters.getProducts)

    return { products }
  }
})
</script>

<style>
</style>
