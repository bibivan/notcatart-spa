import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/privacy',
    name: 'privacy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "privacy" */ '../views/PrivacyView.vue')
  },
  {
    path: '/about-product',
    name: 'aboutProduct',
    component: () => import(/* webpackChunkName: "aboutProduct" */ '../views/AboutProductView.vue')
  },
  {
    path: '/public-offer',
    name: 'publicOffer',
    component: () => import(/* webpackChunkName: "publicOffer" */ '../views/PublicOfferView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CheckoutCartView.vue')
  },
  {
    path: '/order-course',
    name: 'orderCourse',
    component: () => import(/* webpackChunkName: "orderCourse" */ '../views/OrderCourseView.vue')
  },
  {
    path: '/cooperation',
    name: 'cooperation',
    component: () => import(/* webpackChunkName: "orderCourse" */ '../views/CooperationView.vue')
  },
  {
    path: '/payment-info',
    name: 'paymentInfo',
    component: () => import(/* webpackChunkName: "orderCourse" */ '../views/PaymentInfoView.vue')
  },
  {
    path: '/delivery-info',
    name: 'deliveryInfo',
    component: () => import(/* webpackChunkName: "orderCourse" */ '../views/DeliveryInfoView.vue')
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: () => import(/* webpackChunkName: "orderCourse" */ '../views/SubscribeView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    if (to.hash) {
      const headerHeight = document.getElementById('the_header').clientHeight
      return {
        el: to.hash,
        top: +headerHeight,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router
