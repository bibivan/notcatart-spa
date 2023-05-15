import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import lodash from './helpers/lodash'
import VueEasyLightbox from 'vue-easy-lightbox/dist/vue-easy-lightbox.esm.min.js'
import 'swiper/scss'
import 'swiper/scss/pagination'

createApp(App)
  .use(router)
  .use(lodash)
  .use(VueEasyLightbox)
  .mount('#notcatart_app')
