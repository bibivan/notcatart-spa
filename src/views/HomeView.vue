<template>
  <HeroSection/>
  <DemoSection/>
  <SomeInfoSection
    :slideUrls="['./img/gallery/gallery-photo-16.jpg', './img/gallery/gallery-photo-17.jpg', './img/gallery/gallery-photo-18.jpg']"
    headline="/ СЕРГЕЙ ЛЮБИМОВ"
    description="«Я всегда хотел дать вам самое лучшее - то, чем пользуюсь сам. Я долго к этому шел. Наслаждайтесь! За качество отвечаю головой»"
  />
  <ProductItem
    v-if="!$_.isEmpty(products)"
    id="product_1"
    :product="products[0]"
  />
  <SomeInfoSection
    :slideUrls="['./img/gallery/gallery-photo-26.jpg', './img/gallery/gallery-photo-29.jpg', './img/gallery/gallery-photo-28.jpg', './img/gallery/gallery-photo-30.jpg']"
    headline="/ ЗАЦЕНИ"
    description="Максимум пигментации. В палетках ты найдёшь разные текстуры.  Всего их четыре вида: матовые, воздушно-кремовые, шиммерные и глиттерная. Бархатные палетки так и просятся к тебе в руки! Их хочется гладить бесконечно. Обрати внимание на названия: мы уверены, что они западут в твое сердечко, потому что сделаны со смыслом, отражающим оттенки"
  />
  <ProductItem
    v-if="!$_.isEmpty(products)"
    id="product_2"
    :product="products[1]"
  />
  <PromoVideoSection/>
  <GetCoursesSection/>
  <GallerySection v-if="false"/>
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
