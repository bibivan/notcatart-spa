<template>
  <HeroSection/>
  <DemoSection/>
  <SomeInfoSection
    photoUrl="./img/gallery/gallery-photo-15.jpg"
    headline="/ СЕРГЕЙ ЛЮБИМОВ"
    description="«Я всегда хотел дать вам самое лучшее - то, чем пользуюсь сам. Я долго к этому шел. Наслаждайтесь! За качество отвечаю головой»"
  />
  <ProductItem v-if="!$_.isEmpty(productList)" :product="productList[0]"/>
  <SomeInfoSection
    photoUrl="./img/gallery/gallery-photo-10.jpg"
    headline="/ ЗАЦЕНИ"
    description="Максимум пигментации. В палетках ты найдёшь разные текстуры.  Всего их четыре вида: матовые, воздушно-кремовые, шиммерные и глиттерная. Бархатные палетки так и просятся к тебе в руки! Их хочется гладить бесконечно. Обрати внимание на названия: мы уверены, что они западут в твое сердечко, потому что сделаны со смыслом, отражающим оттенки"
  />
  <ProductItem v-if="!$_.isEmpty(productList)" :product="productList[1]"/>
</template>

<script>
import { defineComponent, inject } from 'vue'
import HeroSection from '@/components/sections/HeroSection'
import DemoSection from '@/components/sections/DemoSection'
import SomeInfoSection from '@/components/sections/SomeInfoSection'
import ProductItem from '@/components/products/ProductItem'

export default defineComponent({
  name: 'HomeView',
  components: { ProductItem, DemoSection, HeroSection, SomeInfoSection },
  setup () {
    const productList = inject('products')
    return {
      productList
    }
  }
})
</script>

<style>
</style>
