import { createStore } from 'vuex'
import { apiFetch } from '@/helpers/send-requests'
import renderProducts from '@/helpers/render-response'
import config from '@/config'

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
    }
  }
})

export function useStore () {
  return store
}

export default store
