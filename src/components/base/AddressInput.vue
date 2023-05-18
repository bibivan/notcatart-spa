<template>
  <div class="address">
    <div
      :class="['field', {
      'field--dirty': !!inputValue,
      'field--focused': inputIsFocused
    }]"
    >
      <label class="field__label" :for="id">{{ label }}</label>
      <input
        v-model="inputValue"
        :id="id"
        class="field__input"
        type="text"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="addressIsSelected = false; dropdownIsOpened = true; setLocation($event.target.value)"
        @focus="inputIsFocused = true"
        @blur="v$.$touch(); inputIsFocused = false"
        @keydown="onMoveFocus"
      >
      <ErrorMessage :errorInstance="v$"/>
    </div>
    <div v-if="!$_.isEmpty(addressSuggestions) && dropdownIsOpened" class="address__list">
      <div
        v-for="(address, index) in addressSuggestions"
        :key="address.data.fias_id + index"
        :class="['address__item', { 'address__item--focused': focusedAddress === index }]"
        @click.prevent.stop="setCurrentAddress(address)"
      >
        {{ address.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { getAddressSuggestions } from '@/helpers/send-requests'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import ErrorMessage from '@/components/base/ErrorMessage.vue'

export default defineComponent({
  name: 'AddressInput',
  components: { ErrorMessage },
  props: {
    addressData: Object,
    addressQuery: String,
    id: String,
    label: {
      type: String,
      default: 'Адрес'
    },
    locationRestriction: Array,
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checkFullAddress: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    let requestTimeout
    const inputValue = ref('')
    const inputIsFocused = ref(false)
    const dropdownIsOpened = ref()
    const addressSuggestions = ref()
    const addressIsSelected = ref()

    const setCurrentAddress = addressItem => {
      dropdownIsOpened.value = false
      addressIsSelected.value = true
      inputValue.value = addressItem.value
      emit('update:addressData', addressItem)
    }

    const setLocation = val => {
      clearTimeout(requestTimeout)
      requestTimeout = setTimeout(async () => {
        const receivedData = await getAddressSuggestions(val, props.locationRestriction)
        addressSuggestions.value = receivedData?.suggestions
      }, 500)
    }

    watch(() => props.addressQuery, val => {
      inputValue.value = val
    })

    // выбор адреса с клавиатуры
    const focusedAddress = ref(0)
    const onMoveFocus = (e) => {
      if (e.keyCode === 38 && focusedAddress.value > 0) --focusedAddress.value
      if (e.keyCode === 40 && focusedAddress.value < addressSuggestions.value?.length) ++focusedAddress.value
      if (e.keyCode === 13) setCurrentAddress(addressSuggestions.value[focusedAddress.value])
    }

    // валидация
    const validationRules = computed(() => ({
      required: helpers.withMessage('Выберите адрес из выпадающего списка', () => addressIsSelected.value),
      fullAddress: helpers.withMessage('Для доставки курьером введите полный адрес',
        () => props.checkFullAddress ? props.addressData.data?.house : true)
    }))
    const v$ = useVuelidate(validationRules, {})

    return {
      inputValue,
      inputIsFocused,
      addressSuggestions,
      addressIsSelected,
      dropdownIsOpened,
      setLocation,
      setCurrentAddress,
      focusedAddress,
      onMoveFocus,
      v$
    }
  }
})
</script>

<style scoped>

</style>
