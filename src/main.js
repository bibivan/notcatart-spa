import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueYandexMetrika from 'vue3-yandex-metrika'
import lodash from './helpers/lodash'
import helper from './helpers'
import VueEasyLightbox from 'vue-easy-lightbox/dist/vue-easy-lightbox.esm.min.js'
import 'swiper/css'
import 'swiper/css/pagination'

window.notcatartApp = createApp(App)
  .use(router)
  .use(VueYandexMetrika, {
    id: 94015496,
    router: router,
    env: process.env.NODE_ENV,
    // other options
    options: {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: 'dataLayer'
    }
  })
  .use(store)
  .use(lodash)
  .use(helper)
  .use(VueEasyLightbox)
  .mount('#notcatart_app')
