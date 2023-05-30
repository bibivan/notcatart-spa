import { createStore } from 'vuex'
import { apiFetch } from '@/helpers/sendRequests'
import renderProducts from '@/helpers/renderResponse'
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
    loadProducts: async ({ getters, commit }) => {
      if (getters.getToken) {
        const response = await apiFetch(config.apiUrl + 'products/get', { token: getters.getToken })
        commit('setProducts', response)
      }
    },
    sendProductOrder: async ({ getters, commit }, payload) => {
      return await apiFetch(config.apiUrl + 'orders/add', {
        token: getters.getToken,
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
        PRODUCTS: payload.cartContent
      })
    },
    loadPickUps: async ({ getters, commit }, payload) => {
      return await apiFetch(config.apiUrl + 'pickup-sdt/get-pickups',
        {
          token: getters.getToken,
          fias: payload.fias,
          payment_type: payload.PAYMENT_TYPE,
          company: 0, // 0 - физ.лицо, 1 - юр.лицо
          weight: payload.WEIGHT,
          parcel_size: payload.parcelSize,
          order_sum: payload.PRICE
        })
    },
    sendCourseOrder: async ({ getters, commit }, payload) => {
      return await apiFetch(config.apiUrl + 'form/add', {
        ...payload,
        phone: '7' + payload.phone,
        token: getters.getToken
      })
    },
    subscribeToNews: async ({ getters, commit }, payload) => {
      return await apiFetch(config.apiUrl + 'form/subscribe', {
        ...payload,
        phone: '7' + payload.phone,
        token: getters.getToken
      })
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
    clearCart: state => {
      localStorage.removeItem('notcatartOrder')
      state.cartContent = []
    },
    addItemToCart: (state, data) => {
      console.log(data)
      const product = {
        NAME: data.NAME,
        type: data.ATTRIBUTES.articleType,
        ARTICLE: data.ARTICLE,
        SKU: data.SKU ? data.SKU : null,
        CNT: 1,
        PRICE: data.PRICE,
        picture: data.PICTURES[0],
        size: data.SIZE
      }
      const matchedIndex = state.cartContent.findIndex(item => item.ARTICLE === product.ARTICLE)

      matchedIndex >= 0
        ? state.cartContent.splice(matchedIndex, 1, product)
        : state.cartContent.push(product)
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
