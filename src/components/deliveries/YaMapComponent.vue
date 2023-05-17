<template>
  <h4
    v-if="$_.isEmpty(markersData) && !$_.isEmpty(order.addressData)"
    class="delivery-type__message"
  >
    Нет точек доставки в данном населенном пункте
  </h4>
  <YandexMap v-else-if="!$_.isEmpty(order.ADDRESS)"
             v-bind="$attrs"
             :settings="{
                 apiKey: 'd728cd3a-9125-46c7-b2dc-3995d38840cc',
                 lang: 'ru_RU',
                 coordorder: 'latlong',
                 debug: false,
                 version: '2.1'
               }"
             :controls="['zoomControl']"
             :coordinates="[order.addressData.data.geo_lat, order.addressData.data.geo_lon]"
             class="yamap-logistics"
             @created="setMapInstance">
    <YandexClusterer v-if="!$_.isEmpty(markersData)"
                     :key="markersData.length + markersData[0]?.gps[0] + markersData[markersData.length - 1].gps[0]"
                     :options="{ preset: 'islands#blackClusterIcons' }">
      <YandexMarker v-for="(point, index) in markersData"
                    :key="point.name + index"
                    :coordinates="point.gps"
                    :marker-id="'placemark' + index"
                    :properties="getMarkerProperties(point, index)"
                    :options="{
                      preset: 'islands#blackDeliveryIcon'
                    }">
        <template #component>
          <CustomMapBalloon :pickupPoint="point" :order="order"/>
        </template>
      </YandexMarker>
    </YandexClusterer>
    <YandexClusterer :key="order.addressData?.data?.geo_lat + order.addressData?.data?.geo_lon + 'center'">
      <YandexMarker :coordinates="[order.addressData.data.geo_lat, order.addressData.data.geo_lon]"
                    :markerId="'marker-' + order.addressData.data.fias_id"
                    :options="{
                    preset: 'islands#redDotIcon',
                    iconImageSize: 10
                  }">
      </YandexMarker>
    </YandexClusterer>
  </YandexMap>
</template>

<script>
import { defineComponent, toRef, watch } from 'vue'
import { YandexMap, YandexClusterer, YandexMarker } from 'vue-yandex-maps'
import CustomMapBalloon from '@/components/deliveries/CustomMapBalloon.vue'
import _ from 'lodash'

export default defineComponent({
  name: 'YaMapComponent',
  components: {
    YandexMap,
    YandexClusterer,
    YandexMarker,
    CustomMapBalloon
  },
  props: {
    order: Object,
    markersData: [Object, Array]
  },
  setup (props) {
    let mapInstance
    const smallMobileWidth = 375
    const currentOrder = toRef(props, 'order')

    const setMapInstance = (map) => {
      mapInstance = map
      setMapCenter(12)
      initBtnEvenListeners()
    }

    const getMarkerProperties = (point, index) => ({
      clusterCaption: point.name,
      balloonContentBody: `<div class="yandex-balloon yandex-balloon--in-cluster">
        <div class="yandex-balloon__body">
          <div class="yandex-balloon__item">
            <span class="yandex-balloon__subtitle">График работы:</span>
            <span class="yandex-balloon__text">${point.schedule}</span>
          </div>
          <div class="yandex-balloon__item">
            <span class="yandex-balloon__subtitle">Адрес:</span>
            <span class="yandex-balloon__text">${point.address}</span>
          </div>
        </div>
        <button class="btn yandex-balloon__btn btn-reset" data-pickup-point-index="${index}">
            ${window.innerWidth > smallMobileWidth ? 'Доставить сюда' : 'выбрать'}
        </button>
      </div>`
    })

    const initBtnEvenListeners = () => {
      document.addEventListener('click', (event) => {
        const pointIndex = event.target.dataset?.pickupPointIndex
        if (pointIndex) {
          event.preventDefault()
          currentOrder.value.pickedPoint = props.markersData[pointIndex]
          event.target.classList.add('btn--disabled')
          event.target.disabled = true
          event.target.textContent = 'Выбрано'
        }
      })
    }

    const setMapCenter = (zoom) => {
      mapInstance.setCenter([+props.order.addressData.data.geo_lat, +props.order.addressData.data.geo_lon], zoom, {
        checkZoomRange: true,
        duration: 1000
      })
    }

    watch([
      () => props.order.addressData?.data?.geo_lat,
      () => props.order.addressData?.data?.geo_lon
    ], (val, oldVal) => {
      if (_.isEmpty(oldVal) || _.isEmpty(mapInstance)) return
      setMapCenter(15)
    })

    return {
      setMapInstance,
      getMarkerProperties
    }
  }
})
</script>

<style scoped>

</style>
