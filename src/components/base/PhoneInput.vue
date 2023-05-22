<template>
  <div
    :class="['field', {
      'field--dirty': !!phoneValue,
      'field--focused': isFocused,
      'field--bordered': bordered
    }]"
  >
    <label :for="id" class="field__label">{{ label }}</label>
    <input
      v-model="phoneValue"
      :id="id"
      class="field__input"
      ref="maskedPhoneRef"
      type="text"
      :placeholder="placeholder"
      @focus="isFocused = true"
      @blur="v$.$touch(); isFocused = false"
    />
    <ErrorMessage :errorInstance="v$"/>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'
import Inputmask from 'inputmask'
import ErrorMessage from '@/components/base/ErrorMessage.vue'

export default defineComponent({
  name: 'PhoneInput',
  components: { ErrorMessage },
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: String,
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Телефон'
    },
    bordered: Boolean
  },
  setup (props, { emit }) {
    let maskedPhone
    const isFocused = ref(false)
    const maskedPhoneRef = ref()
    const phoneLength = ref(10)

    const phoneValue = computed({
      get: () => props.modelValue,
      set: () => emit('update:modelValue', maskedPhoneRef.value.inputmask.unmaskedvalue())
    })

    const init = () => {
      const cutNumber = number => number?.slice(-phoneLength.value)
      maskedPhone = new Inputmask({
        mask: '(+7|8) (999) 999-99-99',
        showMaskOnHover: false,
        onBeforePaste: pastedValue => cutNumber(pastedValue),
        onBeforeMask: pureValue => {
          if (!phoneValue.value) emit('update:modelValue', cutNumber(pureValue))
        }
      })
      maskedPhone.mask(maskedPhoneRef.value)
    }

    onMounted(() => {
      init()
    })

    // валидация
    const validationRules = computed(() => ({
      required: helpers.withMessage('Обязательное поле', required),
      minLength: helpers.withMessage('Номер слишком короткий', minLength(phoneLength.value))
    }))
    const v$ = useVuelidate(validationRules, phoneValue)

    return {
      phoneLength,
      isFocused,
      maskedPhoneRef,
      phoneValue,
      v$
    }
  }
})
</script>

<style scoped>

</style>
