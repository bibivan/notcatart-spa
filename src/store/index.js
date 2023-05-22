import { createStore } from 'vuex'
import { apiFetch } from '@/helpers/send-requests'
import renderProducts from '@/helpers/render-response'
import config from '@/config'
import dayjs from 'dayjs'

const store = createStore({
  state: () => ({
    products: [],
    token: null,
    cartContent: []
  }),
  getters: {
    getProducts: state => state.products,
    getToken: state => state.token,
    getCartContent: state => state.cartContent
  },
  actions: {
    loadProducts: async ({ state, commit }) => {
      if (state.token) {
        const response = await apiFetch(config.apiUrl + 'products/get', { token: state.token })
        commit('setProducts', response)
      }
    },
    sendProductOrder: ({ commit }, payload) => {
      console.log(payload)
      const data = {
        token: payload.token,
        FIAS: payload.FIAS,
        KLADR: payload.KLADR || '',
        DATE_CREATE: dayjs().format('DD.MM.YY HH:mm:ss'),
        STATUS: 'new',
        NAME: payload.NAME,
        LAST_NAME: payload.LAST_NAME,
        MIDDLE_NAME: payload.MIDDLE_NAME,
        PHONE: '+7' + payload.PHONE,
        EMAIL: payload.EMAIL,
        DELIVERY_PRICE: payload.DELIVERY_PRICE,
        WEIGHT: payload.WEIGHT,
        PRICE: payload.PRICE,
        ADDRESS: payload.ADDRESS,
        PVZ_ADDRESS: payload.PVZ_ADDRESS || '',
        PAID: false,
        PAYMENT_TYPE: payload.PAYMENT_TYPE,
        PLACE_ID: payload.PLACE_ID,
        SEND_ORDER_TO_SDT: true,
        RU_POST_DELIVERY: payload.RU_POST_DELIVERY,
        COURIER_DELIVERY: payload.COURIER_DELIVERY,
        B2B_CLIENT: false,
        LOYALTY_POINT: 0,
        DELIVERY_INTERVAL: 0,
        COMMENT: '',
        PRODUCTS: payload.PRODUCTS
      }
      apiFetch(config.apiUrl + 'orders/add', data)
    },
    sendCourseOrder: ({ commit }, payload) => {
      apiFetch(config.apiUrl + 'courses-order/add', payload)
    },
    subscribeToNews: ({ commit }, payload) => {
      apiFetch(config.apiUrl + 'news-subscriber/add', payload)
    }
  },
  mutations: {
    setProducts: (state, data) => {
      state.products = renderProducts(data)
    },
    setToken: (state, data) => {
      state.token = data
    },
    setCartContent: state => {
      try {
        const currentOrder = JSON.parse(localStorage.getItem('notcatartOrder'))
        if (currentOrder?.length) state.cartContent = currentOrder
      } catch { console.log('Ошибка парсинга содержимого корзины') }
    },
    addItemToCart: (state, data) => {
      const matchedIndex = state.cartContent.findIndex(item => item.ARTICLE === data.ARTICLE)

      matchedIndex >= 0
        ? state.cartContent.splice(matchedIndex, 1, data)
        : state.cartContent.push(data)
      localStorage.setItem('notcatartOrder', JSON.stringify(state.cartContent))
    },
    deleteItemFromCart: (state, itemIndex) => {
      state.cartContent.splice(itemIndex, 1)
      localStorage.setItem('notcatartOrder', JSON.stringify(state.cartContent))
    }
  }
})

export function useStore () {
  return store
}

export default store
