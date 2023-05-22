import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from './helpers/lodash'
import VueEasyLightbox from 'vue-easy-lightbox/dist/vue-easy-lightbox.esm.min.js'
import 'swiper/css'
import 'swiper/css/pagination'

window.notcatartApp = createApp(App)
  .use(router)
  .use(store)
  .use(lodash)
  .use(VueEasyLightbox)
  .mount('#notcatart_app')
