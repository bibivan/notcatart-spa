<template>
<section class="grid some-info">
  <div class="grid__col some-info__outer-photo">
    <div class="some-info__photo" :style="`background-image: url('${imgUrl}')`"/>
  </div>
  <div class="grid__col some-info__outer-text">
    <div class="section some-info__inner-text">
      <div class="some-info__text">
        <h2 class="some-info__headline">
          {{ headline }}
        </h2>
        <div class="some-info__description">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SomeInfoSection',
  props: {
    imgUrl: String,
    headline: String,
    description: String
  }
})
</script>

<style scoped>

</style>
